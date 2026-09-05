import mongoose from 'mongoose';

import { Activity } from '../models/activity.js';
import { LeaderboardEntry } from '../models/leaderboardEntry.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Octo Runners',
        description: 'A steady crew focused on cardio endurance and weekly distance goals.',
      },
      {
        name: 'Core Crushers',
        description: 'Strength-focused teammates who track resistance training and recovery.',
      },
      {
        name: 'Flex Force',
        description: 'Mobility-minded athletes balancing yoga, stretching, and active recovery.',
      },
    ]);

    const users = await User.insertMany([
      { name: 'Mona Patel', email: 'mona.patel@example.com', team: teams[0]._id },
      { name: 'Diego Rivera', email: 'diego.rivera@example.com', team: teams[0]._id },
      { name: 'Avery Johnson', email: 'avery.johnson@example.com', team: teams[1]._id },
      { name: 'Sam Taylor', email: 'sam.taylor@example.com', team: teams[1]._id },
      { name: 'Jordan Kim', email: 'jordan.kim@example.com', team: teams[2]._id },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(teams[0]._id, { members: [users[0]._id, users[1]._id] }),
      Team.findByIdAndUpdate(teams[1]._id, { members: [users[2]._id, users[3]._id] }),
      Team.findByIdAndUpdate(teams[2]._id, { members: [users[4]._id] }),
    ]);

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        type: 'Trail run',
        durationMinutes: 42,
        caloriesBurned: 430,
        completedAt: new Date('2026-09-01T13:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'Interval cycling',
        durationMinutes: 35,
        caloriesBurned: 380,
        completedAt: new Date('2026-09-02T12:15:00Z'),
      },
      {
        user: users[2]._id,
        type: 'Upper-body strength',
        durationMinutes: 50,
        caloriesBurned: 320,
        completedAt: new Date('2026-09-03T19:00:00Z'),
      },
      {
        user: users[3]._id,
        type: 'Rowing machine',
        durationMinutes: 28,
        caloriesBurned: 295,
        completedAt: new Date('2026-09-04T11:45:00Z'),
      },
      {
        user: users[4]._id,
        type: 'Power yoga',
        durationMinutes: 60,
        caloriesBurned: 260,
        completedAt: new Date('2026-09-05T15:20:00Z'),
      },
    ]);

    const leaderboard = await LeaderboardEntry.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 1480, rank: 1 },
      { user: users[2]._id, team: teams[1]._id, points: 1395, rank: 2 },
      { user: users[1]._id, team: teams[0]._id, points: 1270, rank: 3 },
      { user: users[4]._id, team: teams[2]._id, points: 1185, rank: 4 },
      { user: users[3]._id, team: teams[1]._id, points: 1110, rank: 5 },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Morning Momentum Run',
        description: 'A progressive outdoor run with a short warmup and sustained tempo finish.',
        difficulty: 'intermediate',
        durationMinutes: 45,
      },
      {
        title: 'Foundational Strength Circuit',
        description: 'Squats, presses, rows, and planks built for balanced full-body training.',
        difficulty: 'beginner',
        durationMinutes: 35,
      },
      {
        title: 'Advanced Conditioning Ladder',
        description: 'High-intensity intervals combining rowing, kettlebell swings, and carries.',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
      {
        title: 'Recovery Mobility Flow',
        description: 'Low-impact stretching and stability work for rest days and cooldowns.',
        difficulty: 'beginner',
        durationMinutes: 25,
      },
    ]);

    console.log(
      `Seeded ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts`,
    );

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

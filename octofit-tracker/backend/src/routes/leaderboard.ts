import { Router } from 'express';

import { LeaderboardEntry } from '../models/leaderboardEntry.js';

const router = Router();

router.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find().populate('user team').sort({ points: -1 });
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;
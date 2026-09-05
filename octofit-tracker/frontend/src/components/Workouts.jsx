import ResourceList from './ResourceList.jsx'

function Workouts() {
  const workoutsApiEndpoint = '/api/workouts/'

  return (
    <ResourceList
      apiPath={workoutsApiEndpoint}
      title="Workouts"
      description="Suggested training sessions for different fitness levels."
      emptyMessage="No workout suggestions are available yet."
      renderItem={(workout) => (
        <article className="resource-card" key={workout._id ?? workout.id ?? workout.title}>
          <div className="card-title-row">
            <h3>{workout.title}</h3>
            <span>{workout.durationMinutes} min</span>
          </div>
          <p>{workout.description}</p>
          <span className="difficulty">{workout.difficulty}</span>
        </article>
      )}
    />
  )
}

export default Workouts
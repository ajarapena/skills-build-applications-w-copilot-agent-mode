import ResourceList from './ResourceList.jsx'

function Activities() {
  const activitiesApiEndpoint = '/api/activities/'

  return (
    <ResourceList
      apiPath={activitiesApiEndpoint}
      title="Activities"
      description="Recent workouts logged by OctoFit members."
      emptyMessage="No activities have been logged yet."
      renderItem={(activity) => (
        <article className="resource-card" key={activity._id ?? activity.id ?? activity.type}>
          <div className="card-title-row">
            <h3>{activity.type}</h3>
            <span>{activity.durationMinutes} min</span>
          </div>
          <p>{activity.user?.name ?? 'Unassigned athlete'}</p>
          <dl>
            <dt>Calories</dt>
            <dd>{activity.caloriesBurned ?? 0}</dd>
            <dt>Completed</dt>
            <dd>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : 'Not recorded'}</dd>
          </dl>
        </article>
      )}
    />
  )
}

export default Activities
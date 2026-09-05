import ResourceList from './ResourceList.jsx'

function Teams() {
  const teamsApiEndpoint = '/api/teams/'

  return (
    <ResourceList
      apiPath={teamsApiEndpoint}
      title="Teams"
      description="Training groups with member rosters and team focus areas."
      emptyMessage="No teams have been created yet."
      renderItem={(team) => (
        <article className="resource-card" key={team._id ?? team.id ?? team.name}>
          <div className="card-title-row">
            <h3>{team.name}</h3>
            <span>{team.members?.length ?? 0} members</span>
          </div>
          <p>{team.description}</p>
        </article>
      )}
    />
  )
}

export default Teams
import ResourceList from './ResourceList.jsx'

function Users() {
  return (
    <ResourceList
      componentName="users"
      title="Users"
      description="Athlete profiles synced from the OctoFit data tier."
      emptyMessage="No users are available yet."
      renderItem={(user) => (
        <article className="resource-card" key={user._id ?? user.id ?? user.email}>
          <div className="card-title-row">
            <h3>{user.name}</h3>
            <span>{user.team?.name ?? 'No team'}</span>
          </div>
          <p>{user.email}</p>
        </article>
      )}
    />
  )
}

export default Users
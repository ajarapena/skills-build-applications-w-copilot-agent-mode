import ResourceList from './ResourceList.jsx'

function Leaderboard() {
  const leaderboardApiEndpoint = import.meta.env.VITE_CODESPACE_NAME
    ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/'

  return (
    <ResourceList
      apiPath={leaderboardApiEndpoint}
      title="Leaderboard"
      description="Competitive ranking based on OctoFit performance points."
      emptyMessage="No leaderboard entries are available yet."
      renderItem={(entry) => (
        <article className="resource-card leaderboard-card" key={entry._id ?? entry.id ?? entry.rank}>
          <div className="rank">#{entry.rank ?? '-'}</div>
          <div>
            <h3>{entry.user?.name ?? 'Unnamed athlete'}</h3>
            <p>{entry.team?.name ?? 'No team assigned'}</p>
            <strong>{entry.points ?? 0} points</strong>
          </div>
        </article>
      )}
    />
  )
}

export default Leaderboard
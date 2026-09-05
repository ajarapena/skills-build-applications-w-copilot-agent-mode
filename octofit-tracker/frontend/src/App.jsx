import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, apiEnvironmentLabel } from './api.js'
import octofitLogo from './assets/octofit-logo.png'
import './App.css'

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]
  const currentYear = new Date().getFullYear()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <img alt="OctoFit Tracker logo" className="brand-logo" src={octofitLogo} />
          <div>
            <p className="eyebrow">OctoFit Tracker</p>
            <h1>Training data across the whole team.</h1>
          </div>
        </div>
        <div className="api-status" aria-label="Current API URL">
          <span>{apiEnvironmentLabel}</span>
          <code>{apiBaseUrl}</code>
        </div>
      </header>

      <nav className="nav nav-pills app-nav" aria-label="OctoFit sections">
        {navItems.map((item) => (
          <NavLink key={item.to} className="nav-link" to={item.to}>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <main className="content-panel">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; {currentYear} OctoFit Tracker. Built for team fitness, together.</p>
      </footer>
    </div>
  )
}

export default App

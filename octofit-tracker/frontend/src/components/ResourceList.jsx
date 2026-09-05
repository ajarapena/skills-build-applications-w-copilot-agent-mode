import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function ResourceList({ componentName, description, emptyMessage, renderItem, title }) {
  const [state, setState] = useState({ error: '', items: [], status: 'loading' })

  useEffect(() => {
    let isActive = true

    async function loadCollection() {
      setState({ error: '', items: [], status: 'loading' })

      try {
        const items = await fetchCollection(componentName)

        if (isActive) {
          setState({ error: '', items, status: 'loaded' })
        }
      } catch (error) {
        if (isActive) {
          setState({ error: error.message, items: [], status: 'error' })
        }
      }
    }

    loadCollection()

    return () => {
      isActive = false
    }
  }, [componentName])

  return (
    <section className="resource-section">
      <div className="resource-header">
        <div>
          <p className="section-label">/api/{componentName}/</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="badge text-bg-dark">{state.items.length} records</span>
      </div>

      {state.status === 'loading' && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}

      {state.status === 'error' && (
        <div className="alert alert-danger" role="alert">
          {state.error}
        </div>
      )}

      {state.status === 'loaded' && state.items.length === 0 && (
        <div className="alert alert-secondary">{emptyMessage}</div>
      )}

      {state.status === 'loaded' && state.items.length > 0 && (
        <div className="resource-grid">{state.items.map((item) => renderItem(item))}</div>
      )}
    </section>
  )
}

export default ResourceList
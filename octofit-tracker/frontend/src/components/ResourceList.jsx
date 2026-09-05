import { useEffect, useState } from 'react'

import { buildApiEndpoint, fetchCollection } from '../api.js'

function ResourceList({ apiPath, description, emptyMessage, renderItem, title }) {
  const [state, setState] = useState({ error: '', items: [], status: 'loading' })

  useEffect(() => {
    let isActive = true

    async function loadCollection() {
      setState({ error: '', items: [], status: 'loading' })

      try {
        const items = await fetchCollection(apiPath)

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
  }, [apiPath])

  return (
    <section className="resource-section">
      <div className="resource-header">
        <div>
          <p className="section-label">{buildApiEndpoint(apiPath)}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <span className="badge text-bg-dark">{state.items.length} records</span>
      </div>

      {state.status === 'loading' && (
        <div className="alert alert-info d-flex align-items-center gap-2" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Loading {title.toLowerCase()}...</span>
        </div>
      )}

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
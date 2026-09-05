const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const codespaceApiBaseUrl = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`

export const apiBaseUrl = codespaceName ? codespaceApiBaseUrl : 'http://localhost:8000/api'
export const apiEnvironmentLabel = codespaceName ? 'Codespaces API' : 'Local API fallback'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const collectionKeys = ['results', 'items', 'data', 'docs', 'records']

  for (const key of collectionKeys) {
    const value = payload[key]

    if (Array.isArray(value)) {
      return value
    }

    if (value && typeof value === 'object') {
      const nestedCollection = normalizeCollection(value)

      if (nestedCollection.length > 0) {
        return nestedCollection
      }
    }
  }

  return []
}

export async function fetchCollection(componentName) {
  const response = await fetch(`${apiBaseUrl}/${componentName}/`)

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}
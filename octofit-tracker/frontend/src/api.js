const viteCodespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const hostCodespaceName = globalThis.location?.hostname.match(/^(.+)-5173\.app\.github\.dev$/)?.[1]
const codespaceName = viteCodespaceName || hostCodespaceName
const codespaceApiBaseUrl = `https://${codespaceName}-8000.app.github.dev`

export const apiBaseUrl = codespaceName ? codespaceApiBaseUrl : 'http://localhost:8000'
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

export function buildApiEndpoint(apiPath) {
  return `${apiBaseUrl}${apiPath}`
}

export async function fetchCollection(apiPath) {
  const response = await fetch(buildApiEndpoint(apiPath))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}
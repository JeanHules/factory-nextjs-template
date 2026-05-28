/**
 * Base HTTP client factory.
 *
 * NAMING CONVENTION — agents must follow this for all generated clients:
 *
 *   ✅ export async function getErrors(params): Promise<Error[]>   — named function
 *   ✅ export async function createTicket(body): Promise<Ticket>   — named function
 *   ❌ export const bugsnagClient = new BugsnagClient()            — never export instances
 *   ❌ export default client                                       — never use default exports for clients
 *
 * Clients generated from lib/contracts.ts must use the exact function names declared there.
 */

export interface ApiClientConfig {
  baseUrl: string
  apiKey?: string
  headers?: Record<string, string>
  timeoutMs?: number
}

export interface ApiError {
  message: string
  status: number
  code?: string
}

export function createApiClient(config: ApiClientConfig) {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config.apiKey ? { Authorization: `Bearer ${config.apiKey}` } : {}),
    ...config.headers,
  }

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const controller = new AbortController()
    const timeoutId = config.timeoutMs
      ? setTimeout(() => controller.abort(), config.timeoutMs)
      : null

    try {
      const res = await fetch(`${config.baseUrl}${path}`, {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
        signal: controller.signal,
      })

      if (!res.ok) {
        const body = await res.text().catch(() => '')
        const err: ApiError = {
          message: body || res.statusText,
          status: res.status,
        }
        throw err
      }

      return res.json() as Promise<T>
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }

  return {
    get: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: 'GET' }),
    post: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, { ...init, method: 'POST', body: JSON.stringify(body) }),
    put: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, { ...init, method: 'PUT', body: JSON.stringify(body) }),
    patch: <T>(path: string, body: unknown, init?: RequestInit) =>
      request<T>(path, { ...init, method: 'PATCH', body: JSON.stringify(body) }),
    delete: <T>(path: string, init?: RequestInit) =>
      request<T>(path, { ...init, method: 'DELETE' }),
  }
}

// ─── Core user / session ──────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  name?: string
  role?: string
  created_at?: string
}

export interface Session {
  user: User
  expires_at: string
}

// ─── Generic API response shapes ─────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  data: T | null
  error: string | null
}

export interface PaginatedResponse<T> {
  data: T[]
  count: number
  page: number
  pageSize: number
}

// ─── Async state (used by hooks) ──────────────────────────────────────────────

export interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: Error | null
}

// ─── Form helpers ─────────────────────────────────────────────────────────────

export interface FormField<T = string> {
  value: T
  error?: string
  touched?: boolean
}

export interface FormState<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FormField<T[K]> }
  isSubmitting: boolean
  isValid: boolean
}

// ─── Table / data grid ────────────────────────────────────────────────────────

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface SortState {
  key: string
  direction: 'asc' | 'desc'
}

// ─── Notification / toast ─────────────────────────────────────────────────────

export type ToastVariant = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration?: number
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
}

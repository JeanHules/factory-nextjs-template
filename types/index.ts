export interface User {
  id: string
  email: string
  name?: string
  role?: string
  created_at?: string
}

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

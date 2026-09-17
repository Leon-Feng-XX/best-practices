import type { CreateUserInput, Paginated, PaginationParams, UpdateUserInput, User } from '../types'
import { del, get, post, put } from '../client'

/**
 * User API module.
 * Each function returns a typed Promise — no axios types leak out.
 */
export const userApi = {
  list: (params?: PaginationParams) =>
    get<Paginated<User>>('/users', { params }),

  detail: (id: string) =>
    get<User>(`/users/${id}`),

  create: (input: CreateUserInput) =>
    post<User>('/users', input),

  update: (id: string, input: UpdateUserInput) =>
    put<User>(`/users/${id}`, input),

  remove: (id: string) =>
    del<void>(`/users/${id}`),
}

/**
 * Shared API types.
 * In a real project these are often generated from OpenAPI/GraphQL schema.
 */

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface CreateUserInput {
  name: string
  email: string
}

export type UpdateUserInput = Partial<CreateUserInput>

export interface PaginationParams {
  page?: number
  size?: number
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  size: number
}

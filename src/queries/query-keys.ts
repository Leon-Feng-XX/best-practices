import type { PaginationParams } from '@/api/types'

/**
 * Query key factory.
 *
 * Centralizes all query keys so cache invalidation is predictable.
 * Follows the TanStack Query "query key factory" pattern:
 * https://tkdodo.eu/blog/effective-react-query-keys
 */

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}

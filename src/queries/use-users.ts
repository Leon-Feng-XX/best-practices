import type { MaybeRefOrGetter } from 'vue'
import type { CreateUserInput, PaginationParams, UpdateUserInput } from '@/api/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { computed, toValue } from 'vue'
import { userApi } from '@/api/modules/users'
import { userKeys } from './query-keys'

/**
 * Query hooks for the User resource.
 * Components should use these — never call `userApi` directly for reads.
 */

export function useUsersQuery(params?: MaybeRefOrGetter<PaginationParams | undefined>) {
  return useQuery({
    queryKey: computed(() => userKeys.list(toValue(params))),
    queryFn: () => userApi.list(toValue(params)),
    staleTime: 30_000,
  })
}

export function useUserQuery(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => userKeys.detail(toValue(id))),
    queryFn: () => userApi.detail(toValue(id)),
    enabled: computed(() => !!toValue(id)),
  })
}

export function useCreateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateUserInput) => userApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string, input: UpdateUserInput }) =>
      userApi.update(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useDeleteUserMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}

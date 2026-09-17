import { z } from 'zod'

/**
 * User form schema — single source of truth for validation + types.
 * Framework-agnostic: reusable in components, tests, and server-side code.
 */
export const userSchema = z.object({
  name: z
    .string()
    .min(1, '用户名必填')
    .max(20, '用户名不超过 20 个字符'),
  email: z
    .string()
    .min(1, '邮箱必填')
    .email('邮箱格式不正确'),
  password: z
    .string()
    .min(8, '密码至少 8 位')
    .regex(/[A-Z]/, '密码需含大写字母')
    .regex(/\d/, '密码需含数字'),
})

export type UserFormValues = z.infer<typeof userSchema>

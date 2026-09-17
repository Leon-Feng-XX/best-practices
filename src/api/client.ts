import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import { logger } from '@/utils/logger'

/**
 * Unified HTTP client.
 * - Base URL comes from VITE_API_BASE_URL (e.g. `/api` in dev → proxied by Vite).
 * - Bearer token is injected automatically from localStorage.
 * - Response interceptor unwraps `response.data` and normalizes errors.
 */
export const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status

    if (status === 401) {
      logger.warn('Unauthorized — clearing token')
      localStorage.removeItem('token')
      // Optionally redirect to login page here.
    }
    else if (status && status >= 500) {
      logger.error('Server error:', error.message)
    }
    else if (!error.response) {
      logger.error('Network error:', error.message)
    }

    return Promise.reject(error)
  },
)

/**
 * Type-safe request wrappers that unwrap `response.data`.
 * Use these in API modules instead of `http` directly.
 */
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.get<T>(url, config)
  return data
}

export async function post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.post<T>(url, body, config)
  return data
}

export async function put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.put<T>(url, body, config)
  return data
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await http.delete<T>(url, config)
  return data
}

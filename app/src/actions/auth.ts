import api from '@/lib/api'

export type AuthUser = {
  id: number
  name: string
  email: string
  belt: string
}

export type AuthResponse = {
  user: AuthUser
  token: string
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post('/api/auth/login', { email, password })
  return response.data
}

export async function register(
  name: string,
  email: string,
  password: string,
  belt: string
): Promise<AuthResponse> {
  const response = await api.post('/api/auth/register', { name, email, password, belt })
  return response.data
}

export async function logout(): Promise<void> {
  await api.post('/api/auth/logout')
}

export async function me(): Promise<AuthUser> {
  const response = await api.get('/api/auth/me')
  return response.data
}

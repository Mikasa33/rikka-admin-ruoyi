import { get, post } from '@/plugins/axios'

export function login(data: any) {
  return post('/open/login', { data })
}

export function refreshToken(params: any) {
  return get('/open/refreshToken', { params })
}

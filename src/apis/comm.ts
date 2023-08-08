import { get, post } from '@/plugins/axios'

export function getPerson() {
  return get('/comm/person')
}

export function updatePerson(data: any) {
  return post('/comm/personUpdate', { data })
}

export function listPermmenu() {
  return get('/comm/permmenu')
}

export function getUploadMode() {
  return get('/comm/uploadMode')
}

export function uploadFile(data: any) {
  return post('/comm/upload', data)
}

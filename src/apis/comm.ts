import { get, post } from '@/plugins/axios'

export function getPerson() {
  return get('/getInfo')
}

export function updatePerson(data: any) {
  return post('/comm/personUpdate', { data })
}

export function listPermmenu() {
  return get('/getRouters')
}

export function getUploadMode() {
  return get('/comm/uploadMode')
}

export function uploadFile(data: any) {
  return post('/comm/upload', data)
}

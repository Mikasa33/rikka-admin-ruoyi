import { crud, post } from '@/plugins/axios'

const namespace = '/permission/user'

export const user = {
  ...crud({ namespace }),
  move: (data: any) => post(`${namespace}/move`, { data }),
}

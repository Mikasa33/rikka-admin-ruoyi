import { crud, put } from '@/plugins/axios'

const namespace = '/system/role'

export const role = {
  ...crud({ namespace }),
  changeStatus: (data: any) => put(`${namespace}/changeStatus`, { data }),
}

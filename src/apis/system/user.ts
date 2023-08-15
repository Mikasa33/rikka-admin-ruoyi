import { crud, put } from '@/plugins/axios'

const namespace = '/system/user'

export const user = {
  ...crud({ namespace }),
  changeStatus: (data: any) => put(`${namespace}/changeStatus`, { data }),
  resetPwd: (data: any) => put(`${namespace}/resetPwd`, { data }),
}

import { crud, post } from '@/plugins/axios'

const namespace = '/permission/department'

export const department = {
  ...crud({ namespace }),
  order: (data: any) => post(`${namespace}/order`, { data }),
}

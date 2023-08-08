import { crud } from '@/plugins/axios'

const namespace = '/permission/department'

export const department = {
  ...crud({ namespace }),
}

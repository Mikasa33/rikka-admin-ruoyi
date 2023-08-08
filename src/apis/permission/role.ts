import { crud } from '@/plugins/axios'

const namespace = '/permission/role'

export const role = {
  ...crud({ namespace }),
}

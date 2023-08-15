import { crud } from '@/plugins/axios'

const namespace = '/system/dept'

export const department = {
  ...crud({ namespace }),
}

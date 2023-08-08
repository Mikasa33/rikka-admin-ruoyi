import { crud } from '@/plugins/axios'

const namespace = '/permission/menu'

export const menu = {
  ...crud({ namespace }),
}

import { crud } from '@/plugins/axios'

const namespace = '/system/menu'

export const menu = {
  ...crud({ namespace }),
}

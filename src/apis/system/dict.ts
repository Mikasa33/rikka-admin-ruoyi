import { crud } from '@/plugins/axios'

export const dictType = {
  ...crud({ namespace: '/system/dict/type' }),
}

export const dictInfo = {
  ...crud({ namespace: '/system/dict/info' }),
}

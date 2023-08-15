import { crud } from '@/plugins/axios'

const typeNamespace = '/system/dict/type'
const infoNamespace = '/system/dict/info'

export const dictType = {
  ...crud({ namespace: typeNamespace }),
}

export const dictInfo = {
  ...crud({ namespace: infoNamespace }),
}

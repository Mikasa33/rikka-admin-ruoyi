import { crud, del } from '@/plugins/axios'

const typeNamespace = '/system/dict/type'
const dataNamespace = '/system/dict/data'

export const dictType = {
  ...crud({ namespace: typeNamespace }),
  refreshCache: () => del(`${typeNamespace}/refreshCache`),
}

export const dictData = {
  ...crud({ namespace: dataNamespace }),
}

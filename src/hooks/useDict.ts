import { ref } from 'vue'
import { dictData } from '@/apis/system/dict'

/**
 * 字典
 */
export function useDict() {
  const dicts = ref<any>({})

  /**
   * 根据类型获取字典列表
   * @param type 类型
   * @returns 字典列表
   */
  const getDict = (type: string) => dicts.value[type]

  /**
   * 格式化选项
   * @param data 需要格式化的列表数据
   * @param fields labelFiled: 标签属性 valueField: 值属性 typeField: 类型属性
   * @returns 格式化后的选项列表
   */
  function formatToOptions(data: Array<any>, fields?: dictFields) {
    return data.map((item: any) => ({
      label: item[fields?.labelField || 'dictLabel'],
      value: item[fields?.valueField || 'dictValue'],
      type: item[fields?.typeField || 'listClass'],
      raw: item,
    }))
  }

  /**
   * 查找对象
   * @param data 需要查找的列表数据
   * @param value 查找的值
   * @param field 查找的列表数据对应的属性
   * @returns 查找结果对象
   */
  function find(data: Array<any>, value: any, field = 'value') {
    return data?.find((item: any) => item[field] === value) || {}
  }

  /**
   * 查找多个对象
   * @param data 需要查找的列表数据
   * @param value 查找的值
   * @param field 查找的列表数据对应的属性
   * @returns 查找结果对象
   */
  function finds(data: Array<any>, values: any[], field = 'value') {
    const finds: any[] = []
    for (let i = 0; i < values.length; i++) {
      const find = data?.find((item: any) => item[field] === values[i])
      if (find)
        finds.push(find)
    }
    return finds
  }

  /**
   * 获取字典数据
   * @param types 字典类型数组
   * @returns 获取的字典数据结果
   */
  async function fetch(types: string[]) {
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      const result = await dictData.list({ dictType: type })
      dicts.value[type] = formatToOptions(result)
    }
    return dicts
  }

  return {
    fetch,
    dicts,
    getDict,
    formatToOptions,
    find,
    finds,
  }
}

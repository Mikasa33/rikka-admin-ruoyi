type stateType = 'add' | 'edit' | 'view' | 'custom'

export function useCrud({ idKey = 'id', title, api, query, pageQuery, listQuery, exportQuery, formatPageData, formatListData, tableRef, editRef, viewRef, modalRef, formRef, formSchemas, onBeforeOpen, onAfterOpen, onBeforeClose, onAfterClose, onGetInfoAfter, emit }: any) {
  const message = useMessage()
  const { open, close } = useModal(modalRef)
  const [loading, toggleLoading] = useToggle()
  const [saving, toggleSaving] = useToggle()
  const modalState = ref<stateType>('view')
  const modalTitle = computed(() => {
    return `${unref(modalState) === 'add' ? '新增' : unref(modalState) === 'edit' ? '编辑' : '查看'}${title}`
  })

  async function loadPage(params?: any) {
    const result = await api.page({ ...params, ...unref(query), ...unref(pageQuery) })
    return formatPageData ? formatPageData(result) : result
  }

  async function loadList(params?: any) {
    const result = await api.list({ ...params, ...unref(query), ...unref(listQuery) })
    return formatListData ? formatListData(result) : result
  }

  function onAdd(params?: any) {
    unref(editRef)?.open({ ...unref(params), modalState: 'add' })
  }

  function onEdit(params?: any) {
    unref(editRef)?.open({ ...unref(params), modalState: 'edit' })
  }

  function onView(params?: any) {
    unref(viewRef)?.open({ ...unref(params), modalState: 'view' })
  }

  async function onRemove(ids?: string[] | number[], callback?: (ids?: string[] | number[]) => void): Promise<void> {
    try {
      await api.delete({ ids })
      message.success('删除成功')
      callback?.(ids)
      onRefresh()
    }
    catch (err) {
    }
  }

  async function onRefresh() {
    await unref(tableRef)?.reload()
  }

  async function onOpen(params: { modalState?: stateType; id?: number | string } | any) {
    toggleLoading(true)
    await onBeforeOpen?.()
    await open()
    await onAfterOpen?.()
    modalState.value = params.modalState || 'view'
    await nextTick()
    unref(formRef).init(formSchemas)
    if (params.info) {
      unref(formRef).setFieldsValue(params.info)
    }
    else if (params.id) {
      try {
        const data = await api.info({ id: params.id })
        unref(formRef).setFieldsValue(data)
      }
      catch (err) {
      }
    }
    toggleLoading(false)
    onGetInfoAfter?.()
  }

  async function onSave() {
    try {
      await unref(formRef).validate()
      toggleSaving(true)
      toggleLoading(true)
      await api[unref(modalState) === 'edit' ? 'update' : 'add'](unref(formRef).getFieldsValue())
      message.success('保存成功')
      emit('refresh')
      close()
    }
    catch (err) {
    }
    finally {
      toggleSaving(false)
    }
  }

  async function onClose() {
    await onBeforeClose?.()
    await close()
    await onAfterClose?.()
  }

  return {
    loading,
    saving,
    state: modalState,
    title: modalTitle,
    loadPage,
    loadList,
    onAdd,
    onEdit,
    onView,
    onRemove,
    onRefresh,
    onOpen,
    onClose,
    onSave,
  }
}

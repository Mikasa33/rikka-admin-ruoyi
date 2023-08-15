<script setup lang="ts">
import { formSchemas } from './data/form'
import { role } from '@/apis/system/role'

const props = defineProps<{
  idKey?: string
  title?: string
}>()

const emit = defineEmits<{
  (evt: 'refresh'): void
}>()

const modalRef = ref()
const formRef = ref()

const { loading, saving, title, onOpen, onClose, onSave } = useCrud({
  idKey: props.idKey,
  title: props.title,
  api: role,
  modalRef,
  formRef,
  formSchemas,
  emit,
})

defineExpose({
  open: onOpen,
  close: onClose,
})
</script>

<template>
  <VModal
    ref="modalRef"
    :title="title"
    :loading="loading"
    :confirm-loading="saving"
    is-crud
    @confirm="onSave"
  >
    <VForm ref="formRef" />
  </VModal>
</template>

<script setup lang="ts">
import { formSchemas } from './data/form'
import { menu } from '@/apis/permission/menu'

const props = defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  (evt: 'refresh'): void
}>()

const modalRef = ref()
const formRef = ref()

const { loading, saving, title, onOpen, onClose, onSave } = useCrud({
  title: props.title,
  api: menu,
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

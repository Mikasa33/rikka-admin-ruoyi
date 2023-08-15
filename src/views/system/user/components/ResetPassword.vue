<script setup lang="ts">
import { user } from '@/apis/system/user'

const props = defineProps<{
  idKey?: string
  title?: string
}>()

const emit = defineEmits<{
  (evt: 'refresh'): void
}>()

const modalRef = ref()
const formRef = ref()

const formSchemas = [
  {
    field: 'userId',
    visible: 'hidden',
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    props: {
      type: 'password',
    },
    rules: { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
  },
]

const { loading, saving, title, onOpen, onClose, onSave } = useCrud({
  idKey: props.idKey,
  title: props.title,
  api: {
    custom: user.resetPwd,
  },
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

<script setup lang="ts">
import { formSchemas } from './data/form'
import { role } from '@/apis/permission/role'

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
    <VForm ref="formRef">
      <template #customRelevance="{ model, field }">
        <NSwitch
          v-model:value="model[field]"
          :checked-value="1"
          :unchecked-value="0"
        />
        <span class="ml-8px">是否关联上下级</span>
      </template>
    </VForm>
  </VModal>
</template>

<script setup lang="ts">
import { updatePerson } from '@/apis/comm'

const message = useMessage()
const userStore = useUserStore()
const [loading, toggleLoading] = useToggle()

const formRef = ref()

const schemas = [
  {
    field: 'id',
    visible: 'hidden',
  },
  {
    field: 'avatar',
    label: '头像',
    component: 'UploadImage',
    props: {
      max: 1,
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    rules: { required: true, message: '请输入昵称', trigger: ['blur', 'input'] },
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    props: {
      type: 'password',
    },
  },
  {
    slot: 'slot-submit',
  },
]

async function handleSave() {
  try {
    await unref(formRef).validate()
    toggleLoading(true)
    await updatePerson(unref(formRef).getFieldsValue())
    message.success('保存成功')
    userStore.getInfo()
  }
  catch (err) {

  }
  finally {
    toggleLoading(false)
  }
}

onMounted(() => {
  unref(formRef).init(schemas)
  unref(formRef).setFieldsValue(userStore.info)
})
</script>

<template>
  <div class="m-16px">
    <NCard
      title="个人设置"
      size="small"
      :bordered="false"
    >
      <NGrid>
        <NGi :span="12">
          <VForm
            ref="formRef"
            :gi-span="24"
          >
            <template #slot-submit>
              <NFormItem label=" " :show-feedback="false">
                <NButton
                  :loading="loading"
                  type="primary"
                  @click="handleSave"
                >
                  保存修改
                </NButton>
              </NFormItem>
            </template>
          </VForm>
        </NGi>
      </NGrid>
    </NCard>
  </div>
</template>

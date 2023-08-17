<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { isObject } from 'lodash-es'
import { V_FORM_PROPS } from '../inject'
import { deleteFile, listFile, uploadFile } from '@/apis/comm'

const props = withDefaults(defineProps<{
  query: any
  limitSize?: number
}>(), {
  limitSize: 10,
})

const emit = defineEmits(['finish'])

const attrs: any = useAttrs()
const dialog = useDialog()
const message = useMessage()
const [loading, toggle] = useToggle()

const formProps = inject(V_FORM_PROPS) as any

const list = ref<any[]>([])

watch(
  () => props.query,
  (val, oldVal) => {
    if (JSON.stringify(val || {}) !== JSON.stringify(oldVal || {}))
      load()
  },
  {
    immediate: true,
  },
)

async function load() {
  try {
    toggle(true)
    const result = await listFile(props.query)
    list.value = result.map((item: any) => ({ ...item, status: 'finished' }))
  }
  catch (err) {

  }
  finally {
    toggle(false)
  }
}

async function customRequest({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) {
  const formData = new FormData()
  formData.append('id', file.id)
  formData.append('file', file.file as File)

  if (isObject(props.query)) {
    for (const key in props.query)
      formData.append(key, (props.query as any)[key])
  }

  try {
    const result = await uploadFile({
      data: formData,
      onUploadProgress(e: { loaded: number; total: number }) {
        onProgress({ percent: Math.ceil((e.loaded / e.total) * 100) })
      },
    })
    file.url = result.url
    file.thumbnailUrl = result.thumbnailUrl

    message.success('上传成功')
    onFinish()
    emit('finish', { file: result, fileList: unref(list) })
  }
  catch (err) {
    message.error('上传异常')
    onError()
  }
}

function handleBeforeUpload({ file, fileList }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (attrs.onBeforeUpload) {
    if (!attrs.onBeforeUpload({ file, fileList }))
      return false
  }
  else {
    if ((file.file as File).size / 1024 / 1024 >= props.limitSize) {
      message.error(`上传文件大小不能超过 ${props.limitSize}MB`)
      return false
    }
  }

  if (attrs.max === 1)
    list.value = []

  return true
}

function handleRemove({ file }: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  return new Promise((resolve, reject) => {
    const d = dialog.warning({
      autoFocus: false,
      title: '提示',
      content: '是否确认删除此文件？',
      negativeText: '取消',
      positiveText: '确认',
      onPositiveClick: async () => {
        d.loading = true

        try {
          await deleteFile({ ids: [file.id] })
        }
        catch (err) {
          message.success('删除异常')
          return false
        }

        emit('finish', { file, fileList: unref(list) })

        resolve(true)
      },
      onNegativeClick: () => {
        resolve(false)
      },
    })
  })
}
</script>

<template>
  <NUpload
    v-bind="$attrs"
    v-model:file-list="list"
    :show-remove-button="!($attrs?.disabled as boolean || formProps.readonly || false)"
    abstract
    show-file-list
    list-type="image"
    :custom-request="customRequest"
    class="v-upload"
    @before-upload="handleBeforeUpload"
    @remove="handleRemove"
  >
    <NSpin :show="loading" class="flex flex-col w-full">
      <NUploadFileList v-if="list.length" />
      <div
        v-else
        class="py-12px border border-#e0e0e6 rounded-3px dark:border-none dark:bg-#ffffff1a"
        :class="$attrs?.disabled as boolean || formProps.readonly || false ? 'bg-#fafafc dark:!bg-#ffffff0f' : ''"
      >
        <NEmpty description="暂无文件" />
      </div>
      <NUploadTrigger
        abstract
        #="{ handleClick }"
      >
        <NButton
          v-if="!($attrs?.disabled as boolean || formProps.readonly || false)"
          block
          class="!mt-8px"
          @click="handleClick"
        >
          选择文件
        </NButton>
      </NUploadTrigger>
    </NSpin>
  </NUpload>
</template>

<style lang="less" scoped>
.v-upload {
  :deep(.n-upload-file-info) {
    .n-image {
      width: 100%;
      height: 100%;

      img {
        object-fit: cover !important;
      }
    }
  }
}
</style>

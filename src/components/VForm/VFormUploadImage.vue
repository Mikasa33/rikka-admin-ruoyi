<script setup lang="ts">
import type { UploadCustomRequestOptions, UploadFileInfo } from 'naive-ui'
import { isArray, isObject } from 'lodash-es'
import { deleteFile, uploadFile } from '@/apis/comm'

const props = withDefaults(defineProps<{
  value?: any
  query?: any
  limitSize?: number
}>(), {
  value: [],
  limitSize: 10,
})

const emit = defineEmits(['update:value', 'finish'])

const attrs: any = useAttrs()
const dialog = useDialog()
const message = useMessage()

const list = ref<any[]>([])

watch(
  () => props.value,
  (val: any) => {
    if (!val)
      return

    if (isArray(val)) {
      list.value = val.map((item: any) => ({
        url: item,
        status: 'finished',
      }))
    }
    else {
      list.value = [{
        url: val,
        status: 'finished',
      }]
    }
  },
  {
    immediate: true,
  },
)

async function customRequest({ file, onFinish, onError, onProgress }: UploadCustomRequestOptions) {
  const formData = new FormData()
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
    emit('update:value', attrs.max !== 1 ? unref(list).map((item: any) => item.url) : unref(list)?.[0].url)
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

        emit('update:value', attrs.max !== 1 ? unref(list).map((item: any) => item.url) : unref(list)?.[0]?.url)
        emit('finish', { file, fileList: unref(list) })

        return true
      },
      onNegativeClick: () => {
        return false
      },
    })
  })
}
</script>

<template>
  <NUpload
    v-bind="$attrs"
    v-model:file-list="list"
    list-type="image-card"
    accept="image/*"
    :custom-request="customRequest"
    class="v-upload"
    @before-upload="handleBeforeUpload"
    @remove="handleRemove"
  />
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

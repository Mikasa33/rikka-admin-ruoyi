<script setup lang="ts">
defineOptions({
  name: 'Home',
})

const user = useUserStore()
const name = ref(user.savedName)

const router = useRouter()
function go() {
  if (name.value)
    router.push(`/hi/${encodeURIComponent(name.value)}`)
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div class="text-4xl">
      <div class="i-carbon-campsite inline-block" />
    </div>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/Mikasa33/void-template-vue"
        target="_blank"
      >
        void-template-vue
      </a>
    </p>
    <p>
      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>
    </p>

    <div class="py-4" />

    <TheInput
      v-model="name"
      :placeholder="t('intro.whats-your-name')"
      autocomplete="false"
      @keydown.enter="go"
    />
    <label
      class="hidden"
      for="input"
    >
      {{ t('intro.whats-your-name') }}
    </label>

    <div>
      <button
        class="m-3 text-sm px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
        :disabled="!name"
        @click="go"
      >
        {{ t('button.go') }}
      </button>
    </div>
  </div>
</template>

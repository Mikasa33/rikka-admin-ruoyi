<script setup lang="ts">
defineOptions({
  name: 'Hi',
})

const route = useRoute()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const name = computed(() => route.params?.name as string)

watchEffect(() => {
  user.setNewName(unref(name))
})
</script>

<template>
  <div>
    <div class="text-4xl">
      <div class="i-carbon-pedestrian inline-block" />
    </div>
    <p>
      {{ t('intro.hi', { name }) }}
    </p>

    <p class="text-sm opacity-75">
      <em>{{ t('intro.dynamic-route') }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <p class="mt-4 text-sm">
        <span class="opacity-75">{{ t('intro.aka') }}:</span>
        <ul>
          <li
            v-for="otherName in user.otherNames"
            :key="otherName"
          >
            <RouterLink :to="`/hi/${otherName}`" replace>
              {{ otherName }}
            </RouterLink>
          </li>
        </ul>
      </p>
    </template>

    <div>
      <button
        class="m-3 mt-6 text-sm px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50"
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>

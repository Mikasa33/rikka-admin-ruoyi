<script setup lang="ts">
import { availableLocales, loadLanguageAsync } from '@/plugins/i18n'

const { t, locale } = useI18n()

async function toggleLocales() {
  // change to some real logic
  const locales = availableLocales
  const newLocale = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}

function onClick() {
  toggleDark()
}
</script>

<template>
  <nav class="flex flex-gap-4 mt-6 justify-center text-xl">
    <RouterLink
      icon-btn
      to="/"
      :title="t('button.home')"
    >
      <div i-carbon-campsite />
    </RouterLink>

    <button
      class="inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600"
      :title="t('button.toggle_dark')"
      @click="onClick"
    >
      <div i="carbon-sun dark:carbon-moon" />
    </button>

    <a
      class="inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600"
      :title="t('button.toggle_langs')"
      @click="toggleLocales()"
    >
      <div i-carbon-language />
    </a>

    <RouterLink
      class="inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600"
      to="/about"
      :title="t('button.about')"
      data-test-id="about"
    >
      <div i-carbon-dicom-overlay />
    </RouterLink>

    <a
      class="inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600"
      rel="noreferrer"
      href="https://github.com/Mikasa33/void-template-vue"
      target="_blank"
      title="GitHub"
    >
      <div i-carbon-logo-github />
    </a>
  </nav>
</template>

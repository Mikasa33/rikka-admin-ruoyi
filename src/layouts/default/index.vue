<script setup lang="ts">
import Header from './components/Header.vue'
import Sider from './components/Sider.vue'
import ProjectSetting from './components/ProjectSetting.vue'

const themeStore = useThemeStore()
const { LAYOUT_ON_RELOAD_KEY, isReload, onReload } = useReload()

provide(LAYOUT_ON_RELOAD_KEY, onReload)

const headerHeight = 64
</script>

<template>
  <NLayout has-sider position="absolute">
    <Sider :header-height="headerHeight" />
    <NLayout>
      <Header :height="headerHeight" />
      <NLayout
        :native-scrollbar="false"
        :style="{
          marginTop: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }"
      >
        <NLayoutContent :content-style="{ minHeight: `calc(100vh - ${headerHeight}px)`, backgroundColor: themeStore.isDark ? '#101014' : '#f0f2f5' }">
          <RouterView
            v-if="!isReload"
            #="{ Component }"
          >
            <Transition
              :name="themeStore.pageAnimateModeVal"
              mode="out-in"
              appear
            >
              <Component :is="Component" />
            </Transition>
          </RouterView>
        </NLayoutContent>
        <NBackTop />
      </NLayout>
    </NLayout>
  </NLayout>

  <ProjectSetting />
</template>

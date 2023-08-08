<script setup lang="ts">
import { animateModes, themeColors, whiteColors } from '@/settings/projectSetting'

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <NButton
      type="primary"
      class="top-50% shadow-lg !fixed -right-2px !z-999 !h-42px !w-42px"
      :style="{ transform: 'translateY(-50%)' }"
      @click="themeStore.toggleShow()"
    >
      <template #icon>
        <div class="i-icon-park-outline-platte" />
      </template>
    </NButton>

    <NDrawer
      :show="themeStore.show"
      :auto-focus="false"
      :width="330"
      @update:show="themeStore.toggleShow()"
    >
      <NDrawerContent
        title="主题配置"
        closable
      >
        <NDivider title-placement="center">
          主题
        </NDivider>
        <NSpace
          vertical
          size="large"
        >
          <NSpace justify="space-between">
            <div>深色主题</div>
            <NSwitch
              :value="themeStore.isDark"
              @update:value="themeStore.toggleDark()"
            />
          </NSpace>
        </NSpace>
        <NDivider title-placement="center">
          系统主题
        </NDivider>
        <NSpace
          vertical
          size="large"
        >
          <NGrid
            :cols="8"
            :x-gap="8"
            :y-gap="12"
          >
            <NGridItem
              v-for="(color, index) in themeColors"
              :key="index"
              class="flex-x-center"
            >
              <!-- <color-checkbox :color="color" :checked="color === theme.themeColor" @click="theme.setThemeColor(color)" /> -->
              <div
                class="h-20px w-20px flex-center cursor-pointer rounded-2px"
                :style="{ backgroundColor: color }"
                @click="themeStore.setThemeColor(color)"
              >
                <div
                  v-if="color === themeStore.themeColor"
                  class="i-icon-park-outline-check text-10px"
                  :class="[whiteColors.includes(color) ? 'text-gray-700' : 'text-white']"
                />
              </div>
            </NGridItem>
          </NGrid>
          <NColorPicker
            :value="themeStore.themeColor"
            :show-alpha="false"
            placement="bottom"
            @update-value="themeStore.setThemeColor"
          />
        </NSpace>
        <NDivider title-placement="center">
          界面显示
        </NDivider>
        <NSpace
          vertical
          size="large"
        >
          <NSpace justify="space-between">
            <div>面包屑</div>
            <NSwitch
              :value="themeStore.breadcrumbVisible"
              @update:value="themeStore.setBreadcrumbVisible"
            />
          </NSpace>
          <NSpace justify="space-between">
            <div>页面切换动画</div>
            <NSwitch
              :value="themeStore.pageAnimate"
              @update:value="themeStore.setPageAnimate"
            />
          </NSpace>
          <NSpace justify="space-between" align="center">
            <div>页面切换动画类型</div>
            <NSelect
              :value="themeStore.pageAnimateMode"
              :options="animateModes"
              :disabled="!themeStore.pageAnimate"
              size="small"
              class="!w-120px"
              @update:value="themeStore.setPageAnimateMode"
            />
          </NSpace>
        </NSpace>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

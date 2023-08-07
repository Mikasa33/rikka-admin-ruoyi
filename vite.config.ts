import { URL, fileURLToPath } from 'node:url'
import path from 'node:path'
import process from 'node:process'

import type { ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config
export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd()
  const isBuild = command === 'build'
  const { VITE_PUBLIC_PATH, VITE_USE_MOCK, VITE_PORT } = loadEnv(mode, root)

  return defineConfig({
    base: VITE_PUBLIC_PATH,
    plugins: [
      // https://vuejs.org
      vue(),

      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          '@vueuse/head',
          'pinia',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: [
          'src/composables',
          'src/hooks',
          'src/stores',
        ],
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'types/components.d.ts',
        resolvers: [NaiveUiResolver()],
      }),

      // https://github.com/antfu/unplugin-vue-components
      Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'types/components.d.ts',
      }),

      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: [path.resolve(__dirname, 'locales/**')],
      }),

      // https://github.com/webfansplz/vite-plugin-vue-devtools
      VueDevTools(),

      // https://github.com/vbenjs/vite-plugin-mock
      viteMockServe({
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: !isBuild && VITE_USE_MOCK === 'true',
        prodEnabled: isBuild && VITE_USE_MOCK === 'true',
        injectCode: `
          import { setupProdMockServer } from './plugins/mock';
          setupProdMockServer();
        `,
      }),

      // https://github.com/antfu/unocss
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: true,
      port: Number(VITE_PORT),
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}

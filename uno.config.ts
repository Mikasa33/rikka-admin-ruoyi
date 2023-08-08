import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['flex-x-center', 'flex justify-center'],
    ['flex-y-center', 'flex items-center'],
    ['transition-base', 'transition duration-300'],
    ['wh-full', 'w-full h-full'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    // 想全走 CDN 加载图标，就把这个注掉，详细去看 index.html
    presetIcons({
      scale: 1.2,
      warn: true,
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
    presetWebFonts(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})

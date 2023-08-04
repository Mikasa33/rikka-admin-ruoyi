import type { App } from 'vue'

// Setup Pinia
// https://pinia.vuejs.org/
export function setupPinia(app: App) {
  const pinia = createPinia()
  app.use(pinia)
}

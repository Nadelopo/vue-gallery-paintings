import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import './styles/base.sass'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./App.vue')
    }
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

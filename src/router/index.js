import { createRouter, createWebHistory } from 'vue-router'
import WeatherView from '../components/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/weatherview',
      name: 'weatherview',
      component: WeatherView
    }
  ]
})

export default router
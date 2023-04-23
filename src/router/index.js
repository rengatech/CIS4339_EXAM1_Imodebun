import { createRouter, createWebHistory } from 'vue-router';
import WeatherView from '../components/WeatherView.vue';
import HelloWorld from '../components/HelloWorld.vue';
import About from '../components/About.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/weatherview',
      name: 'weatherview',
      component: WeatherView
    }
  ]
})

export default router
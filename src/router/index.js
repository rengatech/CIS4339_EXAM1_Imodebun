// This code imports the createRouter and createWebHistory functions from the vue-router library, as well as three Vue components: WeatherView, HelloWorld, and About.

// The createRouter function is used to create a new router instance, which will be used to handle navigation between the different views in the application.

// A history object is created using the createWebHistory function, which enables the use of HTML5 History API for navigation instead of using the default hash-based navigation.

// The routes array defines the available routes in the application, which consist of a path, a name, and a component that should be displayed when the route is navigated to.

// The router instance is exported as the default value of this module, which can be imported in other parts of the application to enable routing functionality.

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
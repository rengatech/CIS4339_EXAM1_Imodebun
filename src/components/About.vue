<script setup>
import { ref } from 'vue'

</script>

<template>
  <h1 class="green">About page</h1>
  <ul>
    <li><router-link to="/">Go to Home</router-link></li>
    <li>
      <router-link to="/about">Go to About</router-link>
    </li>
    <li>
      <router-link to="/weatherview">Go to Weather View</router-link>
    </li>
  </ul>

</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.green {
  color: green;
}
</style>

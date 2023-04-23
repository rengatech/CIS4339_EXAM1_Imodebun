<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import axios from "axios";
import './js/app.js'

const options = {
  method: 'GET',
  url: 'https://weatherapi-com.p.rapidapi.com/current.json',
  params: {q: '53.1,-0.13'},
  headers: {
    'X-RapidAPI-Key': 'dad336dc78msh7d991d24a2dc85fp1fcb63jsn9be4ee63eda3',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

defineProps({
  msg: {
    type: String,
    required: true
  }
})

</script>

<template>
 <div class="greetings row mt-5  d-flex topheight justify-content-center align-items-center">
  <div class="col m-5">
    <div>
      <div class="d-flex flex-wrap">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png" width="90">
    </div>
    <div>
      <HelloWorld msg="You did it!" />
    <h3>
      You’ve successfully created a project with
      <a target="_blank" href="https://vitejs.dev/">Vite</a> +
      <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
    </h3>
    </div>
    <div class="d-flex m-3 gap-3">
      <a href="/home" class="text-black fw-bold text-decoration-none title">Home</a>
      <a href="/about" class="text-black fw-bold text-decoration-none title">About</a>
      <a href="/weatherview" class="text-black fw-bold text-decoration-none title">Weather</a>
    </div>
    </div>

  </div>
  <div class="col">
  <h1>Weather Date</h1>
  <p>Please fill the form and use the submit button to load data.</p>
  <from method="GET">
    <div>
      <label class="w-100 bold">Location</label>
      <input class=" form-control w-100 p-2 rounded "  type="text" name="location" v-model="name" placeholder="Type Your Location City" >
    </div>
    <div>
      <label class="w-100 bold">Start Date</label>
      <input class="form-control w-100 p-2 rounded"  type="date" name="startdate" id="">
    </div>
    <div>
      <label class="w-100 bold">End Date</label>
      <input class="form-control w-100 p-2 rounded"  type="date" name="enddate" id="">
    </div>
    <button type="sumbit" class="btn btn-danger mt-3">Submit</button>
  </from>

  </div>
  <div>
    <div id='polynomial2_div' style='width: 900px; height: 500px;'></div>
  </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.topheight{
  height: 700px;
}
.title:hover{
background-color: white !important;

}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}


</style>
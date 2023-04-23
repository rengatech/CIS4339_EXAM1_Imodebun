<script setup>
import { ref } from 'vue';
import axios from "axios";
import LineChart from './LineChart.vue';

const requestData = ref({
  location: null,
  startDate: null,
  endDate: null,
})

const numDays = () => {
  // Define two dates in the format "yyyy-mm-dd"
  const date1 = new Date(requestData.value.startDate);
  const date2 = new Date(requestData.value.endDate);

  // Calculate the difference in milliseconds
  const diffInMs = date2 - date1;

  // Convert the difference to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // Round the result to two decimal places
  const roundedDiff = parseInt(diffInDays.toFixed(2));



    return roundedDiff +1;

}


const getChartOptions = {
  responsive: true
}

const dataLoaded = ref(false);
const getChartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Weather history',
      backgroundColor: '#f87979',
      data: []
    }
  ]
})

const getMaxDate = () => {
  var today = new Date();

  var year = today.getFullYear();
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var day = String(today.getDate()).padStart(2, '0');

  var formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

const getMinStartDate = () => {
  var today = new Date();
  var sevenDaysAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000));

  var year = sevenDaysAgo.getFullYear();
  var month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0');
  var day = String(sevenDaysAgo.getDate()).padStart(2, '0');

  var formattedDate = `${year}-${month}-${day}`;

  return formattedDate;

}

const submit = () => {
  console.log(requestData.value);
  dataLoaded.value = false
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/history.json',
    params: {
      q: requestData.value.location,
      dt: requestData.value.startDate,
      end_dt: requestData.value.endDate
    },
    headers: {
      'X-RapidAPI-Key': 'bc297cc6d4msh31d53d33a24095fp1c421djsn23995d64bce5',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    const responseData = {
      labels: [],
      data: [],
    };
    response.data.forecast.forecastday.forEach(element => {
      responseData.labels.push(element.date)
      responseData.data.push(element.day.maxtemp_c)
    })

    console.log(responseData);

    getChartData.value.labels = responseData.labels
    getChartData.value.datasets[0].data = responseData.data

    dataLoaded.value = true;
  }).catch(function (error) {
    console.error(error);
  });
}



</script>

<template>
  <div class="container">
    <div class="greetings row mt-5  d-flex topheight justify-content-center align-items-center">
      <div class="col m-5">
        <div>
          <div class="d-flex flex-wrap">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
              width="90" />
          </div>
          <div>
            <h1 class="green">You did it!</h1>

            <h3>
              You’ve successfully created a project with
              <a target="_blank" href="https://vitejs.dev/">Vite</a> +
              <a target="_blank" href="https://vuejs.org/">Vue 3</a>.
            </h3>
          </div>
          <div class="d-flex m-3 gap-3">
            <router-link to="/">Home</router-link>
            <router-link to="/about">About</router-link>
            <router-link to="/weatherview">Weather View</router-link>
          </div>
        </div>

      </div>
      <div class="col">
        <h1>Weather Date</h1>
        <p>Please fill the form and use the submit button to load data.</p>
        <div>
          <label class="w-100 bold">Location</label>
          <input class=" form-control w-100 p-2 rounded " type="text" v-model="requestData.location"
            placeholder="Type Your Location City" />
        </div>
        <div>
          <label class="w-100 bold">Start Date</label>
          <input class="form-control w-100 p-2 rounded" type="date" :min="getMinStartDate()" :max="getMaxDate()"
            v-model="requestData.startDate" />
        </div>
        <div>
          <label class="w-100 bold">End Date</label>
          <input class="form-control w-100 p-2 rounded" type="date" :min="requestData.startDate" :max="getMaxDate()"
            v-model="requestData.endDate" />
        </div>
        <button @click="submit" type="sumbit" class="btn btn-danger mt-3">Submit</button>
        <div v-if="dataLoaded">
          Data has been loaded for {{ numDays() }} {{ numDays() > 1 ? 'days' : 'day' }}
          <LineChart :chartOptions="getChartOptions" :chartData="getChartData" />
        </div>
      </div>

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

.topheight {
  height: 700px;
}

.title:hover {
  background-color: white !important;

}

@media (min-width: 1024px) {

  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
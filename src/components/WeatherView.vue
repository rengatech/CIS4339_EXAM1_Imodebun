<!-- This is a Vue.js script that sets up some reactive variables, functions and an event listener for a form submission. 
It imports the ref and axios modules and the LineChart component from another file. -->

<script setup>
import { ref } from 'vue';
import axios from "axios";
import LineChart from './LineChart.vue';

// Define a reactive variable with an object containing the data for the form.
const requestData = ref({
  location: null,
  startDate: null,
  endDate: null,
})

// Define a function to calculate the number of days between two dates.
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

// Define an object with options for a chart.
const getChartOptions = {
  responsive: true
}

// Define two reactive variables with an object for the chart data and a boolean for whether data has been loaded.
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

// Define two functions to get the maximum date and minimum start date for the date inputs.
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

// Define a function to handle form submission.
const submit = () => {

  dataLoaded.value = false // Set dataLoaded to false.
  // Define options for a GET request to the weather API.
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

  // Make the GET request and update the chart data with the response.
  axios.request(options).then(function (response) {

    // Create a new object with empty 'labels' and 'data' properties
    const responseData = {
      labels: [],
      data: [],
    };
    // For each element in the forecastday array of the response data, 
    // push the date to the 'labels' array and the max temperature to the 'data' array
    response.data.forecast.forecastday.forEach(element => {
      responseData.labels.push(element.date)
      responseData.data.push(element.day.maxtemp_c)
    })

    // Set the 'labels' property of 'getChartData' to the 'labels' array of 'responseData'
    // and set the 'data' property of the first dataset of 'getChartData' to the 'data' array of 'responseData'
    getChartData.value.labels = responseData.labels
    getChartData.value.datasets[0].data = responseData.data
    // Set the 'dataLoaded' flag to true, indicating that the data has been loaded successfully
    dataLoaded.value = true;
  }).catch(function (error) {
    // If there is an error, log the error to the console
    console.error(error);
  });
}

</script>

// The template tag is a Vue.js component that defines the HTML markup for the template.
// The div class="container" tag defines a container for the template.
// The div class="greetings row mt-5 d-flex topheight justify-content-center align-items-center"> tag defines a row that contains the greetings and weather form.
// The div class="col m-5" tag defines a column that contains the greetings.
// The img tag displays the Vue.js logo.
// The h1 and h3 tags display a message congratulating the user for successfully creating a project with Vite and Vue 3, and providing links to the Home, About, and Weather View pages.
// The router-link> tags are used to create links to different pages in the application.
// The div class="col"> tag defines a column that contains the weather form.
// The h1> tag displays the title "Weather Date".
// The p> tag displays a message telling the user to fill out the form to load data.
// The input> tags allow the user to input their location and dates.
// The v-model directive is used to bind the input fields to the component's data.
// The :min and :max directives are used to set the minimum and maximum values for the date input fields.
// The @click directive is used to bind the button to a function that is triggered when the user clicks it.
// The v-if directive is used to conditionally render the data-loaded message and the line chart component based on whether the data has been loaded or not.
// The LineChart component is a custom component that displays a line chart using the chart.js library. The component takes two props, chartOptions and chartData, which are used to configure the chart.

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


// h1 styling:
// font-weight: 500;: sets the font weight to 500 (medium)
// font-size: 2.6rem;: sets the font size to 2.6 rem
// top: -10px;: positions the element 10 pixels above its original position
// h3 styling:
// font-size: 1.2rem;: sets the font size to 1.2 rem
// .greetings h1 and .greetings h3 styling:
// text-align: center;: centers the text horizontally
// .topheight styling:
// height: 700px;: sets the height of the element to 700 pixels
// .title:hover styling:
// background-color: white !important;: sets the background color to white when the element is hovered over
// @media (min-width: 1024px) rule:
// Targets devices with a screen width of 1024 pixels or more
// .greetings h1 and .greetings h3 styling:
// text-align: left;: aligns the text to the left side of the container.

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
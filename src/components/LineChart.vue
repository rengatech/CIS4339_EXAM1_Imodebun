<script setup>
import axios from "axios"; // Importing axios library for HTTP requests
import { Line } from 'vue-chartjs' // Importing Line chart component from vue-chartjs library
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js' // Importing Chart.js libraries and components

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement) // Registering Chart.js libraries and components

const props = defineProps({
    chartOptions: {
        type: Object,
        required: true
    },
    chartData: {
        type: Object,
        required: true
    }
}); // Defining props for the component using the defineProps function

</script>

<template>
    <!-- This is the template for the Line chart component -->
    <!-- Passing chart options as a prop to the Line chart component
     Passing chart data as a prop to the Line chart component -->
    <Line
        id="line-chart"
        :options="props.chartOptions"
        :data="props.chartData"
    />
</template>

<style scoped>
/* This is the scoped CSS style block for this component */
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
    /* CSS rules for screens with minimum width of 1024px */
    .greetings h1,
    .greetings h3 {
        text-align: left;
    }
}
</style>

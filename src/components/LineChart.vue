<script setup>
import axios from "axios";
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

const props = defineProps({
    chartOptions: {
        type: Object,
        required: true
    },
    chartData: {
        type: Object,
        required: true
    }
});

</script>

<template>
    
      <Line
    id="line-chart"
    :options="props.chartOptions"
    :data="props.chartData"
  />
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
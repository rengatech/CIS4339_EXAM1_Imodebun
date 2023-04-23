import { createApp } from 'vue'
//importing the root component component from App.vue
import App from './App.vue'

// importing instructions for router (not part of helloworld)
import router from './router'

//import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
//import bootstrap library
import "bootstrap";


//create Vue app instance
const app = createApp(App)
// add router middleware to our instance
app.use(router)
//mount instance into html
app.mount('#app')

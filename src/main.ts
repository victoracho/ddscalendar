
// Import Bootstrap and BootstrapVue CSS files (order is important)
// import 'bootstrap/scss/bootstrap.scss'
import './scss/global.scss';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'floating-vue/dist/style.css' //The css file to use the floating-vue component styles
import '@vuepic/vue-datepicker/dist/main.css'

import { createApp } from 'vue'
import axios from 'axios'

import { createBootstrap } from 'bootstrap-vue-next'
import FloatingVue from 'floating-vue'
import VuedatePicker from '@vuepic/vue-datepicker'
import { pinia } from './stores/calendar';
import moment from 'moment'

import App from './App.vue'
import router from './router'
// BX24.init(function() {
//   console.log("Bitrix24 API inicializada");
// })

const app = createApp(App)

axios.defaults.baseURL = 'https://daso.dasoddscolor.com/'

FloatingVue.options.distance = 2

app.use(pinia)
app.config.globalProperties.$filters = {
  timeAgo(date) {
    return moment(date).fromNow()
  },
}
app.use(router)
app.use(createBootstrap())
app.use(FloatingVue)
app.provide('user', user)
app.provide('deal', deal)
app.provide('deal_name', deal_name)
app.component('VueDatePicker', VuedatePicker)
app.mount('#app')


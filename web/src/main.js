import Vue from 'vue'
import App from './App.vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import './assets/iconfont/iconfont.css'

// 全局引入组件
import Card from './components/Card'
Vue.component('m-card', Card)
import ListCard from './components/ListCard'
Vue.component('m-list-card', ListCard)

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false


import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: 'http://localhost:3000/web/api'
})

import './assets/scss/style.scss'
import router from './router'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

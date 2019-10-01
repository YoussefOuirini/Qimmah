import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from "firebase";

import App from './App.vue'
import { config } from './config.js'

firebase.initializeApp(config.firebase);

Vue.config.productionTip = false

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

new Vue({
  render: h => h(App),
}).$mount('#app')

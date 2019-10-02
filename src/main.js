import Vue from 'vue'
import firebase from 'firebase'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import { router } from './router'

Vue.config.productionTip = false

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

let app = '';

firebase.auth().onAuthStateChanged(()=> {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app')
  }
})

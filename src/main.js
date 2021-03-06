import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue';
import App from './App.vue';
import { router } from './router';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

let app = '';

firebase.auth().onAuthStateChanged(()=> {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});

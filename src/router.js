import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router);

export const router = new Router ({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registreer',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
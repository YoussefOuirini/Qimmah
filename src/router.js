import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'

Vue.use(Router);

export const router = new Router ({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
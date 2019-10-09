import firebase from 'firebase';

import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Teacher from './views/Teacher.vue'

Vue.use(Router);

const router = new Router ({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/leraar',
      name: 'leraar',
      component: Teacher,
      meta: {
        requiresAuth: true
      }
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

router.beforeEach((to, from, next)=> {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login');
  else if (requiresAuth && to === 'leraar' && currentUser.getIdTokenResult().claims.moderator) next('leraar')
  else if (!requiresAuth && currentUser) next('home');
  else next();
})

export { router };
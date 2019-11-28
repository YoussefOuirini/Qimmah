import firebase from 'firebase/app';
import 'firebase/auth';

import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import School from './views/School.vue';
import ClassRoom from './views/ClassRoom.vue';
import Attendance from './views/Attendance.vue';
import { checkUserClaim } from './firebase';

Vue.use(Router);

const router = new Router ({
  mode: 'history',
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
      path: '/school',
      name: 'school',
      component: School,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group',
      name: 'ClassRoom',
      component: ClassRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/aanwezigheid',
      name: 'Attendance',
      component: Attendance,
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

router.beforeEach(async (to, from, next)=> {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !currentUser) next('login');
  else if (requiresAuth && to.name === 'school') {
    const isModerator = await checkUserClaim('moderator');
    if (isModerator) {
      next();
    } else{
      next('false');
    }
  }
  else if (requiresAuth && to.path === '/group') {
    const isTeacher = await checkUserClaim('teacher');
    if (isTeacher) {
      next();
    } else{
      next('false');
    }
  }
  else if (!requiresAuth && currentUser) next('home');
  else next();
})

export { router };
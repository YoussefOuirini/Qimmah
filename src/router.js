import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import School from './views/School.vue';
import ClassRoom from './views/ClassRoom.vue';
import Jitsi from './views/Jitsi.vue';
import { checkUserClaim, getCurrentUser, userIs } from './firebase/firebase';

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
      path: '/klas',
      name: 'ClassRoom',
      component: ClassRoom,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/jitsi/:groupName',
      name: 'jitsi',
      component: Jitsi,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
});

router.beforeEach(async (to, from, next)=> {
  const currentUser = getCurrentUser();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (requiresAuth && to.name === 'school') {
    const isModerator = await checkUserClaim('moderator');
    if (isModerator) {
      next();
    } else{
      next('false');
    }
  }
  else if (requiresAuth && to.path === '/klas') {
    const teacher = getCurrentUser();
    const userIsTeacher = await userIs(teacher);
    if (userIsTeacher) {
      next();
    } else{
      next('false');
    }
  }
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export { router };
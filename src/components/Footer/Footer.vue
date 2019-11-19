<template>
  <footer>
    <br>
    <b-container>
      <br><b-button v-if="loggedInUser" @click="logout">Uitloggen</b-button><br>
      &copy; 2019 Copyright Qimmah v{{version}}
    </b-container>
  </footer>
</template>

<script>
  import Vue from "vue";
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { EventBus } from "../../EventBus";
  import {version} from '../../../package.json';

  export default Vue.extend({
    name: "Footer",
    mounted() {
      this.loggedInUser = firebase.auth().currentUser;
      EventBus.$on('userLoginChange', () => {
        this.loggedInUser = firebase.auth().currentUser;
      })
    },
    data() {
      return {
        loggedInUser: false,
        version: version
      }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          EventBus.reloadLoggedinUser();
          this.loggedInUser = firebase.auth().currentUser;
          this.$router.replace('login')
        })
      }
    }
  })
</script>
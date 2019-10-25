<template>
  <footer>
    <br>
    <b-container>
      <br><b-button v-if="loggedInUser" @click="logout">Uitloggen</b-button><br>
      &copy; 2019 Copyright: Youssef's creations
    </b-container>
  </footer>
</template>

<script>
  import Vue from "vue";
  import firebase from 'firebase/app';
  import 'firebase/auth';
  import { EventBus } from "../../EventBus";

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
        loggedInUser: false
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
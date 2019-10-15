<template>
  <footer>
    <br>
    <b-container>
      &copy; 2019 Copyright: Youssef's creations
      <br><b-button v-if="loggedInUser" @click="logout">Uitloggen</b-button>
    </b-container>
  </footer>
</template>

<script>
  import Vue from "vue";
  import firebase from 'firebase';
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
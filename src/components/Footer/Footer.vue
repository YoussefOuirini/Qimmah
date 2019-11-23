<template>
  <footer>
    <b-container class="footer">
      <br><b-button v-if="loggedInUser" @click="logout">Uitloggen</b-button><br>
      &copy; 2019 Copyright | Qimmah {{version}} | <a href="mailto:info@qimmah.nl"> info@qimmah.nl</a>
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

<style scoped>
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    text-align: center;
  }
</style>
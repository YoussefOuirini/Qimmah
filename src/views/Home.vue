<template>
  <b-container>
      <RegistrationForm />
      <b-button @click="logout">Uitloggen</b-button>
  </b-container>
</template>

<script>
  import firebase from 'firebase';

  import Vue from "vue";
  import RegistrationForm from "../components/RegistrationForm/RegistrationForm.vue";

  export default Vue.extend({
    name: "App",
    components: {
      RegistrationForm,
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  })
</script>
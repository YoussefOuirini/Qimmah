<template>
  <b-container>
    <Registrations />
    <br><b-button v-b-toggle.collapse-registration variant="primary"> Schrijf u of uw kind in!</b-button><br>
    <b-collapse id="collapse-registration" class="mt-2">
      <RegistrationForm />
    </b-collapse>
    <br><b-button @click="logout">Uitloggen</b-button>
  </b-container>
</template>

<script>
  import firebase from 'firebase';

  import Vue from "vue";
  import RegistrationForm from "../components/RegistrationForm/RegistrationForm.vue";
  import Registrations from "../components/Registrations/Registrations.vue"

  export default Vue.extend({
    name: "App",
    components: {
      RegistrationForm,
      Registrations
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
<template>
  <b-container>
    <Registrations v-bind:registrations="registrations"/>
    <Absence v-bind:registrations="registrations"/>
    <br><b-button v-b-toggle.collapse-registration variant="primary"> Schrijf u of uw kind in!</b-button><br>
    <b-collapse id="collapse-registration" class="mt-2">
      <RegistrationForm />
    </b-collapse>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import RegistrationForm from "../components/RegistrationForm/RegistrationForm.vue";
  import Registrations from "../components/Registrations/Registrations.vue";
  import Absence from "../components/Absence/Absence.vue";
  import { EventBus } from "../EventBus";

  import { getUsersRegistrations } from "@/firebase";

  export default Vue.extend({
    name: "Home",
    components: {
      RegistrationForm,
      Registrations,
      Absence
    },
    mounted() {
      this.loadRegistrations(),
      EventBus.$on('registration', () => {
        this.loadRegistrations();
      })
    },
    data() {
      return {
        registrations: [],
      }
    },
    methods: {
      async loadRegistrations() {
        this.registrations = await getUsersRegistrations()
        this.isLoaded = true;
      },
    }
  })
</script>
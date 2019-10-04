<template>
  <b-container v-if="isLoaded === true">
    <b-row v-for="registration in registrations" v-bind:key="registration.id">
      {{registration}}
    </b-row>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import { getRegistrations } from "@/firebase";

  export default Vue.extend ({
    name: "Registrations",
    mounted() {
      this.loadRegistrations()
    },
    data() {
      return {
        isLoaded: false,
        registrations: []
      }
    },
    methods: {
      async loadRegistrations() {
        this.registrations = await getRegistrations()
        this.isLoaded = true;
      }
    }
  })
</script>
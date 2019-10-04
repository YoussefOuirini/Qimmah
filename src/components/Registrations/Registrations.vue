<template>
  <b-container v-if="isLoaded === true">
    <b-table striped hover :items="registrations"></b-table>
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
<template>
  <b-container v-if="registrations.length">
    <h1>Meld uw kind af voor de les.</h1>
  </b-container>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: "Absence",
    props: ["registrations"],
    mounted() {
      
    },
  })
</script>
<template>
  <div id="app">
    <Header />
    <RegistrationForm />
  </div>
</template>

<script>
  import Vue from "vue";
  import RegistrationForm from "./RegistrationForm/RegistrationForm.vue";
  import Header from "./Header/Header.vue"

  export default Vue.extend({
    name: "App",
    components: {
      Header,
      RegistrationForm
    }
  })
</script>
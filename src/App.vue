<template>
  <div id="app">
    <Header />
    <RegistrationForm />
    <Footer />
  </div>
</template>

<script>
  import Vue from "vue";
  import RegistrationForm from "./RegistrationForm/RegistrationForm.vue";
  import Header from "./Header/Header.vue"
  import Footer from "./Footer/Footer.vue"

  export default Vue.extend({
    name: "App",
    components: {
      Header,
      RegistrationForm,
      Footer
    }
  })
</script>
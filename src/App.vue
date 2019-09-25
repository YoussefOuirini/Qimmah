<template>
  <div id="app">
    <Header />
    <RegistrationForm />
    <Footer />
  </div>
</template>

<script>
  import Vue from "vue";
  import RegistrationForm from "./components/RegistrationForm/RegistrationForm.vue";
  import Header from "./components/Header/Header.vue";
  import Footer from "./components/Footer/Footer.vue";

  export default Vue.extend({
    name: "App",
    components: {
      Header,
      RegistrationForm,
      Footer
    }
  })
</script>
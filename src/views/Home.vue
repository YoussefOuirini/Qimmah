<template>
  <RegistrationForm />
</template>

<script>
  import Vue from "vue";
  import RegistrationForm from "../components/RegistrationForm/RegistrationForm.vue";

  export default Vue.extend({
    name: "App",
    components: {
      RegistrationForm,
    }
  })
</script>
<template>
  <b-container class="login">
    <h3> Inloggen</h3>
    <b-input type="text" placeholder="Email"></b-input><br>
    <b-input type="password" placeholder="Wachtwoord"></b-input><br>
    <b-button @click="login">Inloggen</b-button>
    <p>Nog geen account? <router-link to="/sign-up">Maak er een!</router-link></p>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {};
  },
  methods: {
    login() {
      this.$router.replace('home');
    }
  }
}
</script>

<style scoped>
  .login {
    margin-top: 40px
  }
  input {
    margin: 10px 0;
    width: auto;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 20%;
    cursor: pointer
  }
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
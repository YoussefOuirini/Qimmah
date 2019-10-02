<template>
  <b-container class="login">
    <h3> Inloggen</h3>
    <b-input type="text" placeholder="Email"></b-input>
    <b-input type="password" placeholder="Wachtwoord"></b-input>
    <b-button>Connection</b-button>
    <p>Nog geen account? Maak er een!</p>
  </b-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {};
  },
  methods: {}
}
</script>

<style scoped>
  .login {
    margin-top: 40px
  }
  b-input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  b-button {
    margin-top: 20px;
    width: 10%;
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
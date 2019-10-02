<template>
  <b-container class="login">
    <h3> Inloggen</h3>
    <b-input type="text" v-model="email" placeholder="Email"></b-input><br>
    <b-input type="password" v-model="password" placeholder="Wachtwoord"></b-input><br>
    <b-button @click="login">Inloggen</b-button>
    <p>Nog geen account? <router-link to="/registreer">Maak er een!</router-link></p>
  </b-container>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
        this.$router.replace('home')
      }).catch((err)=> {
        alert(`Oops. ${err.message}`)
      })
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
    width: 50%;
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
<template>
  <b-container id="firebaseui-auth-container"></b-container>
  <!-- <b-container class="login">
    <h3> Inloggen</h3>
    <b-input type="text" v-model="email" placeholder="Email"></b-input><br>
    <b-input type="password" v-model="password" placeholder="Wachtwoord"></b-input><br>
    <b-button @click="login">Inloggen</b-button>
    <p>Of login met Google <br>
      <b-button @click="socialLogin" class="social-button">
        <img src="../assets/google-logo.png" alt="Google Logo">
      </b-button>
    </p>
    <p>Nog geen account? <router-link to="/registreer">Maak er een!</router-link></p>
  </b-container> -->
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import {ui, uiConfig } from '../firebase/firebaseui';
import { EventBus } from '../EventBus.js';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  mounted() {
    ui.start('#firebaseui-auth-container', uiConfig);
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(()=> {
        EventBus.reloadLoggedinUser();
        this.$router.replace('home')
      }).catch((err)=> {
        alert(`Oops. ${err.message}`)
      })
    },
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider).then(() => {
        EventBus.reloadLoggedinUser();
        this.$router.replace('home');
      }).catch((err) => {
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
  .social-button {
    width: 75px;
    background: white;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
    outline: 0;
    border: 0;
  }
  .social-button:active {
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1); 
  }
  .social-button img {
    width: 100%
  }
</style>
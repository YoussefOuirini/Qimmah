<template>
  <b-container class="sign-up">
    <p>Maak een account aan</p>
    <b-input type="email" v-model="email" placeholder="Email"></b-input><br>
    <b-input type="password" v-model="password" placeholder="Wachtwoord"></b-input><br>
    <b-input type="password" v-model="repeatPassword" placeholder="Herhaal wachtwoord"></b-input><br>
    <p v-if="incorrectPassword && this.repeatPassword" style="font-style:italic; color:red">Wachtwoorden niet hetzelfde.</p>
    <b-button :disabled="!completedRegistration" @click="signUp">Registreer</b-button>
    <span>Of ga terug naar <router-link to="/login">login</router-link>.</span>
  </b-container>
</template>

<script>
  import firebase from 'firebase';

  export default {
    name: "SignUp",
    data() {
      return {
        email: '',
        password: '',
        repeatPassword: ''
      }
    },
    computed: {
      completedRegistration() {
        return !this.incorrectPassword && this.email.length && this.password.length && this.repeatPassword.length;
      },
      incorrectPassword() {
        return this.password !== this.repeatPassword;
      }
    },
    methods: {
      signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(()=> {
          this.$router.replace('home')
        }).catch((err)=> {
          alert(`Oops. ${err.message}`)
        })
      }
    }
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 50%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 50%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px
  }
</style>
import Vue from "vue";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      adress: '',
      zipCode: '',
      city: '',
      email: '',
      phoneNumber: '',
      arabic: ''
    }
  },
  methods: {
    submit() {
      alert(`U bent ingeschreven met de volgende informatie: ${this.firstName} ${this.lastName}.`);
    }
  }
})

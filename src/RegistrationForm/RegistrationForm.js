import Vue from "vue";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: ''
    }
  },
  methods: {
    submit() {
      alert(`U bent ingeschreven met de volgende informatie: ${this.firstName} ${this.lastName} ${this.gender}`);
      this.firstName = '';
      this.lastName = '';
      this.gender = '';
    }
  }
})

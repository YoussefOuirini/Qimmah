import Vue from "vue";
import { config } from "../config";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      underage: false,
      adress: '',
      zipCode: '',
      city: '',
      email: '',
      phoneNumber: '',
      arabic: '',
      parent: {}
    }
  },
  methods: {
    checkAge() {
      const birthDateTimeStamp = new Date(this.birthDate).getTime();
      const ageLimitTimeStamp = this.getAgeLimitTimeStamp()
      if (birthDateTimeStamp > ageLimitTimeStamp) {
        this.underage = true;
      } else {
        this.underage = false;
        this.parent = {};
      }
    },
    getAgeLimitTimeStamp() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - config.ageOfConsent)
      const ageLimitTimeStamp = date.getTime();
      return ageLimitTimeStamp
    },
    submit() {
      alert(`U bent ingeschreven met de volgende informatie: ${this.firstName} ${this.lastName}.`);
    }
  }
})

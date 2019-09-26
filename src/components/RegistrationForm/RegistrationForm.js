import Vue from "vue";
import { config } from "../../config";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      firstName: '',
      lastName: '',
      gender: '',
      birthDate: '',
      underage: false,
      address: {
        streetname: '',
        houseNumber: '',
        zipCode: '',
        city: '',
      },
      email: '',
      phoneNumber: '',
      arabic: '',
      parent: {},
      education: null
    }
  },
  computed: {
    completedForm() {
      if (this.underage) {
        return this.completedParentForm && this.completedBasicForm;
      } else {
        return this.completedBasicForm;
      }
    },
    filledInAdress() {
      const {streetname, houseNumber, zipCode, city} = this.address
      return streetname && houseNumber && zipCode &&city
    },
    completedBasicForm() {
      return this.firstName && this.lastName && this.gender && this.birthDate && this.filledInAdress() && this.email && this.phoneNumber && this.arabic
    },
    completedParentForm() {
      return this.parent.firstName && this.parent.lastName && this.parent.email
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

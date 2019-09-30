import Vue from "vue";
import { config } from "../../config";
import { writeRegistration } from "../../firebase";

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
    filledInAddress() {
      const {streetname, houseNumber, zipCode, city} = this.address
      return streetname && houseNumber && zipCode &&city
    },
    completedBasicForm() {
      return this.firstName && this.lastName && this.gender && this.birthDate && this.filledInAddress && this.email && this.phoneNumber && this.arabic
    },
    completedParentForm() {
      return this.parent.firstName && this.parent.lastName
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
      writeRegistration(this.$data);
    }
  }
})

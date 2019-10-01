import Vue from "vue";
import { config } from "../../config";
import { writeRegistration } from "../../firebase";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      form: {
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
      },
      loading: null
    }
  },
  computed: {
    completedForm() {
      if (this.form.underage) {
        return this.completedParentForm && this.completedBasicForm;
      } else {
        return this.completedBasicForm;
      }
    },
    filledInAddress() {
      const {streetname, houseNumber, zipCode, city} = this.form.address
      return streetname && houseNumber && zipCode && city
    },
    completedBasicForm() {
      const {firstName, lastName, gender, birthDate, filledInAddress, email, phoneNumber, arabic} = this.form
      return firstName && lastName && gender && birthDate && filledInAddress && email && phoneNumber && arabic
    },
    completedParentForm() {
      return this.form.parent.firstName && this.form.parent.lastName
    }
  },
  methods: {
    checkAge() {
      const birthDateTimeStamp = new Date(this.birthDate).getTime();
      const ageLimitTimeStamp = this.getAgeLimitTimeStamp()
      if (birthDateTimeStamp > ageLimitTimeStamp) {
        this.form.underage = true;
      } else {
        this.form.underage = false;
        this.form.parent = {};
      }
    },
    getAgeLimitTimeStamp() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - config.ageOfConsent)
      const ageLimitTimeStamp = date.getTime();
      return ageLimitTimeStamp
    },
    submit() {
      writeRegistration(this.form);
    }
  }
})

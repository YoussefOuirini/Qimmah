import Vue from "vue";
import { config } from "../../config";
import { writeRegistration } from "../../firebase";
import firebase from "firebase";

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
        phoneNumber: '',
        arabic: false,
        parent: {},
        education: null
      },
      loading: false,
      registrationResponseText: ""
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
    completedBasicForm() {
      const {firstName, lastName, gender, birthDate, phoneNumber, education} = this.form
      let completedBasicForm = firstName && lastName && gender && birthDate && phoneNumber && education && this.filledInAddress;
      if (education === "qoraan") {
        return completedBasicForm && (this.form.arabic === true)
      }
      return completedBasicForm
    },
    completedParentForm() {
      return this.form.parent.firstName && this.form.parent.lastName
    },
    filledInAddress() {
      const {streetname, houseNumber, zipCode, city} = this.form.address
      return streetname && houseNumber && zipCode && city
    }
  },
  methods: {
    checkAge() {
      const birthDateTimeStamp = new Date(this.form.birthDate).getTime();
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
      this.loading = true

      const user = firebase.auth().currentUser;
      const registration = this.form;
      registration.email = user.email;
      writeRegistration(registration).then((res)=> {
        this.loading = false
        if (res.id) {
          this.registrationResponseText = "Inschrijving is successvol!"
        } else {
          this.registrationResponseText = "Inschrijving is mislukt :( Sorry baas! Probeer het later opnieuw!"
        }
      });
    }
  }
})

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
    filledInAddress() {
      const {streetname, houseNumber, zipCode, city} = this.form.address
      return streetname && houseNumber && zipCode && city
    },
    completedBasicForm() {
      const {firstName, lastName, gender, birthDate, email, phoneNumber, arabic} = this.form
      return firstName && lastName && gender && birthDate && email && phoneNumber && arabic && this.filledInAddress
    },
    completedParentForm() {
      return this.form.parent.firstName && this.form.parent.lastName
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
      writeRegistration(this.form).then((res)=> {
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

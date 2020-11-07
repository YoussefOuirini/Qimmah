import Vue from "vue";
import { config } from "../../config";
import { writeRegistration } from "@/firebase/firebase";
import { EventBus } from "../../EventBus.js";
import { getCurrentUser } from "@/firebase/auth";

export default Vue.extend({
  name: "RegistrationForm",
  props: ['admin'],
  data() {
    return {
      form: {
        name: {
          first: '',
          last: ''
        },
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
        parent: {
          name: {
            first: '',
            last: '',
            email: ''
          }
        },
        education: null
      },
      loading: false,
      registrationResponseText: ""
    };
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
      const {name, gender, birthDate, phoneNumber, education} = this.form;
      let completedBasicForm = name.first && name.last && gender && birthDate && phoneNumber && education && this.filledInAddress;
      if (education === "Qoraan") {
        return completedBasicForm && this.form.arabic;
      }
      return completedBasicForm;
    },
    completedParentForm() {
      return this.form.parent.name.first && this.form.parent.name.last && this.form.parent.email;
    },
    filledInAddress() {
      const {streetname, houseNumber, zipCode, city} = this.form.address;
      return streetname && houseNumber && zipCode && city;
    }
  },
  methods: {
    checkAge() {
      const birthDateTimeStamp = new Date(this.form.birthDate).getTime();
      const ageLimitTimeStamp = this.getAgeLimitTimeStamp();
      if (birthDateTimeStamp > ageLimitTimeStamp) {
        this.form.underage = true;
      } else {
        this.form.underage = false;
        this.form.parent = {
          name: {
            first: '',
            last: '',
            email: ''
          }
        };
      }
    },
    getAgeLimitTimeStamp() {
      const date = new Date();
      date.setFullYear(date.getFullYear() - config.ageOfConsent);
      const ageLimitTimeStamp = date.getTime();
      return ageLimitTimeStamp;
    },
    submit() {
      this.loading = true;

      const user = getCurrentUser();
      const registration = this.form;

      if (!this.form.parent.email && !this.admin) {
        registration.email = user.email;
      }
      writeRegistration(registration).then((res)=> {
        this.loading = false;
        EventBus.reloadRegistration();
        if (res.success) {
          this.registrationResponseText = "Inschrijving is successvol!";
          this.reloadRegistrations();
        } else {
          this.registrationResponseText = "Inschrijving is mislukt :( Sorry baas! Probeer het later opnieuw!";
        }
      });
    },
    reloadRegistrations() {
      this.$emit('reloadRegistrations', true);
    }
  }
});

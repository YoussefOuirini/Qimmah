import Vue from "vue";

export default Vue.extend({
  name: "RegistrationForm",
  data() {
    return {
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    submit() {
      console.log(this.firstName, this.lastName);
      this.firstName = '';
      this.lastName = '';
    }
  }
})

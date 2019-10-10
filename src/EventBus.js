import Vue from "vue";

export const EventBus = new Vue({
  methods: {
    reloadRegistration() {
      this.$emit('registration')
    },
    reloadUsers() {
      this.$emit('moderatorUpdated')
    },
    reloadLoggedinUser() {
      this.$emit('userLoginChange')
    }
  }
});
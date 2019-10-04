import Vue from "vue";

export const EventBus = new Vue({
  methods: {
    reloadRegistration() {
      this.$emit('registration')
    }
  }
});
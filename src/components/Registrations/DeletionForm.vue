<template>
  <b-form>
    <b-button @click="deleteRegistration" variant="danger">
      Verwijder de registratie van {{registration.name.first}} {{registration.name.last}}
    </b-button>
  </b-form>
</template>

<script>
  import Vue from "vue";
  import { deleteStudent } from "@/firebase/firebase.js";
  import { EventBus } from "../../EventBus";

  export default Vue.extend({
    name: "DeletionForm",
    props: ["registration"],
    methods: {
      async deleteRegistration() {
        await deleteStudent(this.registration);
        this.hideModal();
        EventBus.reloadRegistration()
      },
      hideModal() {
        this.$emit('hide', true);
      }
    }
  })
</script>
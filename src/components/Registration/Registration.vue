<template>
  <b-tr>
    <b-td>{{registration.name.first}} {{registration.name.last}}</b-td>
    <b-td>{{registration.education}}</b-td>
    <b-td>{{registration.group}}</b-td>
    <b-td><Absence v-bind:registration="registration"/></b-td>
    <b-td>
      <b-button @click="deleteRegistration" variant="danger">Verwijder registratie</b-button>
    </b-td>
  </b-tr>
</template>

<script>
  import Vue from "vue";
  import Absence from "../Absence/Absence.vue";
  import { EventBus } from "../../EventBus";
  import { deleteStudent} from "../../firebase.js";

  export default Vue.extend({
    name: "Registration",
    components: {
      Absence
    },
    props: ["registration"],
    methods: {
      async deleteRegistration() {
        await deleteStudent(this.registration);
        EventBus.reloadRegistration()
      },
    }
  })
</script>
<template>
  <b-tr>
    <b-td>{{registration.name.first}} {{registration.name.last}}</b-td>
    <b-td>{{registration.education}}</b-td>
    <b-td>{{registration.group}}</b-td>
    <b-td>
      <b-button v-b-modal="unattend">Afmelden van de les</b-button>
      <b-button @click="deleteRegistration" variant="danger">Verwijder registratie</b-button>
      <b-modal size="lg" :id="unattend" title="Afmelden van de les">
        <Absence v-bind:registration="registration"/>
      </b-modal>
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
    computed: {
      unattend() {
        const {name, education, group} = this.registration;
        return `${name.first}${name.last}${education}${group}`;
      }
    },
    methods: {
      async deleteRegistration() {
        await deleteStudent(this.registration);
        EventBus.reloadRegistration()
      },
    }
  })
</script>
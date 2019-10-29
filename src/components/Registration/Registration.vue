<template>
  <b-tr>
    <b-td>{{registration.name.first}} {{registration.name.last}}</b-td>
    <b-td>{{registration.education}}</b-td>
    <b-td>{{registration.group}}</b-td>
    <b-td>
      <b-button v-b-modal="modalName">Afmelden van de les</b-button>
      <b-button @click="deleteRegistration" variant="danger">Verwijder registratie</b-button>
      <b-modal
        size="lg"
        :id="modalName"
        :ref="modalName"
        title="Afmelden van de les"
        ok-only ok-title="Niet afmelden"
      >
        <Absence v-bind:registration="registration" @hide="closeModal"/>
      </b-modal>
    </b-td>
  </b-tr>
</template>

<script>
  import Vue from "vue";
  import Absence from "../Absence/Absence.vue";
  import { EventBus } from "../../EventBus";
  import { deleteStudent} from "@/firebase/firebase";

  export default Vue.extend({
    name: "Registration",
    components: {
      Absence
    },
    props: ["registration"],
    computed: {
      modalName() {
        const {name, education, group} = this.registration;
        return `${name.first}${name.last}${education}${group}`;
      }
    },
    methods: {
      async deleteRegistration() {
        await deleteStudent(this.registration);
        EventBus.reloadRegistration()
      },
      closeModal() {
        this.$refs[this.modalName].hide()
      }
    }
  })
</script>
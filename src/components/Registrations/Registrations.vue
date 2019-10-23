<template>
  <b-container v-if="registrations.length">
    <b-table 
      striped hover selectable
      select-mode="single"
      :items="registrations"
      :fields="fields"
      @row-selected="onRowSelectedRegistration"
    ></b-table>
    <Absence v-bind:selectedRegistration="selectedRegistration"/>
    <br><b-button v-if="selectedRegistration" @click="deleteRegistration" variant="danger">Verwijder registratie</b-button>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import Absence from "../Absence/Absence.vue";
  import EventBus from "../../EventBus";
  import { deleteStudent} from "../../firebase.js";

  export default Vue.extend ({
    name: "Registrations",
    components: {
      Absence
    },
    props: ["registrations"],
    data() {
      return {
        fields: [{
          key: 'name',
          label: 'Naam',
          formatter: (value) => {
            return `${value.first} ${value.last}`
          }
        },{
          key: 'education',
          label: 'Ingeschreven voor studie'
        }, {
          key: 'phoneNumber',
          label: 'Telefoonnummer'
        }, {
          key: 'group',
          label: 'Klas'
        }
        ],
        selectedRegistration: ''
      }
    },
    methods: {
      onRowSelectedRegistration(registration) {
        this.selectedRegistration = registration[0]
      },
      async deleteRegistration() {
        await deleteStudent(this.selectedRegistration);
        EventBus.reloadRegistration()
      },
    }
  })
</script>
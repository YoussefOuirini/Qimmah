<template>
  <b-container v-if="isLoaded === true && registrations.length > 0">
    <b-table 
      striped hover selectable
      select-mode="single"
      :items="registrations"
      :fields="fields"
      @row-selected="onRowSelectedRegistration"
    ></b-table>
    <b-button v-if="selectedRegistration" @click="deleteRegistration" variant="danger">Verwijder registratie</b-button>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import { getUsersRegistrations } from "@/firebase";
  import { EventBus } from "../../EventBus";
  import { deleteStudent} from "../../firebase.js";

  export default Vue.extend ({
    name: "Registrations",
    mounted() {
      this.loadRegistrations(),
      EventBus.$on('registration', () => {
        this.loadRegistrations();
      })
    },
    data() {
      return {
        isLoaded: false,
        fields: [{
          key: 'firstName',
          label: 'Voornaam'
        },{
          key: 'lastName',
          label: 'Achternaam'
        }, {
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
        registrations: [],
        selectedRegistration: ''
      }
    },
    methods: {
      async loadRegistrations() {
        this.registrations = await getUsersRegistrations()
        this.isLoaded = true;
      },
      onRowSelectedRegistration(registration) {
        this.selectedRegistration = registration[0]
      },
      async deleteRegistration() {
        await deleteStudent(this.selectedRegistration);
        this.loadRegistrations();
      }
    }
  })
</script>
<template>
  <b-container v-if="isLoaded === true && registrations.length > 0">
    <b-table striped hover :items="registrations" :fields="fields"></b-table>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import { getRegistrations } from "@/firebase";
  import { EventBus } from "../../EventBus"

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
        }
        ],
        registrations: []
      }
    },
    methods: {
      async loadRegistrations() {
        this.registrations = await getRegistrations()
        this.isLoaded = true;
      }
    }
  })
</script>
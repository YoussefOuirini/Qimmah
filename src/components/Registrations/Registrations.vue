<template>
  <b-container v-if="registrations.length">
    <b-table
      :items="registrations"
      :fields="registrationFields"
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
    </b-table>
    <b-table-simple striped>
      <b-thead>
        <b-tr>
          <b-th>Naam</b-th>
          <b-th>Studie</b-th>
          <b-th>Klas</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <Registration ref="registration" v-for="registration in registrations" v-bind:key="registration.id" v-bind:registration="registration"/>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import Registration from "../Registration/Registration.vue";

  export default Vue.extend ({
    name: "Registrations",
    components: {
      Registration
    },
    props: ["registrations"],
    data() {
      return {
        registrationFields: [{
          key: 'name',
          label: 'Naam',
          formatter: (name) => {
            return `${name.first} ${name.last}`;
          }
        }, {
          key: 'group',
          label: 'Klas'
        }, {
          key: 'actions',
          label: 'Acties'
        }]
      }
    },
  })
</script>
<template>
  <b-container v-if="registrations.length">
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
    props: ["registrations"]
  })
</script>
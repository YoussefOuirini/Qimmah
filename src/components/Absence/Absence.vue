<template>
  <b-form inline v-if="registrations.length">
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Meld uw kind af voor de les.</label>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="selectedRegistration"
      :options="absenceRegistrations"
      text-field="absenceInfo"
    ></b-form-select>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="reasonOfAbsence"
    >
      <option value="ziek">Ziek</option>
      <option value="overig">Overig</option>
    </b-form-select>
    <b-button variant="primary">Afmelden</b-button>
  </b-form>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: "Absence",
    props: ["registrations"],
    data() {
      return {
        selectedRegistration: "",
        reasonOfAbsence: ""
      }
    },
    computed: {
      absenceRegistrations() {
        return this.registrations.map((registration) => {
          const absenceRegistration = registration;
          absenceRegistration.absenceInfo = `${registration.name.first} ${registration.name.last} ${registration.education} ${registration.group}`
          return absenceRegistration;
        })
      }
    }
  })
</script>
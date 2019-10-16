<template>
  <b-form inline v-if="selectedRegistration">
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Meld uw kind af voor de les.</label>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="reasonOfAbsence"
    >
      <option value="ziek">Ziek</option>
      <option value="overig">Overig</option>
    </b-form-select>
    <b-form-textarea v-model="reasonOfAbsenceRemarks" v-if="reasonOfAbsence ==='overig'" placeholder="Vul de reden van afwezigheid in."></b-form-textarea>
    <b-button @click="store" :disabled="!filledInReason" variant="primary">Afmelden</b-button>
    {{absenceRes}}
  </b-form>
</template>

<script>
  import Vue from "vue";
  import { storeAbsence } from "../../firebase"

  export default Vue.extend({
    name: "Absence",
    props: ["selectedRegistration"],
    data() {
      return {
        reasonOfAbsence: "",
        reasonOfAbsenceRemarks: "",
        absenceRes: ""
      }
    },
    computed: {
      filledInReason() {
        if (this.reasonOfAbsence==="overig") {
          return this.reasonOfAbsenceRemarks;
        } else {
          return this.reasonOfAbsence;
        }
      }
    },
    methods: {
      async store() {
        const absence = this.addRemarks({reasonOfAbsence: this.reasonOfAbsence,});
        const absenceRes = await storeAbsence(absence, this.selectedRegistration);
        this.absenceRes = absenceRes;
      },
      addRemarks(absence) {
        if (this.reasonOfAbsenceRemarks) {
          const remarks = {
            reasonOfAbsenceRemarks: this.reasonOfAbsenceRemarks
          }
          return Object.assign(absence, remarks);
        }
        return absence;
      }
    }
  })
</script>
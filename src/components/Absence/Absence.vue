<template>
  <b-form v-if="registration">
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Meld {{registration.name.first}} af voor de les.</label>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="reasonOfAbsence"
    ><option :value="null">Selecteer de reden van absentie</option>
      <option value="ziekte">Ziek</option>
      <option value="overige">Overig</option>
    </b-form-select>
    <b-form-textarea v-model="reasonOfAbsenceRemarks" placeholder="Vul de reden van afwezigheid in."></b-form-textarea>
    <b-button @click="store" :disabled="!filledInReason" variant="primary">Afmelden</b-button>
  </b-form>
</template>

<script>
  import Vue from "vue";
  import { storeAbsence } from "../../firebase"

  export default Vue.extend({
    name: "Absence",
    props: ["registration"],
    data() {
      return {
        reasonOfAbsence: null,
        reasonOfAbsenceRemarks: ""
      }
    },
    computed: {
      filledInReason() {
        if (this.reasonOfAbsence==="overige") {
          return this.reasonOfAbsenceRemarks;
        } else {
          return this.reasonOfAbsence;
        }
      }
    },
    methods: {
      async store() {
        const absence = {
          timestamp: Date.now(),
          reasonOfAbsence: this.reasonOfAbsence,
          reasonOfAbsenceRemarks: this.reasonOfAbsenceRemarks
        };
        await storeAbsence(absence, this.registration);
        this.hideModal();
      },
      hideModal() {
        this.$emit('hide', true);
      }
    }
  })
</script>
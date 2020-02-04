<template>
  <b-form v-if="registration">
    <label class="mr-sm-2" for="inline-form-custom-select-pref">Meld {{registration.name.first}} af voor de les.</label>
    <b-form-select
      class="mb-2 mr-sm-2 mb-sm-0"
      v-model="reason"
    ><option :value="null">Selecteer de reden van absentie</option>
      <option value="ziekte">Ziek</option>
      <option value="overige">Overig</option>
    </b-form-select>
    <b-form-textarea v-model="remarks" placeholder="Vul de reden van afwezigheid in."></b-form-textarea>
    <b-button @click="store" :disabled="!filledInReason" variant="primary">Afmelden</b-button>
  </b-form>
</template>

<script>
  import Vue from "vue";
  import { storeAbsence } from "@/firebase/firebase";
import { getLessonDate } from "../../common/date";

  export default Vue.extend({
    name: "Absence",
    props: ["registration"],
    data() {
      return {
        reason: null,
        remarks: ""
      }
    },
    computed: {
      filledInReason() {
        if (this.reason==="overige") {
          return this.remarks;
        } else {
          return this.reason;
        }
      }
    },
    methods: {
      async store() {
        const absence = {
          reason: this.reason,
          remarks: this.remarks
        }
        const timestamp = Date.now();
        const absenceCall = {
          date: getLessonDate(timestamp),
          timestamp,
          absence
        };
        await storeAbsence(absenceCall, this.registration);
        this.hideModal();
      },
      hideModal() {
        this.$emit('hide', true);
      }
    }
  })
</script>
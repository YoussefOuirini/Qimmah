<template>
  <b-tr :variant="variant">
    <b-td>{{lesson.student.name.first}} {{lesson.student.name.last}}</b-td>
    <b-td colspan="3" v-if="absence && absence.reasonOfAbsence">
      <p style="font-style:italic">Afgemeld met als reden {{absence.reasonOfAbsence}}</p>
      <p v-if="absence.reasonOfAbsenceRemarks" style="font-style:italic">en opmerking: {{absence.reasonOfAbsenceRemarks}}</p>
    </b-td>
    <b-td v-if="!absence || !absence.reasonOfAbsence">
      <b-form-select v-model="behaviour">
        <option value="goed">Goed</option>
        <option value="matig">Matig</option>
        <option value="onvoldoende">Onvoldoende</option>
      </b-form-select>
    </b-td>
    <b-td v-if="!absence || !absence.reasonOfAbsence">
      <b-form-select v-model="presence">
        <option value="aanwezig">Aanwezig</option>
        <option value="laat">Laat</option>
        <option value="afwezig">Afwezig</option>
      </b-form-select>
    </b-td>
    <b-td v-if="!absence || !absence.reasonOfAbsence">
      <b-form-radio v-model="madeHomework" value="ja">Ja</b-form-radio>
      <b-form-radio v-model="madeHomework" value="nee">Nee</b-form-radio>
    </b-td>
    <b-td>
      <b-form-textarea v-model='studentHomework' placeholder="Schrijf het huiswerk van de student op."></b-form-textarea>
    </b-td>
    <b-td>
      <b-form-textarea v-model='remarks' placeholder="Schrijf een opmerking."></b-form-textarea>
    </b-td>
  </b-tr>
</template>

<script>
import Vue from "vue";
import { getAbsence } from "@/firebase/firebase"

export default Vue.extend({
  name: "Lesson",
  props: ["lesson"],
  // watch: {
  //   student: async function () {
  //     await this.loadAbsence();
  //   }
  // },
  // mounted() {
  //   this.loadAbsence();
  // },
  data() {
    return {
      behaviour: 'goed',
      presence: 'aanwezig',
      madeHomework: "ja",
      studentHomework: '',
      remarks: ""
    }
  },
  computed: {
    variant() {
      if (this.absence && this.absence.reasonOfAbsence) {
        return "warning";
      }
      return "default";
    },
    student() {
      return this.lesson.student;
    },
    absence() {
      return this.student.absence;
    },
  },
  methods: {
    // async loadAbsence() {
    //   this.absence = await getAbsence(this.student);
    //   if (this.absence && this.absence.reasonOfAbsence) {
    //     this.behaviour = "Afgemeld";
    //     this.presence = "Afgemeld";
    //     this.madeHomework = "Afgemeld";
    //   }
    // }
  }
})
</script>
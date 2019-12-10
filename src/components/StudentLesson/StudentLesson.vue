<template>
  <b-tr :variant="variant">
    <b-td>{{lesson.student.name.first}} {{lesson.student.name.last}}</b-td>
    <b-td colspan="3" v-if="absence">
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
  watch: {
    lesson: function () {
      this.loadLesson();
    }
  },
  mounted() {
    // this.loadAbsence();
    // console.log(this.lesson);
    this.loadLesson();
  },
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
      if (this.presence === 'afwezig') {
        return "danger";
      }
      return "default";
    },
    student() {
      return this.lesson.student;
    },
    absence() {
      return this.student.absence;
    },
    dateLesson() {
      return this.lesson.lesson[0];
    }
  },
  methods: {
    loadAbsence() {
      // this.absence = await getAbsence(this.student);
      if (this.absence && this.absence.reasonOfAbsence) {
        this.behaviour = "afgemeld";
        this.presence = "afgemeld";
        this.madeHomework = "afgemeld";
      }
    },
    loadLesson() {
      console.log(this.dateLesson);
      // this.loadAbsence();
      if (!this.dateLesson) {return};
      if (this.dateLesson.behaviour) {
        this.behaviour = this.dateLesson.behaviour;
      }
      if (this.dateLesson.presence) {
        this.presence = this.dateLesson.presence;
      }
      if (this.dateLesson.madeHomework) {
        this.madeHomework = this.dateLesson.madeHomework;
      }
      if (this.dateLesson.studentHomework) {
        this.studentHomework = this.dateLesson.studentHomework;
      }
    }
  }
})
</script>
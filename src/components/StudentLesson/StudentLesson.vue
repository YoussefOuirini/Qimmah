<template>
  <b-tr :variant="variant">
    <b-td>{{lesson.student.name.first}} {{lesson.student.name.last}}</b-td>
    <b-td colspan="3" v-if="absence">
      <p style="font-style:italic">Afgemeld met als reden {{absence.reason}}</p>
      <p v-if="absence.remarks" style="font-style:italic">en opmerking: {{absence.remarks}}</p>
    </b-td>
    <b-td v-if="!absence || !absence.reason">
      <b-form-select v-model="behaviour">
        <option value="goed">Goed</option>
        <option value="matig">Matig</option>
        <option value="onvoldoende">Onvoldoende</option>
      </b-form-select>
    </b-td>
    <b-td v-if="!absence || !absence.reason">
      <b-form-select v-model="presence">
        <option value="aanwezig">Aanwezig</option>
        <option value="laat">Laat</option>
        <option value="afwezig">Afwezig</option>
      </b-form-select>
    </b-td>
    <b-td v-if="!absence || !absence.reason">
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

export default Vue.extend({
  name: "Lesson",
  props: ["lesson"],
  watch: {
    lesson: function () {
      this.loadLesson();
    }
  },
  mounted() {
    this.loadLesson();
  },
  data() {
    return {
      behaviour: 'goed',
      presence: 'aanwezig',
      madeHomework: "ja",
      studentHomework: '',
      remarks: ''
    }
  },
  computed: {
    variant() {
      if (this.absence && this.absence.reason) {
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
      if (this.dateLesson) {
        return this.dateLesson.absence;
      }
    },
    dateLesson() {
      return this.lesson.lesson;
    }
  },
  methods: {
    loadLesson() {
      if (this.dateLesson) {
        this.behaviour = this.dateLesson.behaviour;
        this.presence = this.dateLesson.presence;
        this.madeHomework = this.dateLesson.madeHomework;
        this.studentHomework = this.dateLesson.studentHomework;
      } else {
        this.behaviour = 'goed';
        this.presence = 'aanwezig';
        this.madeHomework = 'ja';
        this.studentHomework = '';
        this.remarks = '';
      }
    }
  }
})
</script>
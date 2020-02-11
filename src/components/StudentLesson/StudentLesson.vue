<template>
  <b-tr :variant="variant">
    <b-td>{{lesson.student.name.first}} {{lesson.student.name.last}}</b-td>
    <b-td colspan="3" v-if="absence">
      <p style="font-style:italic">Afgemeld met als reden {{absence.reason}}</p>
      <p v-if="absence.remarks" style="font-style:italic">en opmerking: {{absence.remarks}}</p>
    </b-td>
    <b-td v-if="!absence || !absence.reason">
      <b-form-select @input="resetPresence" v-model="presence">
        <option value="aanwezig">Aanwezig</option>
        <option value="laat">Laat</option>
        <option value="afwezig">Afwezig</option>
      </b-form-select>
    </b-td>
    <b-td colspan="2" v-if="!present && !absence">
        <p>{{lesson.student.name.first}} is afwezig</p>
    </b-td>
    <b-td v-if="present">
      <b-form-select v-model="behaviour">
        <option value="goed">Goed</option>
        <option value="matig">Matig</option>
        <option value="onvoldoende">Onvoldoende</option>
      </b-form-select>
    </b-td>
    <b-td v-if="present">
      <b-form-radio v-model="madeHomework" value="ja">Ja</b-form-radio>
      <b-form-radio v-model="madeHomework" value="nee">Nee</b-form-radio>
    </b-td>
    <b-td colspan="3">
      <b-form-textarea
        v-model='studentHomework'
        max-rows="4"
        placeholder="Schrijf het huiswerk van de student op."
      ></b-form-textarea>
    </b-td>
    <b-td colspan="3">
      <b-form-textarea 
        v-model='remarks'
        max-rows="4"
        placeholder="Schrijf een opmerking."
      ></b-form-textarea>
    </b-td>
    <b-td>
      <p v-if="dateLesson.signedOff" class="h1"><b-icon-check-box></b-icon-check-box></p>
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
    present() {
      if (this.absence && this.absence.reason) {
        return false;
      }
      if (this.presence === 'afwezig') {
        return false;
      }
      return true;
    },
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
      return null;
    },
    dateLesson() {
      return this.lesson.lesson;
    }
  },
  methods: {
    loadLesson() {
      if (this.dateLesson.presence) {
        this.behaviour = this.dateLesson.behaviour;
        this.presence = this.dateLesson.presence;
        this.madeHomework = this.dateLesson.madeHomework;
        this.studentHomework = this.dateLesson.studentHomework;
        this.remarks = this.dateLesson.remarks;
      } else {
        this.behaviour = 'goed';
        this.presence = 'aanwezig';
        this.madeHomework = 'ja';
        this.studentHomework = '';
        this.remarks = '';
      }
      if (!this.present) {
        this.setAbsence();
      }
      if (this.absence && this.absence.reason) {
        this.behaviour = this.absence.reason;
        this.presence = `afgemeld vanwege ${this.absence.reason}`;
        this.madeHomework = this.absence.reason;
      }
    },
    resetPresence() {
      if (this.presence !== 'afwezig') {
        this.behaviour = 'goed';
        this.madeHomework = 'ja';
      } else {
        this.setAbsence()
      }
    },
    setAbsence() {
      this.madeHomework = 'afwezig';
      this.behaviour = 'afwezig';
    }
  }
})
</script>
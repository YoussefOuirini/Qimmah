<template>
  <b-tr>
    <b-td>{{student.name.first}} {{student.name.last}} {{absence}}</b-td>
    <b-td>
      <b-form-select v-model="behaviour">
        <option value="Goed">Goed</option>
        <option value="Slecht">Slecht</option>
      </b-form-select>
    </b-td>
    <b-td>
      <b-form-select v-model="presence">
        <option value="Aanwezig">Aanwezig</option>
        <option value="Laat">Laat</option>
        <option value="Afwezig">Afwezig</option>
      </b-form-select>
    </b-td>
    <b-td>
      <b-form-radio v-model="madeHomework" value="Ja">Ja</b-form-radio>
      <b-form-radio v-model="madeHomework" value="Nee">Nee</b-form-radio>
    </b-td>
    <b-td>
      <b-form-textarea v-model='studentHomework' placeholder="Schrijf het huiswerk van deze student op"></b-form-textarea>
    </b-td>
    <b-td>
      <b-form-textarea v-model='remarks' placeholder="Opmerkingen"></b-form-textarea>
    </b-td>
  </b-tr>
</template>

<script>
import Vue from "vue";
import { getAbsence } from "../../firebase"

export default Vue.extend({
  name: "Lesson",
  props: ["student"],
  mounted() {
    this.loadAbsence();
  },
  data() {
    return {
      behaviour: 'Goed',
      presence: 'Aanwezig',
      madeHomework: "Ja",
      studentHomework: '',
      remarks: "Geen opmerkingen.",
      absence: "Pizza"
    }
  },
  methods: {
    async loadAbsence() {
      this.absence = await getAbsence(this.student);
      console.log(this.absence);
    }
  }
})
</script>
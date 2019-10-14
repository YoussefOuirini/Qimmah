<template>
  <b-tr>
    <b-td>{{student.name.first}} {{student.name.last}}</b-td>
    <b-td>
      <b-form-select v-model="behaviour">
        <option value="good">Goed</option>
        <option value="bad">Slecht</option>
      </b-form-select>
    </b-td>
    <b-td>
      <b-form-select v-model="presence">
        <option value="present">Aanwezig</option>
        <option value="late">Laat</option>
        <option value="absent">Afwezig</option>
      </b-form-select>
    </b-td>
    <b-td>
      <b-form-radio v-model="madeHomework" value=true>Ja</b-form-radio>
      <b-form-radio v-model="madeHomework" value=false>Nee</b-form-radio>
    </b-td>
    <b-td>
      <b-form-textarea v-model='studentHomework' placeholder="Schrijf het huiswerk van deze student op"></b-form-textarea>
    </b-td>
  </b-tr>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Lesson",
  props: ["student"],
  data() {
    return {
      behaviour: 'good',
      presence: 'present',
      madeHomework: true,
      studentHomework: ''
    }
  }
})
</script>
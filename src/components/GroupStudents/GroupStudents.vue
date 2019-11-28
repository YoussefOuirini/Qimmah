<template>
  <b-table
    bordered
    :items="students"
    :fields="studentFields"
  >
  </b-table>
</template>

<script>
import Vue from 'vue';
import { getAge } from "@/common/getAge";

export default Vue.extend({
  name: 'GroupStudents',
  props: ['students'],
  data() {
    return {
      studentFields: [{
        key: 'name',
        label: 'Naam',
        formatter: (value) => {
          return `${value.first} ${value.last}`
        }
      },{
        key: 'address',
        label: 'Adres',
        formatter: (value) => {
          if (value) {
            return `${value.streetname} ${value.houseNumber}, ${value.zipCode}, ${value.city}`;
          } else {
            return '';
          }
        }
      }, {
        key: 'birthDate',
        label: 'Leeftijd',
        formatter: (value) => {
          if (value) {
            return getAge(value)
          }
        }
      },{
        key: 'gender',
        label: "Geslacht",
        formatter: (value) => {
          if (value === 'male') {
            return 'Man';
          } else if (value === 'female') {
            return 'Vrouw';
          } else {
            return '';
          }
        }
      }, {
        key: 'phoneNumber',
        label: 'Telefoonnummer'
      },
      'email']
    }
  }
})
</script>
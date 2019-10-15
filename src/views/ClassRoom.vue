<template>
  <b-container v-if="teachersGroups.length">
    <b-form-select
      v-model="selectedGroupName"
      :options="teachersGroups"
      text-field="groupName"
      value-field="groupName"
    >
      <template v-slot:first>
        <option :value="null" disabled>-- Selecteer een klas --</option>
      </template>
    </b-form-select>
    <b-table
      bordered
      v-if="selectedGroupName && students.length"
      :items="students"
      :fields="studentFields"
    >
    </b-table>
    <Lesson v-if="teachersGroups.length && selectedGroupName && students.length" v-bind:students="students" v-bind:selectedGroupName="selectedGroupName"/>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import firebase from "firebase";
  import Lesson from "../components/Lesson/Lesson"
  import { getGroupsOf } from "../firebase.js";
  import { getAge } from "../common/getAge";

  export default Vue.extend({
    name: "ClassRoom",
    components: {
      Lesson
    },
    mounted() {
      this.getTeachersGroups()
    },
    data() {
      return {
        teachersGroups: [],
        selectedGroupName: '',
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
            return `${value.streetname} ${value.houseNumber}, ${value.zipCode}, ${value.city}`
          }
        }, {
          key: 'birthDate',
          label: 'leeftijd',
          formatter: (value) => {
            return getAge(value)
          }
        },{
          key: 'gender',
          label: "Geslacht",
          formatter: (value) => {
            if (value === 'male') {
              return 'Man'
            } else {
              return 'Vrouw'
            }
          }
        }, {
          key: 'phoneNumber',
          label: 'Telefoonnummer'
        },
        'email']
      }
    },
    computed: {
      students() {
        const teachersGroup = this.teachersGroups.find((group) => {
          return group.groupName === this.selectedGroupName;
        })
        return teachersGroup.students;
      },
    },
    methods: {
      async getTeachersGroups() {
        this.teachersGroups = await getGroupsOf(firebase.auth().currentUser.email);
      },
    },
  })
</script>
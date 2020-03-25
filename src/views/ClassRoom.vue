<template>
  <b-container v-if="teachersGroups.length">
    <b-row>
      <b-form-select
        class="my-2"
        v-model="selectedGroupName"
        :options="teachersGroups"
        text-field="groupName"
        value-field="groupName"
      >
        <template v-slot:first>
          <option :value="null" disabled>-- Selecteer een klas --</option>
        </template>
      </b-form-select>
    </b-row>
    <b-row>
      <b-button
        v-if='selectedGroupName'
        class="my-3 mx-auto"
        variant="success"
        @click="jitsi"
      > Online les
      </b-button>
    </b-row>
    <Lesson v-if="selectedGroupName && students.length" v-bind:students="students" v-bind:selectedGroupName="selectedGroupName"/>
    <b-row v-if="selectedGroupName && students.length">
      <h3>Studentengegevens</h3>
      <b-table
        class="py-1"
        bordered
        :items="students"
        :fields="studentFields"
        :per-page="table.students.perPage"
        :current-page="table.students.currentPage"
      ></b-table>
      <b-pagination
        v-model="table.students.currentPage"
        v-if="rows > table.students.perPage"
        :total-rows="rows"
        :per-page="table.students.perPage"
        aria-controls="studentsTable"
      ></b-pagination>
    </b-row>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import Lesson from "../components/Lesson/Lesson"
  import { getGroupsOf } from "@/firebase/firebase";
  import { getUserEmail } from "@/firebase/auth";
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
        table: {
          students: {
            currentPage: 1,
            perPage: 10
          }
        },
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
    },
    computed: {
      students() {
        const teachersGroup = this.teachersGroups.find((group) => {
          return group.groupName === this.selectedGroupName;
        })
        return teachersGroup.students;
      },
      rows() {
        return this.students.length;
      }
    },
    methods: {
      async getTeachersGroups() {
        const userEmail = getUserEmail();
        this.teachersGroups = await getGroupsOf(userEmail);
      },
      jitsi() {
        this.$router.push({ name: 'jitsi', params: { group: this.selectedGroupName }})
      }
    }
  })
</script>
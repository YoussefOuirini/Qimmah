import Vue from "vue";
import { createGroup, getGroups, updateGroupTeacher, getAllRegistrations, writeStudentToGroup, updateRegistration, removeStudentFromGroups } from "../../firebase.js"

export default Vue.extend ({
  name: "Groups",
  props: ['users'],
  mounted() {
    this.loadGroups();
    this.loadRegistrations();
  },
  data() {
    return {
      isLoaded: true,
      groupName: "",
      groups: [],
      registrations: [],
      groupFields: [{
        key: "groupName",
        label: "Klas",
      }, {
        key: "teacher",
        label: "Leraar"
      }],
      registrationFields: [{
        key: "name",
        label: "Naam",
        formatter: (value) => {
          return `${value.first} ${value.last}`
        }
      }, {
        key: "education",
        label: "Onderwijs"
      }, {
        key: "group",
        label: "Klas"
      }],
      selectedGroupForTeacher: '',
      selectedGroupForStudent: '',
      selectedTeacher: '',
      selectedStudent: ''
    }
  },
  computed: {
    state() {
      return (this.groupName.length >= 4 && !this.groupAlreadyExists) ? true : false
    },
    invalidFeedback() {
      if (this.groupAlreadyExists) {
        return 'Klas bestaat al.'
      } else if (this.groupName.length > 4) {
        return ''
      } else if (this.groupName.length > 0) {
        return 'Vul minstens 4 letters in.'
      } else {
        return 'Vul iets in.'
      }
    },
    validFeedback() {
      return this.state === true ? 'Druk op klas toevoegen om de klas aan te maken!' : ''
    },
    groupAlreadyExists() {
      return this.groups.some((group) => {
        return group.groupName === this.groupName
      })
    },
    teachers() {
      return this.users.filter((user) => {
        if (user.customClaims && user.customClaims.teacher) {
          return user
        }
      })
    }
  },
  methods: {
    async addGroup() {
      if (this.groupAlreadyExists) {
        return;
      }
      this.isLoaded = false;
      await createGroup({groupName: this.groupName});
      await this.loadGroups();
      this.isLoaded = true;
    },
    async loadGroups() {
      this.groups = await getGroups();
    },
    async loadRegistrations() {
      this.registrations = await getAllRegistrations();
    },
    async addTeacher() {
      await updateGroupTeacher({teacher: this.selectedTeacher}, this.selectedGroupForTeacher.groupName);
      await this.loadGroups();
    },
    onRowSelectedStudent(student) {
      this.selectedStudent = student[0]
    },
    onRowSelectedGroup(group) {
      this.selectedGroupForTeacher = group[0]
    },
    async addStudentToGroup() {
      await removeStudentFromGroups(this.selectedStudent, this.groups);
      await writeStudentToGroup(this.selectedStudent, this.selectedGroupForStudent);
      await updateRegistration(this.selectedStudent, this.selectedGroupForStudent);
      await this.loadRegistrations();
      this.selectedStudent = "";
    },
  }
})
import Vue from "vue";
import Teachers from "./Teachers/Teachers.vue";
import Students from "./Students/Students.vue";
import ImportStudentsForm from "./ImportStudentsForm/ImportStudentsForm.vue";
import { createGroup, getGroups, getAllRegistrations } from "@/firebase/firebase.js";

export default Vue.extend ({
  name: "Groups",
  components: {
    Teachers,
    Students,
    ImportStudentsForm
  },
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
      registrations: []
    };
  },
  computed: {
    state() {
      return (this.groupName.length >= 3 && !this.groupAlreadyExists) ? true : false;
    },
    invalidFeedback() {
      if (this.groupAlreadyExists) {
        return 'Klas bestaat al.';
      } else if (this.groupName.length > 3) {
        return '';
      } else if (this.groupName.length > 0) {
        return 'Vul minstens 3 letters in.';
      } else {
        return 'Geef de nieuwe klas een naam.';
      }
    },
    validFeedback() {
      return this.state === true ? 'Druk op klas toevoegen om de klas aan te maken!' : '';
    },
    groupAlreadyExists() {
      return this.groups.some((group) => {
        return group.groupName === this.groupName;
      });
    },
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
    }
  }
});
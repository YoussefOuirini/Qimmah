import Vue from "vue";
import firebase from "firebase/app";
import 'firebase/auth';
import { checkUserClaim } from "../../firebase.js";
import { EventBus } from "../../EventBus";

export default Vue.extend({
  name: "Header",
  mounted() {
    this.loggedInUser = firebase.auth().currentUser;
    this.checkUserClaims();
    EventBus.$on('userLoginChange', () => {
      this.checkUserClaims();
      this.loggedInUser = firebase.auth().currentUser;
    });
    this.loadUserEmail();
  },
  data() {
    return {
      userEmail: "Gebruiker",
      userIsModerator: false,
      userIsTeacher: false,
      loggedInUser: false
    };
  },
  methods: {
    async checkUserClaims() {
      this.userIsModerator = await checkUserClaim('moderator');
      this.userIsTeacher = await checkUserClaim('teacher');
    },
    logout() {
      firebase.auth().signOut().then(() => {
        EventBus.reloadLoggedinUser();
        this.loggedInUser = firebase.auth().currentUser;
        this.$router.replace('login');
      });
    },
    loadUserEmail() {
      if (firebase.auth().currentUser) {
        this.userEmail = firebase.auth().currentUser.email;
      }
    }
  }
});

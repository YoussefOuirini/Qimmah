import Vue from "vue";
import firebase from "firebase";

export default Vue.extend({
  name: "Header",
  mounted() {
    this.checkIfUserIsModerator()
  },
  data() {
    return {
      userIsModerator: false
    }
  },
  methods: {
    async checkIfUserIsModerator() {
      const idTokenResult = await firebase.auth().currentUser.getIdTokenResult();
      this.userIsModerator = idTokenResult.claims.moderator;
    }
  }
})

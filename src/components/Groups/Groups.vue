<template>
  <b-container>
    <b-form-group
      id="group"
      description="De naam zal worden toegevoegd aan de klas."
      label="Creëer een nieuwe klas."
      label-for="group"
      :invalid-feedback="invalidFeedback"
      :valid-feedback="validFeedback"
      :state="state"
    >
       <b-input-group class="mt-3">
         <b-form-input id="group" v-model="groupName" :state="state" trim></b-form-input>
         <b-input-group-append>
          <b-button variant="success">Klas toevoegen</b-button>
         </b-input-group-append>
        </b-input-group>
    </b-form-group>
  </b-container>
</template>

<script>
import Vue from "vue";

export default Vue.extend ({
  name: "Groups",
  data() {
    return {
      groupName: ""
    }
  },
  computed: {
    state() {
      return this.groupName.length >= 4 ? true : false
    },
    invalidFeedback() {
      if (this.groupName.length > 4) {
        return ''
      } else if (this.groupName.length > 0) {
        return 'Vul minstens 4 letters in.'
      } else {
        return 'Vul iets in.'
      }
    },
    validFeedback() {
      return this.state === true ? 'Thank you' : ''
    }
  },
  methods: {

  }
})
</script>
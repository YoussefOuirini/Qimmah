<template>
  <b-container v-if="registrations.length">
    <b-table
      :busy="isBusy"
      :items="registrations"
      :fields="registrationFields"
    >
      <template v-slot:cell(actions)="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-1">
          {{ row.detailsShowing ? 'Verbeg' : 'Toon' }} Lessen
        </b-button>
        <b-button size="sm" variant="info" @click="absence(row.item, row.index, $event.target)" class="mr-1">
          Afmelden
        </b-button>
        <b-button size="sm" variant="success" @click="jitsi(row.item)" class="mr-1">
          Online les joinen
        </b-button>
        <b-dropdown no-caret variant="link">
          <template v-slot:button-content>
            <b-icon-three-dots-vertical></b-icon-three-dots-vertical>
          </template>
          <b-dropdown-item size="sm" variant="warning" @click="deleteRegistrationModal(row.item, row.index, $event.target)">
            Verwijder registratie
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <StudentLessons :student="row.item"/>
        </b-card>
      </template>
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Aan het laden...</strong>
        </div>
      </template>
    </b-table>
    <b-modal
      size="lg"
      :id="absenceModal.id"
      :ref="absenceModal.id"
      title="Afmelden van de les"
      ok-only ok-title="Niet afmelden"
    >
      <AbsenceForm :registration="absenceModal.registration" @hide="resetAbsenceModal"/>
    </b-modal>
    <b-modal
      size="lg"
      :id="deletionModal.id"
      :ref="deletionModal.id"
      title="Registratie Verwijderen"
      ok-only ok-title="Niet verwijderen"
    >
      <DeletionForm :registration="deletionModal.registration" @hide="resetDeletionModal"/>
    </b-modal>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import AbsenceForm from "./AbsenceForm.vue";
  import DeletionForm from "./DeletionForm.vue";
  import StudentLessons from "./StudentLessons.vue";
  import { EventBus } from "../../EventBus";
  import { getUsersRegistrations } from "@/firebase/firebase.js";

  export default Vue.extend ({
    name: "Registrations",
    components: {
      AbsenceForm,
      DeletionForm,
      StudentLessons
    },
    mounted() {
      this.loadRegistrations(),
      EventBus.$on('registration', () => {
        this.loadRegistrations();
      })
    },
    data() {
      return {
        registrations: [],
        isBusy: false,
        absenceModal: {
          id: 'absence-modal',
          registration: ''
        },
        deletionModal: {
          id: 'deletion-modal',
          registration: ''
        },
        registrationFields: [{
          key: 'name',
          label: 'Naam',
          formatter: (name) => {
            return `${name.first} ${name.last}`;
          }
        }, {
          key: 'group',
          label: 'Klas'
        }, {
          key: 'actions',
          label: ''
        }]
      }
    },
    methods: {
      async loadRegistrations() {
        this.isBusy = true;
        this.registrations = await getUsersRegistrations()
        this.isBusy = false;
      },
      absence(item, index, button) {
        this.absenceModal.registration = item;
        this.$root.$emit('bv::show::modal', this.absenceModal.id, button);
      },
      deleteRegistrationModal(item, index, button) {
        this.deletionModal.registration = item;
        this.$root.$emit('bv::show::modal', this.deletionModal.id, button);
      },
      resetAbsenceModal() {
        this.closeModal(this.absenceModal.id);
        this.absenceModal.title = '';
        this.absenceModal.registration = '';
      },
      resetDeletionModal() {
        this.closeModal(this.deletionModal.id);
        this.absenceModal.title = '';
        this.absenceModal.registration = '';
      },
      closeModal(modalId) {
        this.$refs[modalId].hide()
      },
      jitsi(student) {
        this.$router.push({ name: 'jitsi', params: { group: student.group }})
      }
    }
  })
</script>
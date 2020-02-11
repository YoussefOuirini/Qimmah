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
        <b-button size="sm" variant="warning" @click="absence(row.item, row.index, $event.target)" class="mr-1">
          Afmelden
        </b-button>
        <b-button size="sm" variant="danger" @click="deleteRegistration(row.item)">Verwijder registratie</b-button>
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
  </b-container>
</template>

<script>
  import Vue from "vue";
  import AbsenceForm from "./AbsenceForm.vue";
  import StudentLessons from "./StudentLessons.vue";
  import { EventBus } from "../../EventBus";
  import { deleteStudent, getUsersRegistrations} from "@/firebase/firebase.js";

  export default Vue.extend ({
    name: "Registrations",
    components: {
      AbsenceForm,
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
          label: 'Acties'
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
      resetAbsenceModal() {
        this.closeModal();
        this.absenceModal.title = '';
        this.absenceModal.registration = '';
      },
      closeModal() {
        this.$refs[this.absenceModal.id].hide()
      },
      async deleteRegistration(registration) {
        await deleteStudent(registration);
        EventBus.reloadRegistration()
      }
    }
  })
</script>
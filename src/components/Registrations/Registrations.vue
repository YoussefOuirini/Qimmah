<template>
  <b-container v-if="registrations.length">
    <b-table
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
      </template>
      <template v-slot:row-details="row">
        <b-card>
          <StudentLessons
            :student="row.item"
          />
        </b-card>
      </template>
    </b-table>
    <b-modal
      size="lg"
      :id="absenceModal.id"
      :ref="absenceModal.id"
      title="Afmelden van de les"
      ok-only ok-title="Niet afmelden"
    >
      <Absence :registration="absenceModal.registration" @hide="resetAbsenceModal"/>
    </b-modal>
    <b-table-simple striped>
      <b-thead>
        <b-tr>
          <b-th>Naam</b-th>
          <b-th>Studie</b-th>
          <b-th>Klas</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <Registration ref="registration" v-for="registration in registrations" v-bind:key="registration.id" v-bind:registration="registration"/>
      </b-tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
  import Vue from "vue";
  import Registration from "../Registration/Registration.vue";
  import Absence from "../Absence/Absence.vue";
  import StudentLessons from "./StudentLessons.vue";

  export default Vue.extend ({
    name: "Registrations",
    components: {
      Registration,
      Absence,
      StudentLessons
    },
    props: ["registrations"],
    data() {
      return {
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
      }
    }
  })
</script>
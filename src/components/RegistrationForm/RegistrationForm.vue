<template>
  <b-container v-if="loading == false">
    <br>
    <b-row><h1 style="font-style:italic">Inschrijfformulier Onderwijs</h1></b-row>
    <b-row><h2> Gegevens deelnemer </h2></b-row>
    <b-form>
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Vul uw voornaam in" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.name.first"
              required
              placeholder="Voornaam"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Vul uw achternaam in" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.name.last"
              required
              placeholder="Achternaam"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Geslacht"
            label-for="input-4"
          ><b-form-radio v-model="form.gender" name="gender" value="male">Man</b-form-radio>
            <b-form-radio v-model="form.gender" name="gender" value="female">Vrouw</b-form-radio>
          </b-form-group>
          <b-card bg-variant="light">
            <b-form-group
              label-cols-lg="3"
              label="Adres"
              label-size="lg"
              label-class="font-weight-bold pt-0"
              class="mb-0"
            >
              <b-form-group
                label-cols-sm="6"
                label="Straatnaam:"
                label-align-sm="right"
                label-for="nested-street"
              >
                <b-form-input id="nested-street" required v-model="form.address.streetname" placeholder= "Smitsven"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="7"
                label="Huisnummer:"
                label-align-sm="right"
                label-for="nested-street"
              >
                <b-form-input id="nested-street" required v-model="form.address.houseNumber" placeholder= "12"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="5"
                label="Postcode:"
                label-align-sm="right"
                label-for="nested-city"
              >
                <b-form-input id="nested-city" required v-model="form.address.zipCode" placeholder="1012 AZ"></b-form-input>
              </b-form-group>
              <b-form-group
                label-cols-sm="6"
                label="Woonplaats:"
                label-align-sm="right"
                label-for="nested-city"
              >
                <b-form-input id="nested-city" required v-model="form.address.city" placeholder="Zaandam"></b-form-input>
              </b-form-group>
            </b-form-group>
          </b-card>
        </b-col>
        <b-col m="6">
          <b-form-group
            id="input-group-5"
            label="Geboortedatum"
            label-for="input-5"
          ><b-form-input
              id="input-5"
              type= "date"
              v-model="form.birthDate"
              required
              v-on:input="checkAge"
            ></b-form-input>
          </b-form-group>

          <b-form-group v-if="form.underage" id="input-group-6" label="Vul de gegevens van de ouder/verzorger in" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="form.parent.name.first"
              required
              placeholder="Voornaam"
            ></b-form-input>
            <br>
            <b-form-input
              id="input-7"
              v-model="form.parent.name.last"
              required
              placeholder="Achternaam"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-7"
            label="Telefoonnummer"
            label-for="input-8"
          ><b-form-input
              id="input-8"
              type= "tel"
              placeholder="0612345678"
              v-model="form.phoneNumber"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="input-group-3"
            label="Welke studie:"
            label-for="input-3"
          ><b-form-select v-model="form.education" class="mb-3">
              <option :value="null">Studie</option>
              <option value="Qoraan">Dar al-Qoraan</option>
              <option v-if="form.underage===true" value="Basisonderwijs">Basisonderwijs</option>
              <option v-else value="Arabisch">Arabisch voor volwassenen</option>
            </b-form-select>
          </b-form-group>
          <b-row v-if="form.education === 'Qoraan'">
            <b-form-group
              id="input-group-10"
              label="Ik kan goed arabisch lezen en schrijven"
              label-for="input-10"
            ><b-form-radio v-model="form.arabic" name="arabic" v-bind:value="true">Ja</b-form-radio>
              <b-form-radio v-model="form.arabic" name="arabic" v-bind:value="false">Nee</b-form-radio>
            </b-form-group>
          </b-row>
          <b-row v-if="form.arabic === false && form.education === 'Qoraan'">
            <h6 style="font-style:oblique; color:lightSalmon">Om mee te doen met Dar al-Qoran is het van belang om de arabisch te kunnen lezen.</h6>
          </b-row>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <div v-if="completedForm && loading === false">
          <b-button v-on:click="submit" variant="primary">Inschrijving indienen</b-button>
        </div>
        <div v-else-if="!completedForm">
          <h4 style="color:crimson">Vul alle gegevens correct in.</h4>
        </div>
      </b-row>
    </b-form>
    <br>
    <b-row v-if="loading==false && registrationResponseText">
     <h4 style="color:green"> {{registrationResponseText}} </h4>
    </b-row>
  </b-container>
  <b-container v-else-if="loading==true">
    <b-spinner style="width: 25rem; height: 25rem;" label="Loading..."></b-spinner>
  </b-container>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>
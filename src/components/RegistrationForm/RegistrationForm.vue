<template>
  <b-container v-if="form.education=='qoraan'">
    <br>
    <b-row><h1 style="font-style:italic">Inschrijfformulier Dar al-Qoraan Al-Himmah</h1></b-row>
    <b-row><h2> Gegevens deelnemer </h2></b-row>
    <b-form>
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Vul uw voornaam in" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.firstName"
              required
              placeholder="Voornaam"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Vul uw achternaam in" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.lastName"
              required
              placeholder="Achternaam"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-3"
            label="Email adres:"
            label-for="input-3"
            description="Uw email wordt tevens uw gebruikersnaam."
          ><b-form-input
              id="input-3"
              v-model="form.email"
              type="email"
              required
              placeholder="Vul uw email in"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Geslacht"
            label-for="input-4"
          ><b-form-radio v-model="form.gender" name="gender" value="male">Man</b-form-radio>
            <b-form-radio v-model="form.gender" name="gender" value="female">Vrouw</b-form-radio>
          </b-form-group>
        </b-col>
        <b-col>
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
              v-model="form.parent.firstName"
              required
              placeholder="Voornaam"
            ></b-form-input>
            <br>
            <b-form-input
              id="input-7"
              v-model="form.parent.lastName"
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
        </b-col>
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Adres"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label-cols-sm="5"
              label="Straatnaam:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" required v-model="form.address.streetname" placeholder= "Straatnaam"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="5"
              label="Huisnummer:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" required v-model="form.address.houseNumber" placeholder= "Huisnummer"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="4"
              label="Postcode:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" required v-model="form.address.zipCode" placeholder="Bijv. 1012 AZ"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="5"
              label="Woonplaats:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" required v-model="form.address.city" placeholder="Zaandam"></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>
      </b-row>
      <b-row>
        <b-form-group
          id="input-group-10"
          label="Ik kan goed arabisch lezen en schrijven"
          label-for="input-10"
        ><b-form-radio v-model="form.arabic" name="arabic" value="yes">Ja</b-form-radio>
          <b-form-radio v-model="form.arabic" name="arabic" value="no">Nee</b-form-radio>
        </b-form-group>
      </b-row>
      <b-row>
        <div v-if="form.arabic==='yes' && completedForm">
          <b-button v-on:click="submit" variant="primary">Inschrijving indienen</b-button>
        </div>
        <div v-else-if="form.arabic ==='no'">
          <h6>Om mee te doen met Dar al-Qoran is het van belang om de arabisch taal machtig te zijn</h6>
          <h6>U kunt zich inschrijven voor de cursussen arabisch om eerst arabisch te leren.</h6>
        </div>
        <div v-else-if="!completedForm">
          <h4 style="color:crimson">Vul alle gegevens correct in.</h4>
        </div>
      </b-row>
    </b-form>
  </b-container>
  <b-container v-else-if="!form.education">
    <br>
    <div>
      <b-form-select v-model="form.education" class="mb-3">
        <option :value="null">Kies waarvoor u zich wilt inschrijven</option>
        <option value="qoraan">Dar al-Qoraan</option>
        <option value="basisonderwijs">Basisonderwijs</option>
        <option value="arabisch">Arabisch voor volwassenen</option>
      </b-form-select>
    </div>
  </b-container>
  <b-container v-else-if="form.education== 'basisonderwijs'||'arabisch'">
    <br>
    Wello {{form.education}} habbibi
  </b-container>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>
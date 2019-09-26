<template>
  <b-container>
    <br>
    <b-row><h1>Inschrijfformulier Dar al-Qoraan Al-Himmah</h1></b-row>
    <b-row><h2> Gegevens deelnemer </h2></b-row>
    <b-form @submit="submit">
      <b-row>
        <b-col>
          <b-form-group id="input-group-1" label="Vul uw voornaam in" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="firstName"
              required
              placeholder="Voornaam"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Vul uw achternaam in" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="lastName"
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
              v-model="email"
              type="email"
              required
              placeholder="Vul uw email in"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-4"
            label="Geslacht"
            label-for="input-4"
          ><b-form-radio v-model="gender" name="gender" value="male">Man</b-form-radio>
            <b-form-radio v-model="gender" name="gender" value="female">Vrouw</b-form-radio>
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
              v-model="birthDate"
              required
              v-on:input="checkAge"
            ></b-form-input>
          </b-form-group>

          <b-form-group v-if="underage" id="input-group-6" label="Vul de gegevens van de ouder/verzorger in" label-for="input-6">
            <b-form-input
              id="input-6"
              v-model="parent.firstName"
              required
              placeholder="Voornaam"
            ></b-form-input>
            <br>
            <b-form-input
              id="input-7"
              v-model="parent.lastName"
              required
              placeholder="Achternaam"
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
              label-cols-sm="3"
              label="Adres:"
              label-align-sm="right"
              label-for="nested-street"
            >
              <b-form-input id="nested-street" required v-model="adress" placeholder= "Straatnaam en huisnummer"></b-form-input>
            </b-form-group>

            <b-form-group
              label-cols-sm="3"
              label="Postcode:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" required v-model="zipCode" placeholder="Bijv. 1012 AZ"></b-form-input>
            </b-form-group>
            <b-form-group
              label-cols-sm="3"
              label="Woonplaats:"
              label-align-sm="right"
              label-for="nested-city"
            >
              <b-form-input id="nested-city" required v-model="city" placeholder="Zaandam"></b-form-input>
            </b-form-group>
          </b-form-group>
        </b-card>

        <div>
          <h2>Telefoonnummer</h2>
          <input type="text" required v-model="phoneNumber" />
        </div>

        <div>
          <h2>Ik kan goed arabisch lezen en schrijven</h2>
          <input type="radio" id="arabic" name="arabic" required value="yes" v-model="arabic">
          <label for="Yes">Ja</label>
          <br>
          <input type="radio" id="arabic" name="arabic" value="no" v-model="arabic">
          <label for="No">No</label>
          <br>
        </div>
        <div v-if="arabic==='yes' && completedForm">
          <b-button type="submit" variant="primary">Inschrijving indienen</b-button>
        </div>
        <div v-else-if="arabic ==='no'">
          <h4>Om mee te doen met Dar al-Qoran is het van belang om de arabisch taal machtig te zijn</h4>
          <h4>U kunt zich inschrijven voor de cursussen arabisch om eerst arabisch te leren. Daarna kunt u zich inschrijven.</h4>
        </div>
        <div v-else-if="!completedForm">
          <h4>Vul alle gegevens correct in.</h4>
        </div>
      </b-row>
    </b-form>
  </b-container>
</template>
<script>
  module.exports = require("./RegistrationForm.js");
</script>
<script lang="ts">
import { defineComponent, PropType } from "vue"
import axios from "axios"
import { User } from "../types";
import { addToOrder, STORAGE_NAME } from '../utils/localStorage'

export default defineComponent({
  props: {
    user: {} as PropType<User>,
  },
  data() {
    return {
      montatura: null as any | null,
      lac: null as any | null,
      Quantita: 1,
      categoria: ""
    }
  },
  methods: {
    getVista() {
      axios.get("/api/prodotti/vista/"+ this.$route.params.idProdotto)
      .then(response => this.montatura = response.data[0])
    },
    getLac() {
      axios.get("/api/prodotti/lac/"+ this.$route.params.idProdotto)
      .then(response => this.lac = response.data[0])
    },
    getSole() {
      axios.get("/api/prodotti/vista/" + this.$route.params.idProdotto)
      .then(response => this.montatura = response.data[0])
    },
    async addItem(prod: any) {
      const prodotto = {
        IDProdotto: prod.Modello,
        Categoria: this.categoria,
        Quantita: this.Quantita,
        Prezzo: prod.Prezzo,
        Immagine: prod.Immagine
      }
      this.Quantita = 1,
      await addToOrder(STORAGE_NAME, prodotto)
    }
  },
  mounted() {
    if(this.$route.params.categoria == "Montature") {
        this.getVista()
        this.categoria = "Montature"
    }
    if(this.$route.params.categoria == "LAC") {
        this.getLac()
        this.categoria = "LAC"
    }
  }
})
</script>


<template>
  <div v-if="montatura" class="flex-container-ps">
    <img :src="'/' + montatura.Immagine" alt="/" />
    <h2>Modello: {{montatura.Modello}}</h2>
    <div class="flex-item">
      <p>Brand: {{ montatura.Brand }}</p>
      <p>Prezzo: {{ montatura.Prezzo }}€</p>
      <p>Versione: {{ montatura.Versione }}</p>
      <p>Calibro: {{ montatura.Calibro }}</p>
    </div>
    <div class="flex-item">
      <p>Ponte: {{ montatura.Ponte }}mm</p>
      <p>Aste: {{ montatura.Aste }}mm</p>
      <p>Materiale: {{ montatura.Materiale }}</p>
      <p>Colore: {{ montatura.Colore }}</p>
    </div>
    <form @submit.prevent="addItem(montatura)" v-if="user">
      <select v-model="Quantita">
        <option value=0></option>
        <option value=1>1</option>
        <option value=3>3</option>
        <option value=6>6</option>
      </select>
      <button type="submit">Aggiungi ad Ordine</button>
    </form>
  </div>
  <div v-if="lac" class="flex-container-ps">
    <img :src="'/' + lac.Immagine" alt="/" />
    <h2>{{lac.Modello}}</h2>
    <div class="flex-item">
      <p>Brand: {{ lac.Brand }}</p>
      <p>Prezzo: {{ lac.Prezzo }}€</p>
      <p>Durata: {{ lac.Durata }}</p>
    </div>
    <div class="flex-item">
      <p>Fascia: {{ lac.Fascia }}</p>
      <p>Focale: {{ lac.Focale }}</p>
    </div>
    <form @submit.prevent="addItem(lac)" v-if="user">
      <select v-model="Quantita">
        <option value=0></option>
        <option value=1>1</option>
        <option value=3>3</option>
        <option value=6>6</option>
      </select>
      <button type="submit">Aggiungi ad Ordine</button>
    </form>
  </div>
</template>
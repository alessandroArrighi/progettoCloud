<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";
import { Ordine } from "../types";
import { addToOrder, STORAGE_NAME } from "../utils/localStorage"

export default defineComponent({
  props: {
    ordine: Array as PropType<Ordine[]>
  },
  data() {
    return {
      datiProdotto: [] as any[],
      filterId: "",
      filterBrand: "",
      filterPrice: "",
      mostraFiltri: false,
      ordinaPer: "",
      elementiMostrati: 4,
      categoria: "",
    }
  },
  computed: {
    filteredData(): any[] {
      let filteredData = [...this.datiProdotto];

      if (this.filterId) {
        filteredData = filteredData.filter(prodotto => prodotto.Modello.includes(this.filterId));
      }

      if (this.filterBrand) {
        filteredData = filteredData.filter(prodotto => prodotto.Brand.includes(this.filterBrand));
      }

      if (this.filterPrice) {
        filteredData = filteredData.filter(prodotto => prodotto.Prezzo.toString().includes(this.filterPrice));
      }

      return filteredData;
    },
    sortedData(): any[] {
      let sortedData = [...this.filteredData];

      if (this.ordinaPer === "prezzo") {
        sortedData.sort((a, b) => a.Prezzo - b.Prezzo);
      } else if (this.ordinaPer === "brand") {
        sortedData.sort((a, b) => a.Brand.localeCompare(b.Brand));
      }

      return sortedData;
    }
  },
  methods: {
    async getVista() {
      const res = await axios.get("/api/prodotti/vista")
        this.datiProdotto = res.data
    },
    async getLAC() {
        const res = await axios.get("/api/prodotti/lac")
        this.datiProdotto = res.data
    },
    async getSole() {
      const res = await axios.get("/api/prodotti/sole")
      this.datiProdotto = res.data
    },
    async addItem(prod: any) {
      const prodotto = {
        IDProdotto: prod.Modello,
        Categoria: this.categoria,
        Quantita: 1,
        Prezzo: prod.Prezzo,
        Immagine: prod.Immagine
      }
      await addToOrder(STORAGE_NAME, prodotto)
    },
    aggiungiElementi() {
      this.elementiMostrati += 4
    }
  },
  mounted() {
    if(this.$route.params.categoria == "MontatureV") {
        this.getVista()
        this.categoria = "Montature"
    }
    if(this.$route.params.categoria == "MontatureS") {
      this.getSole()
      this.categoria = "Montature"
    }
    if(this.$route.params.categoria == "LACC") {
        this.getLAC()
        this.categoria = "LAC"
    }
  },
});
</script>

<template>
  <div class="flex-container-filtri">
    <div class="flex-item">
      <button @click="mostraFiltri = !mostraFiltri">Applica Filtri</button>
      <form v-if="mostraFiltri">
        <label>Filtra per ID Prodotto:</label>
        <input v-model="filterId" type="text"/>
        <label>Filtra per Brand:</label>
        <input v-model="filterBrand" type="text"/>
        <label>Filtra per Prezzo:</label>
        <input v-model="filterPrice" type="text"/>
      </form>
    </div>

    <form class="flex-item">
      <select v-model="ordinaPer">
        <option value="">Ordina Per</option>
        <option value="prezzo">Prezzo</option>
        <option value="brand">Brand</option>
      </select>
    </form>
  </div>
  
  <div class="flex-container-prodotti">
    <div v-for="prodotto in sortedData.slice(0, elementiMostrati)" class="flex-item">
      <RouterLink :to="'/prodotti/' + categoria + '-' + prodotto.Modello">
        <img loading="lazy" :src="'/' + prodotto.Immagine" alt="/">
        <p>{{ prodotto.Modello }}</p>
        <p>{{ prodotto.Brand }}</p>
        <p>{{ prodotto.Prezzo }}€</p>
      </RouterLink>
      <form @submit.prevent="addItem(prodotto)">
        <button type="submit">Aggiungi</button>
      </form>
    </div>
  </div>
  <div class="command">
    <form @submit.prevent="aggiungiElementi">
      <button type="submit">Carica Altri</button>
    </form>
  </div>
</template>

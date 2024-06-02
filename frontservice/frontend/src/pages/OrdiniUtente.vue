<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
    data() {
        return{
            datiOrdine: [] as any[],
        }
    },
    methods: {
        async getOrderFromID() {
            const res = await axios.get("/api/ordini/user")
            this.datiOrdine = res.data
        }
    },
    mounted() {
        this.getOrderFromID()
    }
})
</script>

<template>
    <h3 v-if = "datiOrdine.length > 0" class = 'titolo'>Selezionare L'Ordine Da Visualizzare</h3>
    <div class="flex-container-prodotti">
        <div v-for="ordine in datiOrdine" class="flex-item">
            <RouterLink :to="'/accesso/areaPersonale/operazioniOrdini/' + ordine.IDOrdine"><p>Numero dell'ordine: {{ ordine.IDOrdine }}</p></RouterLink>
        </div>
        <div v-if = "datiOrdine.length == 0">
            <h4>Nessun Ordine Effettuato</h4>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";
import { User } from "../types"

export default defineComponent({
    props: {
        user: Object as PropType<User>,
    },
    data() {
        return{
            idRicerca: "",
            datiOrdine: [] as any[],
            error: ""
        }
    },
    methods: {
        async getOrderFromID() {
            try {
                this.datiOrdine = []
                const res = await axios.post("/api/ordini/idordine", {
                    id: this.idRicerca,
                })
                this.datiOrdine = res.data
                this.idRicerca= ""
            } catch(e) {
                this.error = "Ordine non esistente! Inserire un ID Ordine corretto"
                console.log(this.error)
            }
            
        },
        async getOrderIniziale() {
            const res = await axios.post("/api/ordini/getordine", {
                id: this.$route.params.IDOrdine,
            })
            this.datiOrdine = res.data
        },
        getRouterLink(articolo: any) {
            const categoria = articolo.Aste ? "Montature" : "LAC"
            return `/prodotti/${categoria}-${articolo.Modello}`;
        }
    },
    mounted() {
        if (this.$route.params.IDOrdine) {
            this.getOrderIniziale()
        }
    }
})
</script>

<template>
    <div class="command">
        <h4>Inserire l'ID dell'ordine da cercare</h4>
        <form v-if="user?.Role == 'admin'" @submit.prevent="getOrderFromID" class="flex-item">
            <label>ID Ordine</label>
            <input v-model="idRicerca" type="text" />
            <button type="submit">Cerca</button>
            <p v-if = "error" class = "error">{{ error }}</p>
        </form>
    </div>

    <div class="flex-container-prodotti">
        <div v-for="articolo in datiOrdine" class="flex-item">
            <router-link :to="getRouterLink(articolo)">
                <img loading="lazy" :src="'/' + articolo.Immagine" alt="/">
                <p>{{ articolo.Modello }}</p>
                <p>{{ articolo.Brand }}</p>
                <p>{{ articolo.Prezzo }}</p>
            </router-link>
        </div>

    </div>
</template>
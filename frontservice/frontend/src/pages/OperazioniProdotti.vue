<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import { Montatura, LAC } from "../types";

export default defineComponent({
    data() {
        return {
        nuovaMontatura: {} as Montatura,
        nuovaLAC: {} as LAC,
        modificaMontatura: {} as Montatura,
        modificaLAC: {} as LAC,
        eliminaItem: {} as LAC,
        mostra1: false,
        mostra2: false,
        mostra3: false,
        mostra4: false,
        mostra5: false,
        errorAddLAC: "",
        errorMon: "",
        errorLAC: "",
        errorDel: "",
        errorAddMon: ""
        }
    },
    methods: {
        async addMontatura() {
            try {
                await axios.post("/api/prodotti/aggiungi/montature", {
                    dati: this.nuovaMontatura
                });
                this.initMontatura(this.nuovaMontatura)
            } catch(e) {
                this.errorAddMon = "Modello non inserito! Inserire correttamente il Modello"
            }
        },
        async addLAC() {
            try {
                 const response = await axios.post("/api/prodotti/aggiungi/lac", {
                    dati: this.nuovaLAC
                });
                if (response.status === 200) {
                    this.initLAC(this.nuovaLAC)
                }
            } catch (error) {
                this.errorAddLAC = "Modello non inserito! Inserire correttamente il modello."
            }
        },
        async modifyMontatura() {
            try {
                const response = await axios.post("/api/prodotti/modifica/montature", {
                    dati: this.modificaMontatura
                });
                if (response.status === 200) {
                    this.modificaMontatura.Modello = null;
                    this.modificaMontatura.Brand = null;
                    this.modificaMontatura.Prezzo = null;
                    this.modificaMontatura.Versione = null;
                    this.modificaMontatura.Calibro = null;
                    this.modificaMontatura.Ponte = null;
                    this.modificaMontatura.Aste = null;
                    this.modificaMontatura.Materiale = null;
                    this.modificaMontatura.Colore = null;
                    this.modificaMontatura.Immagine = null;  
                    this.errorMon = ""
                }
            } catch (error) {
                this.errorMon = "Modello Montatura non esistente, impossibile modificare."
            }

        },
        async modifyLAC() {
            try {
                const response = await axios.post("/api/prodotti/modifica/lac", {
                    dati: this.modificaLAC
                });
                if (response.status === 200) {
                    this.modificaLAC.Modello = null;
                    this.modificaLAC.Brand = null;
                    this.modificaLAC.Prezzo = null;
                    this.modificaLAC.Durata = null;
                    this.modificaLAC.Fascia = null;
                    this.modificaLAC.Focale = null;
                    this.errorLAC = ""
                }
            } catch (error) {
                this.errorLAC = "Modello LAC non esistente, impossibile modificare."
            }
        }, 
        async deleteProduct() {
            try {
                const response = await axios.post("/api/prodotti/elimina", {
                dati: this.eliminaItem
                });
                if (response.status === 200) {
                    this.eliminaItem.Modello = "";
                    this.eliminaItem.Categoria = "";
                }   
            } catch (error) {
                this.errorDel = "Modello proddot non esistente, impossibile eliminare prodotto."
            }
        },
        async initMontatura(Montatura: Montatura) {
            Montatura.Modello = "";
            Montatura.Brand = "";
            Montatura.Prezzo = 0;
            Montatura.Versione = "";
            Montatura.Calibro = "";
            Montatura.Ponte = "";
            Montatura.Aste = "";
            Montatura.Materiale = "";
            Montatura.Colore = "";
            Montatura.Immagine = "";  
        },
        async initLAC (LAC: LAC) {
            LAC.Modello = "";
            LAC.Brand = "";
            LAC.Prezzo = 0;
            LAC.Durata = "";
            LAC.Fascia = "";
            LAC.Focale = "";
        }
    },
    mounted() {
        this.initMontatura(this.nuovaMontatura)
        this.initLAC(this.nuovaLAC)
        this.initMontatura(this.modificaMontatura)
        this.initLAC(this.modificaLAC)
    }
})

</script>

<template>
    <div class="flex-container-opProd">
        <form @submit.prevent="addMontatura" class="flex-item-opProd">
            <h4>Inserisci una Nuova Montatura</h4>
            <p v-if = "errorAddMon" class = "erorr">{{ errorAddMon }}</p>
            <div v-if="mostra1" class="flex-container">
                <div class="flex-item">
                    <label >Modello</label>
                    <input v-model="nuovaMontatura.Modello" type="text" />
                    <label >Brand</label>
                    <input v-model="nuovaMontatura.Brand" type="text" />
                    <label >Prezzo</label>
                    <input v-model="nuovaMontatura.Prezzo" type="text" />
                    <label >Versione</label>    
                    <input v-model="nuovaMontatura.Versione" type="text" />
                    <label >Calibro</label>
                    <input v-model="nuovaMontatura.Calibro" type="text" />
                </div>
                <div class="flex-item">
                    <label >Ponte</label>
                    <input v-model="nuovaMontatura.Ponte" type="text" />
                    <label >Aste</label>
                    <input v-model="nuovaMontatura.Aste" type="text" />
                    <label >Materiale</label>
                    <input v-model="nuovaMontatura.Materiale" type="text" />
                    <label >Colore</label>
                    <input v-model="nuovaMontatura.Colore" type="text" />
                    <label >Immagine</label>
                    <input v-model="nuovaMontatura.Immagine" type="text" />
                </div>
                <button type="submit">Aggiungi Montatura</button>
            </div>
            <div class="flex-container">
                <button v-if="!mostra1" @click="mostra1 = !mostra1">Mostra</button><button v-if="mostra1" @click="mostra1 = !mostra1">Nascondi</button>
            </div>
        </form>

        <form @submit.prevent="addLAC" class="flex-item-opProd">
            <h4>Inserisci una Nuova LAC</h4>
            <p v-if="errorAddLAC"> {{ errorAddLAC }}</p>
            <div v-if="mostra2" class="flex-container">
                <div class="flex-item">
                    <label >Modello</label>
                    <input v-model="nuovaLAC.Modello" type="text" />
                    <label >Brand</label>
                    <input v-model="nuovaLAC.Brand" type="text" />
                    <label >Prezzo</label>
                    <input v-model="nuovaLAC.Prezzo" type="text" />
                </div>
                <div class="flex-item">
                    <label >Durata</label>
                    <input v-model="nuovaLAC.Durata" type="text" />
                    <label >Fascia</label>
                    <input v-model="nuovaLAC.Fascia" type="text" />
                    <label >Focale</label>
                    <input v-model="nuovaLAC.Focale" type="text" />
                </div>
                <button type="submit">Aggiungi LAC</button>
            </div>
            <div class="flex-container">
                <button v-if="!mostra2" @click="mostra2 = !mostra2">Mostra</button><button v-if="mostra2" @click="mostra2 = !mostra2">Nascondi</button>
            </div>
        </form>

        <form @submit.prevent="modifyMontatura" class="flex-item-opProd">
            <h4>Modifica una Montatura</h4>
            <p v-if="errorMon"> {{ errorMon }}</p>
            <div v-if="mostra3" class="flex-container">
                <div class="flex-item">
                    <label >Modello</label>
                    <input v-model="modificaMontatura.Modello" type="text" />
                    <label >Brand</label>
                    <input v-model="modificaMontatura.Brand" type="text" />
                    <label >Prezzo</label>
                    <input v-model="modificaMontatura.Prezzo" type="text" />
                    <label >Versione</label>
                    <input v-model="modificaMontatura.Versione" type="text" />
                    <label >Calibro</label>
                    <input v-model="modificaMontatura.Calibro" type="text" />
                    <label >Ponte</label>
                    <input v-model="modificaMontatura.Ponte" type="text" />
                </div>
                <div class="flex-item">
                    <label >Aste</label>
                    <input v-model="modificaMontatura.Aste" type="text" />
                    <label >Materiale</label>
                    <input v-model="modificaMontatura.Materiale" type="text" />
                    <label >Colore</label>
                    <input v-model="modificaMontatura.Colore" type="text" />
                    <label >Immagine</label>
                    <input v-model="modificaMontatura.Immagine" type="text" />
                    <label >NewModello</label>
                    <input v-model="modificaMontatura.NewModello" type="text" />
                </div>
                <button type="submit">Modifica Montatura</button>
            </div>
            <div class="flex-container">
                <button v-if="!mostra3" @click="mostra3 = !mostra3">Mostra</button><button v-if="mostra3" @click="mostra3 = !mostra3">Nascondi</button>
            </div>
        </form>

        <form @submit.prevent="modifyLAC" class="flex-item-opProd">
            <h4>Modifica una LAC</h4>
            <p v-if="errorLAC"> {{ errorLAC }}</p>
            <div v-if="mostra4" class="flex-container">
                <div class="flex-item">
                    <label >Modello</label>
                    <input v-model="modificaLAC.Modello" type="text" />
                    <label >Brand</label>
                    <input v-model="modificaLAC.Brand" type="text" />
                    <label >Prezzo</label>
                    <input v-model="modificaLAC.Prezzo" type="text" />
                    <label >Durata</label>
                    <input v-model="modificaLAC.Durata" type="text" />
                </div>
                <div class="flex-item">
                    <label >Fascia</label>
                    <input v-model="modificaLAC.Fascia" type="text" />
                    <label >Focale</label>
                    <input v-model="modificaLAC.Focale" type="text" />
                    <label >Nuovo Modello</label>
                    <input v-model="modificaLAC.NewModello" type="text" />
                </div>
                <button type="submit">Modifica LAC</button>
            </div>
            <div class="flex-container">
                <button v-if="!mostra4" @click="mostra4 = !mostra4">Mostra</button><button v-if="mostra4" @click="mostra4 = !mostra4">Nascondi</button>
            </div>
        </form>

        <form @submit.prevent="deleteProduct" class="flex-item-opProd">
            <h4>Elimina un Prodotto</h4>
            <p v-if="errorDel"> {{ errorDel }}</p>
            <div v-if="mostra5" class="flex-container">
                <div class="flex-item">
                    <label>Modello da eliminare</label>
                    <input v-model="eliminaItem.Modello" type="text"/>
                    <label>Categoria prodotto</label>
                    <input v-model="eliminaItem.Categoria" type="text" />
                </div>
                <button type="submit">Elimina</button>
            </div>
            <div class="flex-container">
                <button v-if="!mostra5" @click="mostra5 = !mostra5">Mostra</button><button v-if="mostra5" @click="mostra5 = !mostra5">Nascondi</button>
            </div>
        </form>
    </div>
</template>
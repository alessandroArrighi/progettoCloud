<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User, Utente } from "../types"
import axios from "axios";

export default defineComponent({
    data() {
        return {
            datiUtente: {} as Utente,
            nuoviDati: {} as Utente,
            oldPassword: "",
            newPassword: "",
            pwdError: ""
        }
    },
    props: {
        user: Object as PropType<User>,
    },
    methods: {
        async modifyPassword() {
            try { 
                await axios.post("/api/auth/mod/password", {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword
                })
                window.location.reload()
            } catch(e) {
                this.pwdError = "Passowrd errata! Inserire la password corretta"
            }
            
        },
        async getUtente(){
            const res = await axios.get("/api/utenze")
            this.datiUtente = res.data

        },
        async modifyData() {
            await axios.post("/api/utenze/modifica", {
                dati: this.nuoviDati
            })
            window.location.reload()
        }
    },
    mounted(){
        this.getUtente()
    }
})

</script>

<template>
    <div class="flex-container-agr">
        <div class="flex-item">
            <h4>Dati Personali:</h4>
            <p>ID Utente: {{ datiUtente.IDUtente }}</p>
            <p>Username: {{ datiUtente.User }}</p>
            <p>Nome: {{ datiUtente.Nome }}</p>
            <p>Cognome: {{ datiUtente.Cognome }}</p>
            <p>Indirizzo Email: {{ datiUtente.Mail }}</p>
            <p>Numero di Telefono: {{ datiUtente.Telefono }}</p>
            <p>Indirizzo di Spedizione: {{ datiUtente.Indirizzo }}</p>
            <p>Tipologia Utente: {{ datiUtente.Role }}</p>
        </div>

        <div class="flex-item">
            <form @submit.prevent="modifyData" >
                <h4>Modificare i Dati Personali:</h4>
                <label >User</label>
                <input v-model="nuoviDati.User" type="text" />
                <label >Nome</label>
                <input v-model="nuoviDati.Nome" type="text" />
                <label >Cognome</label>
                <input v-model="nuoviDati.Cognome" type="text" />
                <label >Mail</label>
                <input v-model="nuoviDati.Mail" type="text" />
                <label >Telefono</label>
                <input v-model="nuoviDati.Telefono" type="text" />
                <label >Indirizzo</label>
                <input v-model="nuoviDati.Indirizzo" type="text" />
                <button type="submit">Modifica Dati</button>
            </form>
        </div>
    </div>
    <div class="flex-container-ap">
        <div class = "flex-item">
            <h4>Modifica Password</h4>
            <form @submit.prevent="modifyPassword">
                <label>Inserire la vecchia password</label>
                <input v-model="oldPassword" type="password"/>
                <label>Inserire la nuova password</label>
                <input v-model="newPassword" type="password"/>
                <button type="submit">Cambia Password</button>
                <p v-if = "pwdError" class = "error">{{ pwdError }}</p>
            </form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { User } from "../types"

export default defineComponent({
    props: {
        user: Object as PropType<User>,
    }
})
</script>


<template>
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 m-4" id="areaPersonale">
        <div class="col col-lg-3" v-if="user?.Role == 'admin'">
            <RouterLink :to="'/accesso/areaPersonale/operazioniProdotti'">
                <div class="card">
                    <img src="/tools.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Operazioni Prodotti</h5>
                        <p class="card-text">Selezionare questa scheda per effettuare differenti operazioni relative ai prodotti</p>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div class="col col-lg-3">
            <RouterLink v-if="user?.Role == 'admin'" :to="'/accesso/areaPersonale/operazioniOrdini'">
                <div class="card">
                    <img src="/lens.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Cerca Ordini per ID</h5>
                        <p class="card-text">Selezionare questa scheda per ricercare uno specifico ordine inserendo il suo ID</p>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div class="col col-lg-3">
            <RouterLink :to="'/accesso/areaPersonale/ordiniUtente'">
                <div class="card">
                    <img src="/box.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Ordini Utente</h5>
                        <p class="card-text">Selezionare questa scheda per visualizzare tutti gli ordini ed i relativi prodotti acquistati</p>
                    </div>
                </div>
            </RouterLink>
        </div>
        <div class="col col-lg-3">
            <RouterLink :to="'/accesso/areaPersonale/anagrafica'">
                <div class="card">
                    <img src="/user.png" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">Dati Personali</h5>
                        <p class="card-text">Selezionare questa scheda per visualizzare e modificare i propi dati personali</p>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
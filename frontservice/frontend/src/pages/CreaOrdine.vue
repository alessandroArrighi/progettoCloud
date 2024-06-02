<script lang="ts">
import { defineComponent, PropType } from "vue";
import axios from "axios";
import { User, Ordine } from "../types";
import { setItem, getItem, STORAGE_NAME, EXPIRE_TIME } from "../utils/localStorage"

export default defineComponent({
    props: {
        user: Object as PropType<User>,
    },
    data() {
        return{
            idProdotto: "",
            categoria: "",
            Quantita: 0,
            ordine: [] as Ordine[]
        }
    },
    computed: {
      subtotale() {
          return this.ordine.reduce((total, prodotto) => total + (prodotto.Prezzo * prodotto.Quantita), 0);
      },
      totale() {
        return this.subtotale + 20;
      }
    },
    methods: {
        async creaOrdine() {
            await axios.post("/api/ordini/crea/ordine", {
                IDUtente: this.user?.IDUtente,
                ord: this.ordine
            })
            this.ordine = []
            localStorage.removeItem(STORAGE_NAME)
            window.location.href="/"
        },
        async rimuoviProdotto(prodotto: any) {
            const item = {
                IDProdotto: prodotto.IDProdotto,
                Categoria: prodotto.Categoria,
                Quantita: prodotto.Quantita,
                Prezzo: prodotto.Prezzo
            }
            var index = this.ordine.findIndex(obj => obj.IDProdotto === item.IDProdotto);

            if (index !== -1) {
                this.ordine.splice(index, 1);
            }
            await setItem(STORAGE_NAME, this.ordine, EXPIRE_TIME)
        },

        async getOrder() {
            const order = await getItem(STORAGE_NAME)
            this.ordine = order
        }
    },
    mounted() {
        this.getOrder()
    }
})
</script>

<template>
  <div v-if="ordine.length > 0">
    <h2>Completa Il Tuo Ordine</h2>
    <section  class="bg-dark">
      <div class="container" >
        <div class="row d-flex justify-content-center align-items-center">
          <div class="col">
            <div class="card bg-dark">
              <div class="card-body p-4">

                <div class="row">

                  <div class="col-lg-7">

                    <div class="card mb-3 bg-light" v-for = "prodotto in ordine" style="background-color: #28282d;">
                      <div class="card-body bg-light p-1">

                        <div class="flex-container-cart">

                          <div class="flex-item-1">
                              <div>
                                <img :src="'/' + prodotto.Immagine" class="img-fluid rounded-3" alt="Shopping item" >
                              </div>
                            <RouterLink :to="'/prodotti/' + prodotto.Categoria + '-' + prodotto.IDProdotto">
                                <h5>{{ prodotto.IDProdotto }}</h5>
                                <p>{{ prodotto.Categoria }}</p>
                            </RouterLink>
                          </div>

                          <div class="flex-item-2">
                            <div>
                              <h5>Qt.</h5>
                              <p>{{ prodotto.Quantita }}</p>
                            </div>
                            <div>
                              <h5>Prezzo</h5>
                              <p>{{ prodotto.Prezzo }}€</p>
                            </div>
                            <button @click = "rimuoviProdotto(prodotto)" class="btn btn-primary btn-block btn-sm">Rimuovi</button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5">

                    <div class="card bg-primary text-white rounded-3">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                          <h5 class="mb-0">Dettagli Carta</h5>
                          <svg xmlns="http://www.w3.org/2000/svg" style="width: 45px;" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                          </svg>
                        </div>

                        <form class="mt-4">
                          <div class="form-outline form-white mb-4">
                            <input type="text" id="typeName" class="form-control form-control-lg" siez="17"
                              placeholder="Nome e Cognome" />
                            <label class="form-label" for="typeName">Nome e Cognome Intestatario Carta</label>
                          </div>

                          <div class="form-outline form-white mb-4">
                            <input type="text" id="typeText" class="form-control form-control-lg" siez="17"
                              placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                            <label class="form-label" for="typeText">Numero della Carta</label>
                          </div>

                          <div class="row mb-4">
                            <div class="col-md-6">
                              <div class="form-outline form-white">
                                <input type="text" id="typeExp" class="form-control form-control-lg"
                                  placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" />
                                <label class="form-label" for="typeExp">Data di Scadenza</label>
                              </div>
                            </div>
                            <div class="col-md-6">
                              <div class="form-outline form-white">
                                <input type="password" id="typeText" class="form-control form-control-lg"
                                  placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                <label class="form-label" for="typeText">Cvv</label>
                              </div>
                            </div>
                          </div>

                        </form>

                        <hr class="my-4">

                        <div class="d-flex justify-content-between">
                          <p class="mb-2">Subtotale</p>
                          <p class="mb-2">{{ subtotale.toFixed(2) }}€</p>
                        </div>

                        <div class="d-flex justify-content-between">
                          <p class="mb-2">Spedizione</p>
                          <p class="mb-2">20.00€</p>
                        </div>

                        <div class="d-flex justify-content-between mb-4">
                          <p class="mb-2">Totale(Incl. spedizione)</p>
                          <p class="mb-2">{{ totale.toFixed(2) }}€</p>
                        </div>
                        <button @click="creaOrdine" type="button" class="btn btn-warning btn-block btn-lg">Ordina</button>
                      
                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="empty" v-else>
  <h2>Nessun Articolo Aggiunto A Carrello</h2>
  </div>
</template>
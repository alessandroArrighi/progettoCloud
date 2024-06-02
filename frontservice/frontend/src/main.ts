import { createApp } from 'vue'
import { createRouter, createWebHistory, Router } from 'vue-router'
import App from './App.vue'
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'

import Home from './pages/Home.vue'
import Vista from './pages/products/Vista.vue'
import VistaSpec from './pages/products/VistaSpec.vue'
import LAC from './pages/products/LAC.vue'
import Accesso from './pages/Accesso.vue'
import AreaPersonale from './pages/AreaPersonale.vue'
import CreaOrdine from './pages/CreaOrdine.vue'                     
import OrdiniUtente from './pages/OrdiniUtente.vue'                 
import OperazioniProdotti from './pages/OperazioniProdotti.vue'
import OperazioniOrdini from './pages/OperazioniOrdini.vue'
import Anagrafica from './pages/Anagrafica.vue'
import NotFound from "./pages/NotFound.vue"
import LacSpec from './pages/products/LacSpec.vue'
import Sole from './pages/products/Sole.vue'
import SoleSpec from './pages/products/SoleSpec.vue'

const router: Router = createRouter({
    history: createWebHistory(),
    routes: [
        {path:"/", component: Home},
        {path:"/prodotti/tutti/vista/:categoria", component: Vista},
      //{path:"/prodotti/tutti/:categoria", component: Vista},
        {path:"/prodotti/:categoria-:idProdotto", component: VistaSpec},
        {path:"/prodotti/:categoria-:idProdotto", component: LacSpec},
        {path:"/prodotti/tutti/lac/:categoria", component: LAC},
        {path:"/prodotti/tutti/sole/:categoria", component: Sole},
        {path:"/prodotti/:categoria-:idProdotto", component: SoleSpec},
        //ricordarsi {path:"/lac/:idProdotto", component: },
        {path:"/accesso/:permesso", component: Accesso},
        {path:"/accesso/areaPersonale", component: AreaPersonale},
        {path:"/accesso/areaPersonale/creaOrdine", component: CreaOrdine},
        {path:"/accesso/areaPersonale/ordiniUtente", component: OrdiniUtente},
        {path:"/accesso/areaPersonale/operazioniProdotti", component: OperazioniProdotti},
        {path:"/accesso/areaPersonale/operazioniOrdini", component: OperazioniOrdini},
        {path:"/accesso/areaPersonale/operazioniOrdini/:IDOrdine", component: OperazioniOrdini},
        {path:"/accesso/areaPersonale/anagrafica", component: Anagrafica},
        {path: "/:pathMatch(.*)*", component: NotFound},
    ]
})

//axios.defaults.baseURL = process.env.GWT_URL

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://api-gateway-s4iwl2dcla-uc.a.run.app'

createApp(App).use(router).mount('#app')
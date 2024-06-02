<script lang="ts">
import { defineComponent, PropType } from "vue"
import { Ordine, User } from "../types"
import axios from "axios"

export default defineComponent({
    props: {
        user: {} as PropType<User>,
        ordine: Array as PropType<Ordine[]>,
    },
    methods: {
        async logout() {
            await axios.post("/api/auth/logout")
            window.location.href ="/"
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }
    }
})

</script>



<template>x
    <div id="section1" class="row pb-4">
        <div class="col-1 col-sm-1 col-md-1 col-xl-0 "></div>
        <nav class="col-10 col-sm-10 col-md-10 col-xl-12 navbar navbar-expand-xl py-3 border-bottom border-2 border-white">
            <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <RouterLink class="navbar-brand ps-5 pt-3 me-0 text-white" :to="'/'">
                <img src="/arrighi--medri-high-resolution-logo-transparent.png" width="100" height="60" alt="Logo" loading="lazy">
                <h1 class="d-inline fs-3 fw-bold">Arrighi & Medri</h1>
            </RouterLink>    
            <div class="collapse navbar-collapse justify-content-end fw-bold" id="navbarNavAltMarkup">
                <div class="navbar-nav pb-1 me-5">
                    <ul>
                        <li><RouterLink class="nav-link active text-white px-3 py-2 mt-2 me-2 fs-5" to = "/prodotti/tutti/vista/MontatureV">Occhiali da Vista</RouterLink></li>
                        <li><RouterLink class="nav-link active text-white px-3 py-2 mt-2 me-2 fs-5" to = "/prodotti/tutti/sole/MontatureS">Occhiali da Sole</RouterLink></li>
                        <li><RouterLink class="nav-link active text-white px-3 py-2 mt-2 me-2 fs-5" to = "/prodotti/tutti/lac/LACC">Lenti a Contatto</RouterLink></li>
                        <li v-if="!user"><RouterLink class="nav-link text-warning px-3 py-2 mt-2 me-2 fs-5" to = "/accesso/user">Accedi</RouterLink></li>
                        <li v-if="user">
                            <RouterLink class="nav-link text-warning px-3 py-2 mt-2 me-2 fs-5" to ="/accesso/areaPersonale">
                                <svg xmlns="http://www.w3.org/2000/svg"  width="50" height="30" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                        </RouterLink></li>
                        <li v-if="user">
                            <RouterLink class="nav-link text-warning px-3 py-2 mt-2 me-2 fs-5" to = "/accesso/areaPersonale/creaOrdine">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </RouterLink>
                        </li>
                        <li v-if="user">
                            <button class="nav-link text-warning px-3 py-2 mt-2 me-2 fs-5" @click="logout" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>                       
        </nav>
        <div class="col-1 col-sm-1 col-sm-1"></div>
    </div>
        <button type="button" @click="scrollToTop" id="scrollButton2" class = "btn border-0 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
            </svg>
        </button>                              
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'WrapAround',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
  data() {
    return {
      slide: 0,
      itemsToShow: 3.95,
      prodotti: [{img: '/1.avif', testo: 'Occhiali da Vista', categoria: 'MontatureV'}, {img: '/2.avif', testo: 'Occhiali da Sole', categoria: 'MontatureS'}, {img: '/4.avif', testo: 'Lenti a Contatto', categoria: 'LACC'}],
      vetrina: [{img: '/8.avif', modello: 'CCC07', categoria: 'Montature', testo: 'Occhiali in Saldo!'}, {img: '/4.avif', modello: 'CCC03', categoria: 'Montature', testo: 'Occhiali da sole -50%'}, {img: '/6.avif', modello: 'CCC05', categoria: 'Montature', testo: 'Occhiali in Saldo!'}, {img: '/a.avif', modello: 'AAA02', categoria: 'LAC', testo: 'Lenti a Contatto in Sconto!'}, {img: '/2.avif', modello: 'CCC03', categoria: 'Montature', testo: 'Occhiali in Saldo!'}]
    }
  },
  methods: {
    updateItemsToShow() {
      this.itemsToShow = window.innerWidth > 768 ? 3.95 : 1.5;
    },
  },
  mounted() {
    this.updateItemsToShow();

    window.addEventListener('resize', this.updateItemsToShow);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateItemsToShow);
  },
})
</script>


<template>
  <div class="home">
    <h2>Le Nostre Categorie</h2>
    <Carousel class="primary-carousel" :wrap-around="true">
      <Slide :key="slide" v-for = "prodotto in prodotti">  
        <div class="carousel__item">
          <img :src="prodotto.img" alt="">
          <RouterLink :to = "'/prodotti/tutti/vista/' + prodotto.categoria">{{ prodotto.testo }}</RouterLink>
          <Navigation class="custom-navigation"/>
        </div>
      </Slide>
    </Carousel>

    <h2>Le Nostre Offerte</h2>

    <Carousel class="secondary-carousel" :itemsToShow="itemsToShow" :wrap-around="true" :transition="500">
      
      <Slide :key="slide" v-for = "prodotto in vetrina">
        <div class="carousel__item">
          <img :src="prodotto.img">
          <RouterLink :to = "'/prodotti/' + prodotto.categoria + '-' + prodotto.modello">{{ prodotto.testo }}</RouterLink>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>
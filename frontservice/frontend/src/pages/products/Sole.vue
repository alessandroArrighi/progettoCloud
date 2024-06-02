<script lang = "ts">
    import { defineComponent } from 'vue';
    import Prodotto from '../../components/Prodotto.vue'

    export default defineComponent({
        components: {
            Prodotto
        }
    })
</script>

<template>
    <h1>Occhiali da sole</h1>
    <Prodotto/>
</template>
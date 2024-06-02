<script lang="ts">
import axios from "axios"
import { defineComponent } from "vue"
import { User, Ordine } from "./types"
import Navbar from "./components/Navbar.vue"
import FooterComp from "./components/Footer.vue"

export default defineComponent({
  data() {
    return {
      user: {} as User,
      ordine: [] as Ordine[],
      check: true
    }
  },
  provide() {
    return { user: this.user }
  },
  methods: {
    async getUser() {
      const res = await axios.get("/api/auth/getUser")
      this.user = res.data
    },
    async checkUser() {
      if(this.user) this.check = true
      else this.check = false
    }
  },
  mounted() {
    this.getUser()
    this.checkUser()
  },
  components: {
    Navbar,
    FooterComp
  }
})
</script>

<template>
    <div>
        <Navbar :user = "user"/>
        <RouterView :user="user" :ordine = "ordine"/>
        <FooterComp />
    </div>
</template>

<style lang="scss">
@import "./styles/style.scss";
</style>
<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
<script>
import NavBar from "./components/NavBar";
export default {
  components: {NavBar},
  created() {
    this.$store.dispatch('fetchUser');
  }
}
</script>
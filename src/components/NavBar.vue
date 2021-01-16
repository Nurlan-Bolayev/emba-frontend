<template>
  <v-app-bar app color="primary" dark>
    <router-link to="/">
      <div class="d-flex align-center">
        <v-img
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
        />

        <span style="color: white !important;">
          Store App
        </span>
      </div>
    </router-link>

    <v-spacer></v-spacer>

    <v-btn v-if="admin" text to="/admin/dashboard">
      {{ admin.name }}
    </v-btn>
    <v-btn v-else text to="/admin/login">
      Admin Login
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar",
  computed: {
    admin() {
      return this.$store.state.admin
    }
  },
}
</script>

<style scoped>

</style>
<template>
    <v-app-bar app color="primary" dark>
        <router-link to="/">
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
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

        <v-btn text to="/admin/login">
            Admin Login
        </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>
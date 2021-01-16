<template>
  <div>
    <h1 class="pa-4 text-center">
      Welcome, {{ admin && admin.name }}
    </h1>
    <div class="pa-6 d-flex justify-center">
      <v-btn color="primary" class="ma-4" to="/admin/categories">
        Categories
      </v-btn>
      <v-btn color="primary" class="ma-4" to="/admin/products">
        Products
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
    admin: function () {
      return this.$store.state.admin
    }
  },
}
</script>

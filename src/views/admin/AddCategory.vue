<template>
  <div class="d-flex flex-column align-center" style="width: 100%">
    <h1 class="mt-13">Add a category</h1>
    <v-form class="mt-16" style="width: 400px" @submit.prevent="saveCategory">
      <v-text-field
          v-model="body.name"
          label="Name"
          outlined
          :error-messages="errors.name"
      />
      <v-btn class="mt-2" color="primary" type="submit" :loading="isSaving">Add category</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: '',
      isSaving: false,
      errors: {},
      body: {
        name : '',
      },
    }
  },
  methods: {
    async saveCategory() {
      try {
        this.isSaving = true
        await axios.post('api/admin/categories/create', this.body);
        this.$router.push('/admin/categories');
      } catch (e) {
        this.errors = e.response?.data?.errors || {}
      } finally {
        this.isSaving = false;
      }
    }
  }
}
</script>

<style scoped>

</style>
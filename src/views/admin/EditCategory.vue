<template>
  <div class="d-flex flex-column align-center" style="width: 100%">
    <h1 class="mt-13">Edit category</h1>
    <v-form class="mt-10" style="width: 400px" @submit.prevent="saveCategory">
      <v-progress-linear v-show="isLoading" class="my-1" indeterminate/>
      <v-text-field
          v-model="body.name"
          label="Name"
          outlined
          :error-messages="errors.name"
      />
      <v-btn class="mt-2" color="primary" type="submit" :loading="isSaving">Save</v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      body: {
        name: '',
      },
      isSaving: false,
      isLoading: false,
      errors: {},
    }
  },
  methods: {
    async saveCategory() {
      try {
        this.isSaving = true;
        await axios.put(`api/admin/categories/${this.$route.params.id}`, this.body);
        this.errors = {};
      } catch (e) {
        this.errors = e.response?.data?.errors;
      } finally {
        this.isSaving = false;
      }
    },
  },
  async mounted() {
    try {
      this.isLoading = true
      const res = await axios.get(`api/admin/categories/${this.$route.params.id}`);
      this.body = res.data;
    } finally {
      this.isLoading = false
    }
  }
}
</script>

<style scoped>

</style>
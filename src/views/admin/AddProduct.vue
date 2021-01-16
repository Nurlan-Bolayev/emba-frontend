<template>
  <form class="d-flex justify-center pa-5" @submit.prevent="submit">
    <v-card style="width: 50%">
      <v-card-title>
        New product
      </v-card-title>
      <v-card-text>
        <v-select outlined
                  v-model="body.category_id"
                  :items="categories"
                  label="Category"
                  item-text="name"
                  item-value="id"
                  :loading="isCategoryLoading"
                  :error-messages="errors.category_id"
        ></v-select>
        <v-text-field v-model="body.name"
                      label="Name"
                      outlined
                      :error-messages="errors.name"
        />
        <v-textarea v-model="body.description"
                    label="Description"
                    outlined
                    :error-messages="errors.description"
        />
        <v-btn color="primary" type="submit" :loading="isAdding">
          Add Product
        </v-btn>
      </v-card-text>
    </v-card>
  </form>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      isAdding: false,
      body: {
        name: '',
        description: '',
        category_id: null,
      },
      isCategoryLoading: false,
      categories: [],
      errors : [],
    }
  },
  methods: {
    async submit() {
      this.isAdding = true;
      try {
        await axios.post('api/admin/products/create', this.body);
      } catch (e){
        this.errors = e.response?.data?.errors || [];
      }finally {
       this.isAdding = false;
      }
    },
  },
  async mounted() {
    this.isCategoryLoading = true;
    const res = await axios.get('api/admin/categories');
    this.categories = res.data;
    this.isCategoryLoading = false;
  }
}
</script>

<style scoped>

</style>
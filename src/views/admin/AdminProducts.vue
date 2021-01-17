<template>
  <div>
    <div class="d-flex justify-center align-center">
      <h1 class="pa-4 text-center">
        Products
      </h1>
      <v-btn
          to="/admin/products/new"
          fab
          small
          dark
          color="primary"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    <v-data-table
        :headers="headers"
        :items="products"
        :loading="isLoading"
        sort-by="updated_at"
        sort-desc
        class="elevation-4 mx-10 mb-5"
    >
      <template v-slot:item.action="{ item }">
        <div class="d-flex align-center justify-space-between">
          <v-btn class="mr-1" :to="`/admin/products/${item.id}`" color="success">
            <v-icon left>
              mdi-pencil
            </v-icon>
            Edit
          </v-btn>
          <v-btn :loading="productToBeDeleted === item.id" @click="deleteProduct(item.id);" color="error" depressed>
            Delete
          </v-btn>
        </div>
      </template>

      <template v-slot:item.description="{ value }">
        <span :title="value">{{ value.length > 80 ? value.substr(0, 80) + '...' : value }}</span>
      </template>
      <template v-slot:item.updated_at="{value}">
        {{ new Date(value).toDateString() }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      headers: [
        {text: 'ID', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Description', value: 'description'},
        {text: 'Price', value: 'price'},
        {text: 'Creator', value: 'creator.name'},
        {text: 'Category', value: 'category.name'},
        {text: 'Last-update', value: 'updated_at'},
        {text: 'Actions', value: 'action'},
      ],
      products: [],
      isLoading: false,
      productToBeDeleted: null,
    }
  },
  methods: {
    async deleteProduct(id) {
      if (!confirm('Are you sure?')) {
        return
      }

      try {
        this.productToBeDeleted = id
        await axios.delete(`api/admin/products/${id}`);
        this.products = this.products.filter(prod => prod.id !== id);
      } finally {
        this.productToBeDeleted = null
      }
    }
  },

  async mounted() {
    this.isLoading = true
    const res = await axios.get('api/admin/products');
    this.products = res.data;
    this.isLoading = false;
  }
}
</script>

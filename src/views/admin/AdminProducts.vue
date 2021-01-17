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
        class="elevation-4 mx-10 mb-5"
    >
      <template v-slot:item.action="{ item }">
        <v-btn icon :to="`/admin/products/${item.id}`">
          <v-icon>
            $edit
          </v-icon>
        </v-btn>
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
        {text: 'Creator', value: 'creator.name'},
        {text: 'Category', value: 'category.name'},
        {text: 'Last-update', value: 'updated_at'},
        {text: 'Actions', value: 'action'},
      ],
      products: [],
      isLoading: false,
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

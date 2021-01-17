<template>
  <div>
    <h1 class="pa-4 text-center">
      Categories
      <v-btn
          to="/admin/categories/new"
          class="mx-2"
          fab
          dark
          color="primary"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </h1>
    <v-data-table
        :headers="headers"
        :items="categories"
        :loading="isLoading"
        class="elevation-4 mx-10 mb-5"
    >
      <template v-slot:item.action="{ item }">
        <v-btn class="mr-3" small :to="`/admin/categories/${item.id}`" color="success">
          <v-icon left small>
            mdi-pencil
          </v-icon>
          Edit
        </v-btn>

        <v-btn :loading="categoryBeingDeleted === item.id" @click="deleteCategory(item.id)"
               color="error"
               depressed
               small
        >
          Delete
        </v-btn>
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
        {text: 'Creator', value: 'creator.name'},
        {text: 'Last-update', value: 'updated_at'},
        {text: 'Actions', value: 'action'},
      ],
      categories: [],
      isLoading: false,
      categoryBeingDeleted: null,
    }
  },
  methods: {
    async deleteCategory(id) {
      try {
        this.categoryBeingDeleted = id
        await axios.delete(`api/admin/categories/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
      } finally {
        this.categoryBeingDeleted = null;
      }
    }
  },

  async mounted() {
    this.isLoading = true
    const res = await axios.get('api/admin/categories');
    this.categories = res.data;
    this.isLoading = false;
  }
}
</script>

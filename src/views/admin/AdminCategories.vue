<template>
  <div>
    <h1 class="pa-4 text-center">
      Categories
    </h1>

    <v-data-table
        :headers="headers"
        :items="categories"
        :loading="isLoading"
        class="elevation-4 mx-10 mb-5"
    >
      <template v-slot:item.action="{ item }">
        <v-btn icon :to="`admin/categories/${item.id}`">
          <v-icon>
            $edit
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.updated_at="{value}">
        {{new Date(value).toDateString()}}
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

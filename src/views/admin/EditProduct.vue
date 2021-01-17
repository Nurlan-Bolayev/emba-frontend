<template>
  <div class="d-flex justify-center ma-10">
    <v-form style="width: 40%" :disabled="isFetchingProduct" @submit.prevent="editProduct">
      <h2 class="mb-3">Edit product</h2>
      <v-progress-linear v-if="isFetchingProduct" indeterminate class="my-2"/>
      <v-text-field v-model="body.name"
                    label="Name"
                    outlined
                    :error-messages="errors.name"
      />
      <v-text-field v-model="body.price"
                    placeholder="Price"
                    outlined
                    :error-messages="errors.price"
      />
      <v-textarea v-model="body.description"
                  label="Description"
                  outlined
                  :error-messages="errors.description"
      />
      <v-btn type="submit" color="primary" depressed :loading="isEditing">Save</v-btn>
    </v-form>

    <div class="ml-7" style="width: 40%">
      <h2 class="mb-5">
        Images
      </h2>
      <div v-if="body.images.length" class="d-flex flex-wrap mb-5">
        <v-card class="ma-1" v-for="img in body.images" :key="img.id">
          <v-img class="image" aspect-ratio="1" width="200" height="200" :src="getPath(img)">
            <v-app-bar class="image-toolbar" :class="imagesBeingDeleted.includes(img.id) ? 'force-visible' : ''" flat>
              <v-spacer/>

              <v-btn color="white" icon target="_blank" :href="getPath(img)">
                <v-icon>mdi-open-in-new</v-icon>
              </v-btn>

              <v-btn color="white" icon @click="deleteImage(img.id)" :loading="imagesBeingDeleted.includes(img.id)">
                <v-icon>$delete</v-icon>
              </v-btn>
            </v-app-bar>
          </v-img>
        </v-card>
      </div>
      <div class="text-center mb-5" v-else>
        <span class="text-body-1">No images. Upload a new image below</span>
      </div>

      <v-form>
        <v-file-input v-model="file"
                      accept="image/*"
                      outlined
                      placeholder="Select image"
                      prepend-icon="mdi-camera"
                      truncate-length="100"
                      :error-messages="errors.image"
        ></v-file-input>
        <v-btn color="primary" :loading="isAddingImage" :disabled="!file" @click="addImage">
          Upload
        </v-btn>
      </v-form>
    </div>

  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      isEditing: false,
      isFetchingProduct: false,
      isAddingImage: false,
      body: {
        name: '',
        price: 0,
        description: '',
        images: [],
      },
      file: null,
      errors: {},
      imagesBeingDeleted: [],
    }
  },

  methods: {
    async fetchProduct() {
      this.isFetchingProduct = true
      try {
        const res = await axios.get(`api/admin/products/${this.$route.params.id}`);
        this.body = res.data
      } finally {
        this.isFetchingProduct = false
      }
    },

    async editProduct() {
      try {
        this.isEditing = true
        let images = this.body.images;
        const res = await axios.put(`api/admin/products/${this.$route.params.id}`, this.body);
        this.body = res.data;
        this.body.images = images;
        this.errors = {}
      } catch (e) {
        this.errors = e.response?.data?.errors || {}
      } finally {
        this.isEditing = false
      }
    },

    async addImage() {
      try {
        this.isAddingImage = true

        const formData = new FormData();
        formData.set('image', this.file);
        const res = await axios.post(`api/admin/products/${this.$route.params.id}/add-image`, formData);
        this.body.images.push(res.data)
        this.errors = {}
        this.file = null
      } catch (e) {
        this.errors = e.response?.data?.errors || {}
      } finally {
        this.isAddingImage = false
      }
    },
    async deleteImage(id) {
      try {
        this.imagesBeingDeleted.push(id)
        await axios.delete(`api/admin/images/${id}`);
        this.body.images = this.body.images.filter(img => img.id !== id);
      } finally {
        this.imagesBeingDeleted = this.imagesBeingDeleted.filter(imgId => imgId !== id)
      }
    },

    getPath(img) {
      return `http://localhost:8000/storage/${img.path}`
    }
  },

  created() {
    this.fetchProduct();
  }
}
</script>

<style scoped>
.image-toolbar {
  opacity: 0;
  transition: opacity .37s;
  background: linear-gradient(rgba(0, 0, 0, 0.5), transparent) !important;
}

.force-visible {
  opacity: 1;
}

.image:hover .image-toolbar {
  opacity: 1;
}
</style>
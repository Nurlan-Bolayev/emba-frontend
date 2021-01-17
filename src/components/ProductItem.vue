<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <v-carousel
          class="rounded"
          height="200"
          cycle
          hide-delimiters
          show-arrows-on-hover
          :show-arrows="images.length === 1 ? false : undefined"
      >
        <v-carousel-item v-for="img in images" :key="img.id" :src="getUrl(img)"/>
      </v-carousel>
      <div>
        <h2 class="title">
          {{ product.name }}
        </h2>

        <h3 class="subtitle-2 text--secondary">
          {{ product.category.name }}
        </h3>
        <v-rating readonly small dense background-color="orange" color="orange" :value="3.5"></v-rating>
      </div>

      <v-spacer/>

      <span class="title">₼{{ product.price }}</span>
    </v-card-title>

    <v-card-text>
      {{ product.description }}
    </v-card-text>

    <v-spacer/>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions>
      <v-btn
          :to="`/products/${product.id}`"
          block
          class="white--text"
          color="deep-purple accent-4"
      >
        View
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    }
  },

  computed: {
    images() {
      if (!this.product.images.length) {
        return [{
          id: -1,
          url: 'https://i.stack.imgur.com/y9DpT.jpg',
        }]
      }
      return this.product.images
    },
  },

  methods: {
    getUrl(img) {
      return img.url || `http://localhost:8000/storage/${img.path}`
    },
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="home pa-9">
    <h1 class="text-center mb-5">Our products</h1>

    <div class="d-flex flex-wrap">
      <ProductItem v-for="product in products" :product="product"
                   :key="product.id"
                   class="ma-2"
      />
    </div>
  </div>
</template>

<script>
import axios from '@/axios'
import ProductItem from "@/components/ProductItem";

export default {
  components: {ProductItem},
  data() {
    return {
      products: [],
    }
  },
  async mounted() {
    const res = await axios.get('api/products');
    this.products = res.data
  }
}
</script>

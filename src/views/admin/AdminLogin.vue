<template>
  <div class="d-flex justify-center pa-6">
    <v-form @submit.prevent="login">
      <v-card min-width="400">
        <v-card-title>
          Admin Login
        </v-card-title>

        <v-card-text>
          <v-text-field
              v-model="credentials.email"
              label="Email"
              type="email"
              name="email"
              outlined
              :error-messages="errors.email"
          />
          <v-text-field
              v-model="credentials.password"
              label="Email"
              type="password"
              name="password"
              outlined
              :error-messages="errors.password"
          />
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" type="submit" :loading="isLoggingIn">
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import axios from '@/axios'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
      },
      isLoggingIn: false,
      errors: {},
    }
  },
  methods: {
    async login() {
      try {
        this.isLoggingIn = true
        const res = await axios.post('api/admin/login', this.credentials)

      } catch (e) {
        this.errors = e.response?.data?.errors || {};
      } finally {
        this.isLoggingIn = false
      }
    }
  },
}
</script>

<style scoped>
.logo {
  margin-top: -120px;
  margin-left: 80px;
  height: 80px;
  text-align: center;
  padding-top: 25px;
}
</style>
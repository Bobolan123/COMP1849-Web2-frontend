<script setup lang="ts">
import { ref } from 'vue'
import { Form, Input, Button, message } from 'ant-design-vue'
import router from '@/router';

// Form data for login
const form = ref({
  email: '',
  password: '',
})

// Handle form submission
const submitForm = async () => {
  if (!form.value.email || !form.value.password) {
    message.error('Please fill in both email and password')
    return
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password,
      }),
    })

    const result = await response.json()
    if (result.success) {
      message.success('Login successful!')
      localStorage.setItem('jwt',result?.token)
      router.push('/')
      form.value.email = ''
      form.value.password = ''
    } else {
      throw new Error(result.message || 'Login failed')
    }
  } catch (error: any) {
    message.error(error.message || 'An error occurred')
    console.error(error)
  }
}
</script>

<template>
  <div class="flex min-h-screen overflow-hidden">
    <!-- Left Side Image -->
    <div
      class="flex-1 bg-bottom h-full"
      style="background-image: url('public/images.jpg'); background-size: cover"
    ></div>

    <!-- Right Side Login Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-white h-full">
      <div class="max-w-md w-full">
        <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
        <a-form @submit.prevent="submitForm" layout="vertical">
          <!-- Email Input -->
          <a-form-item label="Email" required>
            <a-input
              v-model:value="form.email"
              placeholder="Enter your email"
            />
          </a-form-item>

          <!-- Password Input -->
          <a-form-item label="Password" required>
            <a-input
              v-model:value="form.password"
              type="password"
              placeholder="Enter your password"
            />
            <RouterLink
            to="/register"
            class="text-sm font-semibold leading-6 text-blue-900 flex justify-end mt-1"
            >Register now 
          </RouterLink>
          </a-form-item>
          

          <!-- Submit Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" class="w-full">
              Login
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Set full screen height and remove scroll */
.min-h-screen {
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
}
</style>

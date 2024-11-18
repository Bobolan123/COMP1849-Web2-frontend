<script setup lang="ts">
import { ref } from 'vue'
import { Form, Input, Button, message } from 'ant-design-vue'
import router from '@/router';

// Form data for registration
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// Handle form submission for registration
const submitRegisterForm = async () => {
  if (
    !registerForm.value.username ||
    !registerForm.value.email ||
    !registerForm.value.password ||
    !registerForm.value.confirmPassword
  ) {
    message.error('Please fill in all required fields')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    message.error('Passwords do not match')
    return
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: registerForm.value.username,
        email: registerForm.value.email,
        password: registerForm.value.password,
      }),
    })

    const result = await response.json()
    if (result.success) {
      message.success('Registration successful! Please log in.')
      router.push('/login')

      registerForm.value.username = ''
      registerForm.value.email = ''
      registerForm.value.password = ''
      registerForm.value.confirmPassword = ''
    } else {
      throw new Error(result.message || 'Registration failed')
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

    <!-- Right Side Registration Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-white h-full">
      <div class="max-w-md w-full">
        <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
        <a-form @submit.prevent="submitRegisterForm" layout="vertical">
          <!-- Username Input -->
          <a-form-item label="Username" required>
            <a-input
              v-model:value="registerForm.username"
              placeholder="Enter your username"
            />
          </a-form-item>

          <!-- Email Input -->
          <a-form-item label="Email" required>
            <a-input
              v-model:value="registerForm.email"
              type="email"
              placeholder="Enter your email"
            />
          </a-form-item>

          <!-- Password Input -->
          <a-form-item label="Password" required>
            <a-input
              v-model:value="registerForm.password"
              type="password"
              placeholder="Enter your password"
            />
          </a-form-item>

          <!-- Confirm Password Input -->
          <a-form-item label="Confirm Password" required>
            <a-input
              v-model:value="registerForm.confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />
          </a-form-item>

          <!-- Submit Button -->
          <a-form-item>
            <a-button type="primary" html-type="submit" class="w-full">
              Register
            </a-button>
          </a-form-item>

          <RouterLink
            to="/login"
            class="text-sm font-semibold leading-6 text-blue-900 flex justify-end mt-1"
          >
            Already have an account? Log in
          </RouterLink>
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

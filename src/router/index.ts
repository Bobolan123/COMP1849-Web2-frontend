import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateProductView from '../views/CreateProductView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { message } from 'ant-design-vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/create-product',
      name: 'createProduct',
      component: CreateProductView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

router.beforeEach(async (to, from) => {
  if (
    // make sure the user is authenticated
    !localStorage.getItem('jwt') &&
    // ❗️ Avoid an infinite redirect
    to.name !== 'login' && to.name !== 'register'
  ) {
    message.error('You need to login first')
    // redirect the user to the login page
    return { name: 'login' }
  } else  if (
    localStorage.getItem('jwt') &&
    (to.name === 'login' || to.name === 'register')
  ) {
    message.error('You already login')
    return router.push('/')
  }
})

export default router

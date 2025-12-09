import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Tasks from '../views/Tasks.vue'
import { useAuthStore } from '../stores/auth'
import Register from '../views/Register.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Tasks,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ AUTH GUARD
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const token = auth.token

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' })  // ✅ যদি login না থাকে → login page
  } else if (to.name === 'Login' && token) {
    next({ name: 'Home' })   // ✅ already login থাকলে → home
  } else {
    next()
  }
})

export default router

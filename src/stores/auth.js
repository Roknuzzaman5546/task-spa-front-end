import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: null
  }),

  actions: {
    async login(data) {
      const res = await axios.post('http://127.0.0.1:8000/api/login', data)

      this.token = res.data.token
      localStorage.setItem('token', this.token)

      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },

    logout() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }
})

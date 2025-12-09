import { defineStore } from 'pinia'
import axios from 'axios'
import { useAuthStore } from './auth'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    editingTask: null
  }),

  actions: {
    // ✅ Load All Tasks
    async fetch() {
      const auth = useAuthStore()

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${auth.token}`

      const res = await axios.get('http://127.0.0.1:8000/api/tasks')
      this.tasks = res.data
    },

    // ✅ Create Task
    async create(data) {
      const auth = useAuthStore()

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${auth.token}`

      await axios.post('http://127.0.0.1:8000/api/tasks', data)
      await this.fetch()
    },

    // ✅ Update Task
    async update(id, data) {
      const auth = useAuthStore()

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${auth.token}`

      await axios.put(`http://127.0.0.1:8000/api/tasks/${id}`, data)
      this.editingTask = null
      await this.fetch()
    },

    // ✅ Delete Task
    async delete(id) {
      const auth = useAuthStore()

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${auth.token}`

      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`)
      await this.fetch()
    },

    // ✅ Select for Edit
    setEdit(task) {
      this.editingTask = task
    }
  }
})

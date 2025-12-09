<template>
  <div class="task-form-container">
    <div class="form-header">
      <h3>{{ editing ? 'Update Task' : 'Create New Task' }}</h3>
      <p v-if="!editing" class="form-subtitle">Add a new task to your list</p>
    </div>

    <form @submit.prevent="submit" class="task-form">
      <div class="form-group">
        <label>Task Title *</label>
        <input 
          v-model="form.title" 
          type="text"
          placeholder="What needs to be done?" 
          class="form-input"
          required 
        />
      </div>

      <div class="form-group">
        <label>Description</label>
        <textarea 
          v-model="form.description" 
          placeholder="Add more details about your task..."
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label>Status</label>
          <select v-model="form.status" class="form-select">
            <option value="pending"> Pending</option>
            <option value="in_progress"> In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div class="form-group">
          <label>Due Date</label>
          <input 
            type="date" 
            v-model="form.due_date"
            class="form-input"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ editing ? ' Update Task' : 'Create Task' }}
        </button>
        <button v-if="editing" type="button" @click="cancel" class="btn btn-secondary">
          ✕ Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue'
import { useTaskStore } from '../stores/tasks'

const store = useTaskStore()

const form = reactive({
  title: '',
  description: '',
  status: 'pending',
  due_date: ''
})

const editing = computed(() => store.editingTask)

watch(editing, (task) => {
  if (task) {
    form.title = task.title
    form.description = task.description
    form.status = task.status
    form.due_date = task.due_date
  }
})

const submit = async () => {
  if (!form.title) return alert('Title is required')

  if (editing.value) {
    await store.update(editing.value.id, form)
  } else {
    await store.create(form)
  }

  reset()
}

const cancel = () => {
  store.editingTask = null
  reset()
}

const reset = () => {
  form.title = ''
  form.description = ''
  form.status = 'pending'
  form.due_date = ''
}
</script>

<style scoped>
.task-form-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 30px;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  color: white;
}

.form-header h3 {
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 8px;
  color: white;
}

.form-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.9);
}

.form-input,
.form-textarea,
.form-select {
  padding: 12px 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: white;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2);
  background: white;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>
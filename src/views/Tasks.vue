<template>
  <div class="tasks-container">
    <!-- Header -->
    <div class="tasks-header">
      <div class="header-left">
        <h1>My Tasks</h1>
        <p class="header-subtitle">{{ tasks.length }} total tasks</p>
      </div>
      <button @click="logout" class="btn-logout">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m7 14l5-5-5-5m5 5H9"></path>
        </svg>
        Logout
      </button>
    </div>

    <!-- Task Form -->
    <TaskForm />

    <!-- Tasks List -->
    <div class="tasks-list-wrapper">
      <div v-if="tasks.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
      </div>

      <ul v-else class="tasks-list">
        <li v-for="t in tasks" :key="t.id" class="task-item" :class="`status-${t.status}`">
          <div class="task-content">
            <div class="task-header">
              <h3 class="task-title">{{ t.title }}</h3>
              <span class="status-badge" :class="`badge-${t.status}`">
                {{ getStatusEmoji(t.status) }} {{ formatStatus(t.status) }}
              </span>
            </div>
            
            <p v-if="t.description" class="task-description">{{ t.description }}</p>
            
            <div class="task-meta">
              <span v-if="t.due_date" class="due-date">
                {{ formatDate(t.due_date) }}
              </span>
            </div>
          </div>

          <div class="task-actions">
            <button @click="edit(t)" class="btn-action btn-edit" title="Edit task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button @click="remove(t.id)" class="btn-action btn-delete" title="Delete task">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import { useAuthStore } from '../stores/auth'
import TaskForm from './TaskForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useTaskStore()
const auth = useAuthStore()

const tasks = computed(() => store.tasks)

onMounted(async () => {
  await store.fetch()
})

const edit = (task) => {
  store.setEdit(task)
  // Scroll to form
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const remove = async (id) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await store.delete(id)
  }
}

const logout = async () => {
  if (confirm('Are you sure you want to logout?')) {
    await auth.logout()
    router.push('/login')
  }
}

const formatStatus = (status) => {
  const statusMap = {
    'pending': 'Pending',
    'in_progress': 'In Progress',
    'done': 'Done'
  }
  return statusMap[status] || status
}

const getStatusEmoji = (status) => {
  const emojiMap = {
    'pending': '',
    'in_progress': '',
    'done': ''
  }
  return emojiMap[status] || '•'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.tasks-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 30px 20px;
}

/* Header */
.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 25px 30px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  flex-wrap: wrap;
  gap: 15px;
}

.header-left h1 {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 5px 0;
  color: #1a1a1a;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  font-size: 13px;
  color: #999;
  margin: 0;
  font-weight: 500;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-logout svg {
  width: 18px;
  height: 18px;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.btn-logout:active {
  transform: translateY(0);
}

/* Tasks List Wrapper */
.tasks-list-wrapper {
  max-width: 800px;
  margin: 0 auto;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 20px;
}

.empty-icon svg {
  width: 40px;
  height: 40px;
}

.empty-state h3 {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 10px 0;
}

.empty-state p {
  font-size: 14px;
  color: #999;
  margin: 0;
}

/* Tasks List */
.tasks-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid #ddd;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.task-item:hover {
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.task-item.status-pending {
  border-left-color: #f59e0b;
}

.task-item.status-in_progress {
  border-left-color: #3b82f6;
}

.task-item.status-done {
  border-left-color: #10b981;
}

/* Task Content */
.task-content {
  flex: 1;
  min-width: 0;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
}

.task-title {
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  word-break: break-word;
}

.status-badge {
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 20px;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.badge-pending {
  background: #fef3c7;
  color: #92400e;
}

.badge-in_progress {
  background: #dbeafe;
  color: #0c2d6b;
}

.badge-done {
  background: #d1fae5;
  color: #065f46;
}

.task-description {
  font-size: 13px;
  color: #666;
  margin: 8px 0;
  line-height: 1.4;
}

.task-meta {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.due-date {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Task Actions */
.task-actions {
  display: flex;
  gap: 8px;
  margin-left: 16px;
  align-self: center;
  flex-shrink: 0;
}

.btn-action {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.btn-action svg {
  width: 18px;
  height: 18px;
}

.btn-edit {
  background: #3b82f6;
}

.btn-edit:hover {
  background: #2563eb;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.btn-delete {
  background: #ef4444;
}

.btn-delete:hover {
  background: #dc2626;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

.btn-action:active {
  transform: scale(0.95);
}

/* Responsive Design */
@media (max-width: 768px) {
  .tasks-container {
    padding: 20px 15px;
  }

  .tasks-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .btn-logout {
    width: 100%;
    justify-content: center;
  }

  .task-item {
    flex-direction: column;
    gap: 16px;
  }

  .task-actions {
    margin-left: 0;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #f0f0f0;
  }

  .task-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-badge {
    align-self: flex-start;
  }

  .header-left h1 {
    font-size: 24px;
  }
}

@media (max-width: 480px) {
  .tasks-container {
    padding: 15px 10px;
  }

  .tasks-header {
    padding: 15px 20px;
  }

  .header-left h1 {
    font-size: 20px;
  }

  .task-item {
    padding: 15px;
  }

  .task-title {
    font-size: 14px;
  }

  .task-description {
    font-size: 12px;
  }

  .empty-state {
    padding: 40px 20px;
  }

  .empty-icon {
    width: 60px;
    height: 60px;
  }

  .empty-icon svg {
    width: 30px;
    height: 30px;
  }
}
</style>
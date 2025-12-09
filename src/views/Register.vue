<template>
  <div class="auth-container">
    <div class="auth-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 1v22m11-11H1"></path>
          </svg>
        </div>
        <h1>Create Account</h1>
        <p>Join us and organize your tasks efficiently</p>
      </div>

      <form @submit.prevent="register" class="auth-form">
        <div class="form-group">
          <label>Full Name</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
            </svg>
            <input v-model="form.name" placeholder="John Doe" required />
          </div>
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input v-model="form.email" type="email" placeholder="your@email.com" required />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1C6.48 1 2 4.58 2 9v10c0 4.42 4.48 8 10 8s10-3.58 10-8V9c0-4.42-4.48-8-10-8zm-1 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"></path>
            </svg>
            <input v-model="form.password" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <div class="form-group">
          <label>Confirm Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1C6.48 1 2 4.58 2 9v10c0 4.42 4.48 8 10 8s10-3.58 10-8V9c0-4.42-4.48-8-10-8zm-1 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"></path>
            </svg>
            <input v-model="form.password_confirmation" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <button type="submit" class="auth-btn">Create Account</button>
      </form>

      <div class="auth-footer">
        <p>Already have an account? <router-link to="/login">Sign In</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const register = async () => {
  try {
    await axios.post('http://127.0.0.1:8000/api/register', form)
    alert('Registration successful! Please login.')
    router.push('/login')
  } catch (e) {
    alert(e.response.data.message || 'Registration failed')
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
  padding: 20px;
}

.auth-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.blob {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  filter: blur(40px);
}

.blob-1 {
  width: 300px;
  height: 300px;
  top: -100px;
  right: -100px;
  animation: blob 8s infinite;
}

.blob-2 {
  width: 250px;
  height: 250px;
  bottom: -50px;
  left: -50px;
  animation: blob 8s infinite reverse;
}

@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(20px, -30px) scale(1.1); }
  50% { transform: translate(-20px, 20px) scale(0.9); }
  75% { transform: translate(30px, 10px) scale(1.05); }
}

.auth-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin: 0 auto 15px;
}

.auth-icon svg {
  width: 30px;
  height: 30px;
}

.auth-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.auth-header p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: #999;
  pointer-events: none;
}

.form-group input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.auth-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.auth-footer {
  text-align: center;
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.auth-footer p {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.auth-footer a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.auth-footer a:hover {
  color: #764ba2;
}
</style>
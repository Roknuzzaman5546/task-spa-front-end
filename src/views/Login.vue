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
        <h1>Welcome Back</h1>
        <p>Enter your credentials to access your tasks</p>
      </div>

      <form @submit.prevent="doLogin" class="auth-form">
        <div class="form-group">
          <label>Email Address</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <input v-model="email" type="email" placeholder="your@email.com" required />
          </div>
        </div>

        <div class="form-group">
          <label>Password</label>
          <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 1C6.48 1 2 4.58 2 9v10c0 4.42 4.48 8 10 8s10-3.58 10-8V9c0-4.42-4.48-8-10-8zm-1 15h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"></path>
            </svg>
            <input v-model="password" type="password" placeholder="••••••••" required />
          </div>
        </div>

        <button type="submit" :disabled="loading" class="auth-btn">
          <span v-if="!loading">Sign In</span>
          <span v-else class="btn-loading">
            <span class="spinner"></span> Logging in...
          </span>
        </button>
      </form>

      <p v-if="error" class="error-message">
        <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
        </svg>
        {{ error }}
      </p>

      <div class="auth-footer">
        <p>Don't have an account? <router-link to="/register">Sign Up</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref(null);
const loading = ref(false);

const doLogin = async () => {
  error.value = null;
  loading.value = true;
  try {
    await auth.login({ email: email.value, password: password.value });
    router.push({ name: 'Home' }).catch(() => {});
  } catch (e) {
    if (e?.response?.data?.message) error.value = e.response.data.message;
    else if (e?.response?.data?.errors) {
      const errs = e.response.data.errors;
      error.value = Object.values(errs).flat().join(' ');
    } else error.value = 'Login failed. Check credentials or server.';
  } finally {
    loading.value = false;
  }
};
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
  margin-bottom: 20px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.auth-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.auth-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}

.error-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
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
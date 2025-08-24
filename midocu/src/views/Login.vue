<template>
  <div class="container mt-5" style="max-width: 400px;">
    <h2 class="mb-4 text-center">Iniciar sesión</h2>
    <form @submit.prevent="login" novalidate>
      <div class="mb-3">
        <label for="user" class="form-label">Usuario</label>
        <input 
          id="user" 
          v-model="user" 
          type="text" 
          class="form-control" 
          placeholder="Ingresa tu usuario" 
          required
          autofocus
        />
      </div>
      <div class="mb-3">
        <label for="pass" class="form-label">Contraseña</label>
        <input 
          id="pass" 
          v-model="password" 
          type="password" 
          class="form-control" 
          placeholder="Contraseña" 
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Iniciar sesión
      </button>
    </form>

    <div class="mt-3">
      <div v-if="errorMsg" class="alert alert-danger" role="alert">
        {{ errorMsg }}
      </div>
      <div v-if="successMsg" class="alert alert-success" role="alert">
        {{ successMsg }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const user = ref('');
const password = ref('');
const loading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const router = useRouter();

const login = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  loading.value = true;

  if (!user.value || !password.value) {
    errorMsg.value = 'Por favor, ingresa tu usuario y contraseña.';
    loading.value = false;
    return;
  }
  
  // Create a JavaScript object with the login data
  const loginData = {
    usuario: user.value,
    password: password.value
  };

  try {
    const response = await fetch('/api/api_login.php', {
      method: 'POST',
      headers: {
        // The key is to set this header to 'application/json'
        'Content-Type': 'application/json'
      },
      // Convert the JavaScript object to a JSON string
      body: JSON.stringify(loginData)
    });

    const data = await response.json();
    
    if (response.ok && data.estado) {
      localStorage.setItem('jwt_token', data.token);
      successMsg.value = 'Inicio de sesión exitoso. Redirigiendo...';
      
      setTimeout(() => {
        router.push({ name: 'home' });
      }, 1500);

    } else {
      // The API now returns a 'mensaje' key for errors
      errorMsg.value = data.mensaje || 'Error al iniciar sesión.';
    }
    
  } catch (err) {
    errorMsg.value = 'Error en la conexión con el servidor.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>
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

<script>
export default {
  name: "Login",
  data() {
    return {
      user: '',
      password: '',
      errorMsg: '',
      successMsg: '',
      loading: false
    };
  },
  methods: {
    async login() {
      this.errorMsg = '';
      this.successMsg = '';
      this.loading = true;

      try {
        const res = await fetch('/api/php/base_login_crud/mydocu/Vista/ajax/ajax_login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            nameUserLogin: this.user,
            namePasswordLogin: this.password
          })
        });

        const data = await res.json();

        if (data.estado) {
          localStorage.setItem('jwt_token', data.token);
          this.successMsg = 'Login exitoso!';
          this.errorMsg = '';
            this.$router.push('/home');
          // Aquí puedes hacer una redirección o cargar datos del usuario
        } else {
          this.errorMsg = data.mensaje || 'Usuario o contraseña incorrectos';
          this.successMsg = '';
        }
      } catch (error) {
        this.errorMsg = 'Error en la conexión con el servidor.';
        this.successMsg = '';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

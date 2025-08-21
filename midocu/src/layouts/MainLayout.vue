<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/acerca">Acerca de</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/usuarios">Usuarios</router-link>
            </li>
            <li class="nav-item">
              <button @click="logout" class="btn btn-danger">Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 container my-4">
      <router-view></router-view>
    </main>

    <footer class="bg-light text-center py-3 mt-auto">
      <p class="mb-0">© 2025 Mi Aplicación Vue</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; // ¡La clave es esta línea!

const router = useRouter();

const logout = () => {
  localStorage.removeItem('jwt_token');
  router.push('/login'); // Usar `router.push()` para redirigir
};
</script>
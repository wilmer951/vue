<template>
  <div class="container mt-4">
    <h1 class="mb-4">Lista de Usuarios</h1>

    <div v-if="loading" class="alert alert-info" role="alert">
      Cargando usuarios...
    </div>

    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>

    <table v-if="usuarios.length" class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>id</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Perfil</th>
          <th>Último login</th>
          <th>Estado</th>
          <th>Reset password</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.id }}</td>
          <td>{{ usuario.nombres }}</td>
          <td>{{ usuario.usuario }}</td>
          <td>{{ usuario.nom_rol }}</td>
          <td>{{ usuario.ult_login }}</td>
          <td>{{ usuario.estado }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="abrirModal(usuario)"
            >
              resetear
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && usuarios.length === 0" class="alert alert-warning" role="alert">
      No hay usuarios registrados.
    </div>
  </div>

  <resetPassword
    v-if="mostrarModal"
    :usuario="usuarioSeleccionado"
    @cerrar-modal="cerrarModal"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import resetPassword from '@/components/Usuarios/resetPassword.vue';

// 1. Declarar variables reactivas usando ref()
const usuarios = ref([]);
const loading = ref(false);
const error = ref(null);
const mostrarModal = ref(false);
const usuarioSeleccionado = ref(null);

// 2. Definir los métodos como funciones
const abrirModal = (usuario) => {
  usuarioSeleccionado.value = usuario;
  mostrarModal.value = true;
};

const cerrarModal = () => {
  mostrarModal.value = false;
  usuarioSeleccionado.value = null;
};

// 3. Obtener los datos al montar el componente con onMounted
onMounted(async () => {
  loading.value = true;
  error.value = null;

  const token = localStorage.getItem('jwt_token');

  try {
    const response = await fetch('/api/api_usuarios.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios');
    }

    const data = await response.json();
    usuarios.value = data;
    console.log("Usuarios recibidos:", data);

  } catch (err) {
    error.value = err.message;
    console.error("Error cargando usuarios:", err);
  } finally {
    loading.value = false;
  }
});
</script>
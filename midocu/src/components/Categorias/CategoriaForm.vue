<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Crear Categoría</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="enviarFormulario">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  class="form-control"
                  id="nombre"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea
                  v-model="form.descripcion"
                  class="form-control"
                  id="descripcion"
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" class="btn btn-success w-100">Guardar</button>
            </form>

            <div v-if="mensaje" class="alert alert-info mt-3">
              {{ mensaje }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  nombre: '',
  descripcion: ''
})

const mensaje = ref('')

const enviarFormulario = async () => {
  try {
        const token = localStorage.getItem('jwt_token');
        
        
    const response = await fetch('/api/api_categorias.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // estándar
      },
      body: JSON.stringify(form.value)
    })

    const data = await response.json()

    if (response.ok) {
      mensaje.value = 'Categoría creada correctamente.'
      form.value = { nombre: '', descripcion: '' }
    } else {
      mensaje.value = data.error || 'Error al crear categoría.'
    }
  } catch (error) {
    mensaje.value = 'Error en la solicitud: ' + error.message
  }
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>

<template>
  <div
    class="modal fade show"
    tabindex="-1"
    style="display: block; background-color: rgba(0, 0, 0, 0.5);"
    role="dialog"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Resetear contraseña</h5>
          <button type="button" class="btn-close" @click="$emit('cerrar-modal')" aria-label="Cerrar"></button>
        </div>

        <div class="modal-body">
          <p><strong>Usuario:</strong> {{ usuario?.usuario || 'Ninguno seleccionado' }}</p>
          <input
            v-model="nuevaPassword"
            type="password"
            class="form-control"
            placeholder="Nueva contraseña"
            required
          />
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cerrar-modal')">Cancelar</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="resetearContrasena"
            :disabled="!nuevaPassword"
          >
            Guardar
          </button>
        </div>

        <div v-if="mensaje" class="alert alert-info mt-3">
          {{ mensaje }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 1. Definir props y emits
const props = defineProps({
  usuario: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['cerrar-modal']);

// 2. Definir estado reactivo con ref()
const nuevaPassword = ref('');
const mensaje = ref('');

// 3. Definir la función para resetear la contraseña
const resetearContrasena = async () => {
  // Limpiar el mensaje previo
  mensaje.value = '';

  if (!nuevaPassword.value) {
    mensaje.value = 'Ingresa una nueva contraseña';
    return;
  }

  const token = localStorage.getItem('jwt_token');
  const datosParaEnviar = {
    id_usuario: props.usuario.id,
    nuevaPassword: nuevaPassword.value
  };

  try {
    const response = await fetch('/api/api_resetPasswrod.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(datosParaEnviar)
    });

    if (!response.ok) {
      const errorData = await response.json();
      mensaje.value = errorData.error || 'Error al resetear la contraseña';
      return;
    }

    const data = await response.json();
    mensaje.value = data.mensaje || 'Contraseña reseteada correctamente.';

    setTimeout(() => {
      emit('cerrar-modal');
    }, 2000);

  } catch (error) {
    mensaje.value = 'Error en la solicitud: ' + error.message;
  }
};
</script>
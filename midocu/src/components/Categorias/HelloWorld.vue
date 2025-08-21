<template>
  <div class="mt-3">
    <button @click="mensaje_prueba">prueba</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      prueba: 1, // ejemplo
      guardar_respuesta : []
    }
  },
  methods: {
    mensaje_prueba() {
      console.log("mensaje prueba");

      const token = localStorage.getItem('jwt_token');
      console.log("Token cargado:", token);

      fetch('/api/api_prueba.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}` // estándar
        },
        body: new URLSearchParams({
          mensaje: this.prueba
          
          
        })
      })
      .then(res => res.json())
      .then(data => {
        this.guardar_respuesta = data;
        console.log("dato optenido:", data);
      })
      .catch(err => console.error("Error cargando categorías:", err));
    }
  }
};
</script>
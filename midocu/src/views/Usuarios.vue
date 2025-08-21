<template>
  <div>
    <h1>Usuarios</h1>
  </div>


  <div> <obtenerUsuarios /></div>
    
</template>


<script>
import obtenerUsuarios from '@/components/Usuarios/obtenerUsuarios.vue';



export default {
  name: "usuarios",
  components: {
    obtenerUsuarios

  }
};
</script>



<template>
  <div>
    <h1>Inicio</h1>
    <p>Esta es la página principal.</p>
  </div>


    <div>
    <h1>Página Home</h1>
    <Categorias />
  </div>


  <div>
    <HelloWorld />
  </div>
</template>




<script>
import Categorias from '@/components/Categorias.vue';
import HelloWorld from '@/components//HelloWorld.vue';

export default {
  name: "Home",
  components: {
    Categorias,
    HelloWorld
  }
};
</script>

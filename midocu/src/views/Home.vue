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


    <div>
    <CategoriaForm />
  </div>
</template>




<script>
import Categorias from '@/components/Categorias/Categorias.vue';
import HelloWorld from '@/components/Categorias/HelloWorld.vue';
import CategoriaForm from '@/components/Categorias/CategoriaForm.vue';

export default {
  name: "Home",
  components: {
    Categorias,
    HelloWorld,
    CategoriaForm
  }
};
</script>

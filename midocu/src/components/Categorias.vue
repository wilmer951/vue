<template>
  <div>
    <div class="col-4">  
      <!-- Select de CATEGORIAS -->
      <label for="categoria" class="form-label">Categoría</label>
      <select
        id="categoria"
        class="form-select"
        v-model="categoriaSeleccionada"
        @change="cargarSubcategorias"
      >
        <option disabled value="">Seleccione una categoría</option>
        <option 
          v-for="cat in categorias" 
          :key="cat.id_categoria" 
          :value="cat.id_categoria"
        >
          {{ cat.nombre_categoria }}
        </option>
      </select>
    </div>

    <div class="col-4">
      <!-- Select Subcategoría -->
      <label for="subcategoria" class="form-label">Subcategoría</label>
      <select
        id="subcategoria"
        class="form-select"
        v-model="subcategoriaSeleccionada"
        :disabled="subcategorias.length === 0"
         @change="cargarSub_subcategorias"
      >
        <option disabled value="">Seleccione una subcategoría</option>
        <option 
          v-for="sub in subcategorias" 
          :key="sub.id_subcategoria" 
          :value="sub.id_subcategoria"
        >
          {{ sub.nombre_subcategoria }}
        </option>
      </select>
    </div>

    <div class="col-4">

            <!-- Select SUBSUBCATEGORIA -->
        <label for="sub_subcategoria" class="form-label">Subcategoría</label>
        <select
          id="sub_subcategoria"
          class="form-select"
          v-model="sub_subcategoriaSeleccionada"
          :disabled="sub_subcategoria.length === 0"
        >
          <option disabled value="">Seleccione una subcategoría</option>
          <option 
            v-for="subsub  in sub_subcategoria" 
            :key="subsub.id_sub_subcategoria" 
            :value="subsub.id_subsubcategoria"
          >
             {{ subsub.nombre_subcategoria }}
          </option>
        </select>
      </div>


    </div>
</template>

<script>
export default {
  name: "Categorias",
  data() {
    return {
      categorias: [],
      subcategorias: [],
      sub_subcategoria: [],
      categoriaSeleccionada: '',
      subcategoriaSeleccionada: '',
      sub_subcategoriaSeleccionada: '',
      estadoSubcategoria: '1'
    };
  },
  mounted() {
      const token = localStorage.getItem('jwt_token');
      console.log("Token cargado:", token);

      fetch('/api/php/base_login_crud/mydocu/Vista/ajax/ajax_categorias.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Bearer ${token}` // estándar
        }
      })
      .then(res => res.json())
      .then(data => {
        this.categorias = data;
        console.log("Categorias recibidas:", data);
      })
      .catch(err => console.error("Error cargando categorías:", err));
  },
  methods: {
    cargarSubcategorias() {
      this.subcategorias = [];
      this.subcategoriaSeleccionada = '';
      if (this.categoriaSeleccionada === '') return;

      fetch('/api/php/base_login_crud/mydocu/Vista/ajax/ajax_categoriasSub.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          id_categoria: this.categoriaSeleccionada,
          estadoSubcategoria: this.estadoSubcategoria
        })
      })
      .then(res => res.json())
      .then(data => {
        this.subcategorias = data;
        console.log("Subcategorías recibidas:", data);
      })
      .catch(err => console.error("Error cargando subcategorías:", err));
    },
    cargarSub_subcategorias() {
      this.sub_subcategoria = [];
      this.sub_subcategoriaSeleccionada = '';
      if (!this.subcategoriaSeleccionada) return;

      fetch('/api/php/base_login_crud/mydocu/Vista/ajax/ajax_categoriasSub_sub.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          id_subcategoria: this.subcategoriaSeleccionada,
          estadoSubcategoria: this.estadoSubcategoria
        })
      })
      .then(res => res.json())
      .then(data => {
        this.sub_subcategoria = data;
        console.log("Sub_Subcategorías recibidas:", data);
      })
      .catch(err => console.error("Error cargando sub_subcategorías:", err));
    }
  }
};

</script>

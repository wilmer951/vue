import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Acerca from './views/Acerca.vue'
import Usuarios from './views/Usuarios.vue'
import PageNotFound from './views/PageNotFound.vue'

import { isAuthenticated } from '@/utils/auth'

const routes = [
    // Define la ruta del login como una ruta independiente
    { 
        path: '/login', 
        name: 'login', // Asignar un nombre a la ruta para una navegación clara
        component: Login, 
        meta: { requiresAuth: false } 
    },
    
    // Define la ruta principal que carga el MainLayout
    {
        path: '/',
        component: MainLayout,
        // Asigna un nombre a la ruta raíz para poder redirigir a ella si es necesario
        name: 'main', 
        // Redirige la ruta raíz (`/`) a la página de inicio
        redirect: '/home', 
        meta: { requiresAuth: true }, // Las rutas dentro del MainLayout requieren autenticación por defecto
        children: [
            // Las rutas anidadas ahora tienen un path relativo (sin `/`)
            { path: 'home', name: 'home', component: Home },
            { path: 'acerca', name: 'acerca', component: Acerca },
            { path: 'usuarios', name: 'usuarios', component: Usuarios }
        ]
    },
    
    // Ruta para manejar URLs no encontradas (404)
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Guardián de navegación para la autenticación
router.beforeEach((to, from, next) => {
    // Si la ruta requiere autenticación Y el usuario no está autenticado...
    if (to.meta.requiresAuth && !isAuthenticated()) {
        // Redirige al usuario a la página de login
        next({ name: 'login' });
    } else {
        // De lo contrario, permite la navegación
        next();
    }
});

export default router;
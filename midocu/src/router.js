import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Acerca from './views/Acerca.vue'
import Usuarios from './views/Usuarios.vue'
import PageNotFound from './views/PageNotFound.vue'

import { isAuthenticated } from '@/utils/auth'

const routes = [
    { 
        path: '/login', 
        name: 'login',
        component: Login, 
        meta: { requiresAuth: false } 
    },
    
    {
        path: '/',
        component: MainLayout,
        name: 'main', 
        redirect: '/home', 
        meta: { requiresAuth: true },
        children: [
            { path: 'home', name: 'home', component: Home },
            { path: 'acerca', name: 'acerca', component: Acerca },
            { path: 'usuarios', name: 'usuarios', component: Usuarios }
        ]
    },
    
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Función para verificar el token con el backend
const checkTokenWithBackend = async (token) => {
    try {
        const response = await fetch('/api/check-auth.php', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        // Si el token es válido, el servidor responderá con 200 OK
        return response.ok;
    } catch (error) {
        console.error('La verificación de la API falló:', error);
        return false;
    }
};

// Guardián de navegación para la autenticación
router.beforeEach(async (to, from, next) => {
    // Si la ruta requiere autenticación...
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('jwt_token');

        // Paso 1: Verificación del lado del cliente
        if (!token || !isAuthenticated()) {
            // No hay token o ha expirado. Redirigir al login.
            next({ name: 'login' });
            return;
        }

        // Paso 2: Verificación con el backend (más segura)
        const isTokenValid = await checkTokenWithBackend(token);

        if (isTokenValid) {
            // El token es válido, permitir la navegación
            next();
        } else {
            // El token es inválido o ha sido revocado en el servidor.
            // Limpiar el token y redirigir al login.
            localStorage.removeItem('jwt_token');
            next({ name: 'login' });
        }
    } else {
        // La ruta no requiere autenticación, permitir la navegación
        next();
    }
});

export default router;
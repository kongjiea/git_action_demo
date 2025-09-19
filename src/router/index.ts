import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/a',
            name: 'A',
            component: () => import('../views/AView.vue')
        },
        {
            path: '/b',
            name: 'B',
            component: () => import('../views/BView.vue')
        },
        {
            path: '/c',
            name: 'C',
            component: () => import('../views/CView.vue')
        },
        {
            path: '/d',
            name: 'D',
            component: () => import('../views/DView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue')
        }
    ]
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'

import DogsTotal from '@/components/DogsTotal.vue'

import DogsAzar from '@/components/DogsAzar.vue'

import DogsListado from '@/components/DogsListado.vue'

const routes =  [
    { path: '/',  name: 'Home', component: DogsTotal },
    { path: '/listado', name: 'Listado', component: DogsListado },
    { path: '/azar', name: 'Azar', component: DogsAzar }
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

import DogsTotal from '@/components/DogsTotal.vue'

import DogsAzar from '@/components/DogsAzar.vue'

import DogsListado from '@/components/DogsListado.vue'

import DogsBreeds from '@/components/DogsBreeds.vue'

const routes =  [
    { path: '/',  name: 'Home', component: DogsTotal },
    { path: '/listado', name: 'Listado', component: DogsListado },
    { path: '/azar', name: 'Azar', component: DogsAzar },
    { path: '/dogs/:breed', name: 'Breed', component: DogsBreeds },
    { path: '/dogs/:breed/:subBreed', name: 'SubBreed', component: DogsBreeds }
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router
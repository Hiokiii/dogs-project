import { createRouter, createWebHistory } from 'vue-router'

import DogsTotal from '@/components/DogsTotal.vue'

import DogsAzar from '@/components/DogsAzar.vue'

const routes =  [
    { path: '/',  name: 'Home', component: DogsTotal },
    { path: '/azar', name: 'Azar', component: DogsAzar }
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router
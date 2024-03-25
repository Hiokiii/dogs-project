<template>
    <div class="container4">
      <div v-if="dog">
        <h2>{{ dog.breed }} {{ dog.subBreed ? '- ' + dog.subBreed : '' }}</h2>
        <img class="imagen-perro" :src="dog.image" alt="" />
      </div>
      <button class="boton1" @click="getRandomDog">Obtener raza al azar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        dog: null
      }
    },
    methods: {
      async getRandomDog() {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random')
        const imageUrl = response.data.message
        const parts = imageUrl.split('/')
        const breedPart = parts[parts.length - 2]
        const [breed, subBreed] = breedPart.split('-').reverse()
        this.dog = {
          breed,
          subBreed,
          image: imageUrl
        }
      }
    }
  }
  </script>

<style scoped>
.container4 {
    text-align: center; 
}

.imagen-perro {
    max-width: 800px;
    max-height: 700px;
    height: auto; 
    margin: 0 auto;
}
.boton1 {
    position: fixed;
    bottom: 400px; 
    transform: translateX(-50%);
    background-color: rgb(201, 173, 167);
    border: 2px solid rgb(154, 140, 152);
    border-radius: 8px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 16px;
    padding: 0 25px;
}

.boton1:hover {
    background-color: rgb(192, 188, 191);
    color: rgb(255, 255, 255);
}
</style>
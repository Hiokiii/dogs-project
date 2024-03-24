<template>
    <div>
        <h2>{{ $route.params.breed }} <span v-if="$route.params.subBreed">- {{ $route.params.subBreed }}</span></h2>
        <img v-if="imageUrl" :src="imageUrl" alt="Dog breed" />
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        imageUrl: ''
      }
    },
    async created() {
      const breed = this.$route.params.breed
      const subBreed = this.$route.params.subBreed
      let url
  
      if (subBreed) {
        url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`
      } else {
        url = `https://dog.ceo/api/breed/${breed}/images/random`
      }
  
      const response = await axios.get(url)
      this.imageUrl = response.data.message
    }
  }
  </script>
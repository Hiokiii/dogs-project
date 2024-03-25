<template>
    <div class="container5">
        <h2>{{ $route.params.breed }} <span v-if="$route.params.subBreed">- {{ $route.params.subBreed }}</span></h2>
        <img class="imagen-perro" v-if="imageUrl" :src="imageUrl" alt="Dog breed" />
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

<style scoped>
  .container5 {
    text-align: center; 
}
.imagen-perro {
    max-width: 800px;
    max-height: 700px;
    height: auto; 
    margin: 0 auto;
}
</style>
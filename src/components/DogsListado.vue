<template>
    <div>
      <select v-model="currentBreed">
        <option disabled value="">Selecciona una raza</option>
        <option v-for="breed in Object.keys(sortedBreeds)" :key="breed" :value="breed">{{ breed }}</option>
      </select>
    </div>
    <div class="container3">
      <div v-if="currentBreed">
          <h2>{{ currentBreed }}</h2>
          <div class="grid-container">
            <div class="grid-item" v-for="(imageInfo, index) in paginatedImages" :key="index">
              <img :src="imageInfo.url" alt="" />
              <p>{{ currentBreed }} {{ imageInfo.subBreed ? '- ' + imageInfo.subBreed : '' }}</p>
            </div>
          </div>
          <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
            <span>{{ currentPage }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
          </div>
      </div>
    </div>
  
  </template>
  
  
  <script>
  import axios from 'axios'
  import '@/assets/css/dogstyle.css'
  
  export default {
    data() {
      return {
        breeds: {},
        images: {},
        isAscending: true,
        currentBreed: "",
        currentSubBreed: "",
        currentPage: 1, 
        imagesPerPage: 12
      }
    },
    computed: {
      
      sortedBreeds() {
        const breedsArray = Object.entries(this.breeds)
        const sortedBreedsArray = breedsArray.sort((a, b) => {
          const breedA = a[0].toUpperCase()
          const breedB = b[0].toUpperCase()
          if (this.isAscending) {
            return breedA < breedB ? -1 : breedA > breedB ? 1 : 0
          } else {
            return breedA > breedB ? -1 : breedA < breedB ? 1 : 0
          }
        })
        return Object.fromEntries(sortedBreedsArray)
      },
      sortedSubBreeds() {
        const subBreedsArray = Object.entries(this.breedsWithSubBreeds)
        const sortedSubBreedsArray = subBreedsArray.sort((a, b) => {
          const subBreedA = a[0].toUpperCase()
          const subBreedB = b[0].toUpperCase()
          if (this.isSubBreedAscending) {
            return subBreedA < subBreedB ? -1 : subBreedA > subBreedB ? 1 : 0
          } else {
            return subBreedA > subBreedB ? -1 : subBreedA < subBreedB ? 1 : 0
          }
        })
        return Object.fromEntries(sortedSubBreedsArray)
      },
      breedsWithSubBreeds() {
        return Object.entries(this.breeds)
          .filter(([breed, subBreeds]) => subBreeds.length > 0)
          .reduce((obj, [breed, subBreeds]) => {
            obj[breed] = subBreeds;
            return obj;
          }, {});
      },
      allImages() {
        if (!this.images[this.currentBreed]) return [];
        let allImages = [];
        for (let subBreed in this.images[this.currentBreed]) {
          this.images[this.currentBreed][subBreed].forEach(image => {
            allImages.push({ url: image, subBreed: subBreed !== 'main' ? subBreed : '' });
          });
        }
        return allImages;
      },
      paginatedImages() {
        const start = (this.currentPage - 1) * this.imagesPerPage;
        const end = start + this.imagesPerPage;
        return this.allImages.slice(start, end);
      },
      totalPages() {
        return Math.ceil(this.allImages.length / this.imagesPerPage);
      }
    },
    methods: {
      async fetchImages(breed, subBreed) {
        let url;
        if (subBreed) {
          url = `https://dog.ceo/api/breed/${breed}/${subBreed}/images`
        } else {
          url = `https://dog.ceo/api/breed/${breed}/images`
        }
        const response = await axios.get(url)
        this.images[breed] = this.images[breed] || {}
        this.images[breed][subBreed || 'main'] = response.data.message
      },
      async changeBreed() {
        this.currentPage = 1;
        const breed = this.currentBreed;
  
        if (this.breeds[breed].length > 0) {
          for (const subBreed of this.breeds[breed]) {
            await this.fetchImages(breed, subBreed)
          }
        } else {
          await this.fetchImages(breed)
        }
        this.currentSubBreed = this.breeds[breed][0] || 'main';
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.currentPage++;
        }
      },
      previousPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      }
    },
    watch: {
      currentBreed() {
        this.changeBreed()
      }
    },
    async created() {
      const response = await axios.get('https://dog.ceo/api/breeds/list/all')
      this.breeds = response.data.message
      for (const breed in this.breeds) {
        if (this.breeds[breed].length > 0) {
          for (const subBreed of this.breeds[breed]) {
            this.fetchImages(breed, subBreed)
          }
        } else {
          this.fetchImages(breed)
        }
      }
    }
   
  }
  </script>
  
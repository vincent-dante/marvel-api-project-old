<template>

  <div  v-show="!showLoadingPage" class="content-container">
    <div class="container">
      <div class="row g-2">
        <div class="col-lg-4 mb-5">
          <a href="#" @click.prevent="goBack()" class="a-link a-link-dash-after">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
            </svg>
             Back
          </a> 
          <router-link to="/" class="a-link">Home</router-link>
        </div>    
      </div>    
      <div class="row g-2">
        <div class="col-lg-4">
          <img :src="thumbnail" alt="" srcset="" class="rounded shadow">
        </div>
        <div class="col-lg-8">
          <div class="container-description">
            <h1>{{ title }}</h1>
            <br>
            <p v-if="description.length != 0" class="" v-html="description"></p>
            <p v-else class="">No description found.</p>
            <br>
            <div>
              <template v-for="(data, id) in creators.items" :key="id">
                <a href="#" class="creator-link rounded-end shadow">
                  <span class="creator-link-span rounded-top">{{ data.role }}</span>
                  {{ data.name }}
                </a>
              </template>
            </div>
            <br>
            <p class=""><small class="text-muted">Data provided by Marvel. © 2014 Marvel</small></p>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div v-show="showLoadingPage" class="holder">
    <div class="preloader">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  </div>  

</template>

<script>
import { useRoute } from 'vue-router'

const axios = require('axios');


export default {
  name: 'ComicsPage',
  data() {
    return {
      showLoadingPage: true,
      title: "",
      description: "",
      thumbnail: "",  
      creators: {
        items: [
          {
            name: "",
            role: ""
          }
        ]
      }
    }
  },
  setup(){
    const route = useRoute();
    const id = route.params.id;

    return {
      id
    };
  },
  mounted(){
    this.showLoadingPage = true;
    this.getComics(this.id)

  },
  methods: {
    getComics(id){

      axios
      .get(`/characters/comics/${id}`)
      .then( response => {

        let res = response.data;
        this.title = res[0].title;
        this.description = (res[0].description === null) ? "" : res[0].description;
        this.thumbnail = res[0].thumbnail.path+'.'+res[0].thumbnail.extension;
        this.creators = res[0].creators;

        this.showLoadingPage = false;
      })
      .catch(err => {
        console.error(err);
      })

    },
    goBack(){

      this.$router.go(-1)

    }
  }
}
</script>

<style lang="scss" scoped>
  .a-link {
    font-style: italic;
    font-size: 18px;
    padding: 10px 5px 10px 0;
    margin-right: 10px;
    text-decoration: none;
  }

  .a-link-dash-after::after {
    content: "/";
    padding-left: 10px;
  }

  .container {
    text-align: left;
  }

  img {
    width: 100%;
  }

  .creator-link {
    display: inline-block;
    position: relative;
    color: #fff;
    background: #bb4447;
    padding: 5px 5px 5px 10px !important;
    margin: 20px 5px;
    text-decoration: none;
    min-width: 180px;
    font-size: 15px;
    cursor: pointer;
    bottom: 0;
    transition: bottom 0.3s ease-in-out;
  }

  .creator-link:hover, 
  .creator-link:focus 
  {
    bottom: 8px;
  }


  .creator-link-span {
    position: absolute;
    bottom: 32px;
    left: 0px;
    background: #444;
    padding: 0 5px;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
  }

  .container-description {
    padding-top: 30px;
  }

  @media only screen and (min-width: 992px) {
    .container-description {
      padding: 0 0 0 50px;
    }
  }   
</style>
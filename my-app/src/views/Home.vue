<template>
  <div v-show="!showLoadingPage" class="content-container">
    
    <div class="container_search">
      <input type="text" class="shadow-sm" placeholder="Search now!" v-model="characterName" @keyup.enter="searchCharacter()">
      <input type="button" class="shadow-sm" value="Search" @click="searchCharacter()">
    </div>

    <div v-show="noResult">No Result Found</div>
    
    <div class="container">
      <div class="row g-2">
        <div class="col-sm-12 col-md-6 col-lg-3" v-for="(column, id) in columns" :key="id">
          
          <div class="card shadow-sm mb-3 me-1 ms-1 text-start card-character" v-for="character in column" :key="character.id" @click="showCharacter(character)">
            <div class="thumbnail-card-container">
              <img :src="character.thumbnail.path+'.'+character.thumbnail.extension" alt="" srcset="" class="card-img-top thumbnail-card">
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ character.name }}</h5>
              <br>
              <hr>
              <span class="footer-text-box">Data provided by Marvel. © 2014 Marvel</span>
            </div>
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
  name: 'Home',
  data(){
    return {
      showLoadingPage: true,
      characterList: [],
      noResult: false,
      cols: 4,
      characterData: {
        name: '',
        thumbnail: '',
        description: '',
        id: ''
      },
      characterComics: [],
      singleComicData: [{
        title: '',
        thumbnail: '',
        description: '',
        id: '',
        creators: {
          items: [
            {
              name: ""
            }
          ]
        }
      }]
    }
  },
  setup(){
    const route = useRoute();
    const characterName = (route.query.characterName === undefined) ? "" : route.query.characterName;

    return {
      characterName
    };
  },
  mounted(){    

    if (this.characterName.length != 0) this.searchCharacter()
    else this.getCharacters()  

  },
  computed: {
    columns: function() {
      let columns = [];
      let mid = Math.ceil(Object.keys(this.characterList).length / this.cols);
      for (let col = 0; col < this.cols; col++) {
          columns.push(Object.entries(this.characterList).slice(col * mid, col * mid + mid).map(entry => entry[1]));
      }
      return columns;
    },
  },
  methods: {
    searchCharacter(){

      this.showLoadingPage = true;
      if (this.characterName.length === 0) this.getCharacters()
      else this.getCharacter()

    },
    getCharacters(){
      this.noResult = false

      axios
      .get('/characters')
      .then( response => {
        let res = response.data;
        this.characterList = []
      
        res.forEach(element => {
          this.characterList.push({
            name: element.name,
            thumbnail: element.thumbnail,
            description: element.description,
            id: element.id
          })
        });

        this.showLoadingPage = false;
      })
      .catch( err => console.error(err) )

    },
    getCharacter(){
      let character = this.characterName
      this.noResult = false

      axios
      .get(`/characters/name/${character}`)
      .then( response => {
        let res = response.data;
        this.characterList = []

        res.forEach(element => {
          this.characterList
          .push({
            name: element.name,
            thumbnail: element.thumbnail,
            description: element.description,
            id: element.id
          })
        });

        (this.characterList.length === 0) ? this.noResult = true : this.noResult = false

        this.showLoadingPage = false;
      })
      .catch( err => console.error(err) )

    },
    showCharacter(character) {

      this.$router.push({ path: `/characterpage/${character.id}`, query: { characterName: this.characterName } })    

    }
  }
}
</script>

<style lang="scss" scoped>
  .container_search {
    margin: 50px 0;

    input[type="text"],
    input[type="button"] {
      outline: none
    }

    input[type=text] {
      border: 1px solid #b3b3b3;
      border-radius: 20px;
      padding: 10px 20px;
      color: #020202;
      width: 55%;
    }

    input[type=button] {
      padding: 10px 20px;
      margin-left: 10px;
      border: none;
      border-radius: 40px;
      cursor: pointer;
      color: #5e5e5e;
      background: #d7d7d7;
      transition: 0.5s ease-in-out;
    }

    input[type=button]:hover, 
    input[type=button]:focus 
    {
      color: #ececec;
      background: #282828;
    }
  }

  .thumbnail-card-container {
    overflow: hidden;
  }

  .thumbnail-card {
    transition: 0.6s ease-in-out;
  }

  .card-character {
    cursor: pointer;
  }

  .card-character:hover
  .thumbnail-card 
  {
    -ms-transform: scale(1.20);
    -o-transform: scale(1.20);
    -webkit-transform: scale(1.20);
    transform: scale(1.20);  
  }

  .footer-text-box {
    font-size: 12px;
  }

  @media only screen and (min-width: 768px) {

  } 

  @media only screen and (min-width: 992px) {
    .container_search {
      margin-bottom: 50px;

      input[type=text] {
        width: 30%;
      }
    }
  } 
</style>

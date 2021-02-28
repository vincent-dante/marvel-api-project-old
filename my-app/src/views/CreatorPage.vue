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
					<div class="col-md-4">
						<img :src="thumbnail" alt="" srcset="" class="rounded shadow">
					</div>
				<div class="col-md-8">
					<div class="container-description">
						<h1>{{ fullName }}</h1>
						<br>
						<br>
						<br>
						<p class=""><small class="text-muted">Data provided by Marvel. © 2014 Marvel</small></p>
					</div>
				</div>
			</div>


			<br>
			<br>
			<br>

			<div class="row g-3">
				<div class="col-lg-12">
					<h2 class="h2-comics">Comics</h2>
					<h5 v-show="showNoComicsFound" class="text-center">No comics found...</h5>
				</div>

				<div class="col-sm-12 col-md-6 col-lg-3" v-for="(comics, id) in creatorComics" :key="id">

					<div class="card shadow-sm mb-2 me-0 ms-0 text-start card-character" @click="getComics(comics.id)">
						<div class="thumbnail-card-container">
							<img v-if="comics.images.length == 0" :src="'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'" class="card-img-top thumbnail-card">
							<img v-else :src="comics.images[0].path+'.'+comics.images[0].extension" alt="" class="card-img-top thumbnail-card">
						</div>
						<div class="card-body">
							<h5 class="card-title">{{comics.title}}</h5>
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
	name: 'CreatorPage',
	data() {
		return {
			showLoadingPage: true,
			fullName: "",
			thumbnail: "",
			creatorComics: []
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
		this.getCreator(this.id)
		this.getCreatorComics(this.id)

	},
	methods: {
		getCreator(id){

			axios
			.get(`/characters/creator/${id}`)
			.then( response => {
				console.log(response)
				let res = response.data;
				this.fullName = res[0].fullName;
				this.thumbnail = res[0].thumbnail.path+'.'+res[0].thumbnail.extension;

			})
			.catch( err => console.error(err) )

		},
		getCreatorComics(id){

      axios
      .get(`/characters/creator/${id}/comics`)
      .then( response => {

        let res = response.data;
        this.creatorComics = res;
        (this.creatorComics.length === 0) ? this.showNoComicsFound = true : this.showNoComicsFound = false;

        this.showLoadingPage = false;
      })
      .catch( err => console.error(err) )

    },
		getComics(comics_id){

      this.$router.push({ path: `/comicspage/${comics_id}` })  

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

  .comics_title {
    font-weight: bold;
    padding-top: 10px;
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

  .card-character:hover .thumbnail-card{
    -ms-transform: scale(1.10);
    -o-transform: scale(1.10);
    -webkit-transform: scale(1.10);
    transform: scale(1.10);  
  }

  .container-description {
    padding-top: 30px;
  }

  .footer-text-box {
    font-size: 12px;
  }

  @media only screen and (min-width: 768px) {
    .container-description {
      padding: 0 0 0 50px;
    }
  } 
</style>

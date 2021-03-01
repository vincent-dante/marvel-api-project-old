require('dotenv').config()

const express = require('express')
const crypto = require('crypto');
const fetch = require('node-fetch');


const app = express()
const port = 3000

const start = Date.now();
const publicApiKey = process.env.PUBLIC_API_KEY;
const privateApiKey = process.env.PRIVATE_API_KEY;
const md5sum = crypto.createHash('md5').update(`${start}${privateApiKey}${publicApiKey}`).digest('hex');



app.set('Content-Type', 'application/json');


app.get('/characters', function (req, res) {

  fetch(`http://gateway.marvel.com/v1/public/characters?&ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.get('/characters/name/:name', function (req, res) {

  fetch(`http://gateway.marvel.com/v1/public/characters?nameStartsWith=${req.params.name}&ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.get('/characters/id/:id', function (req, res) {

  fetch(`http://gateway.marvel.com/v1/public/characters/${req.params.id}?ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.get('/characters/:id/comics', function (req, res) {

  fetch(`http://gateway.marvel.com/v1/public/characters/${req.params.id}/comics?ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.get('/characters/comics/:id', function (req, res) {

  fetch(`http://gateway.marvel.com/v1/public/comics/${req.params.id}?ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.get('/characters/creator/:id', function (req, res) {

  fetch(`https://gateway.marvel.com:443/v1/public/creators/${req.params.id}?ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})


app.get('/characters/creator/:id/comics', function (req, res) {

  fetch(`https://gateway.marvel.com:443/v1/public/creators/${req.params.id}/comics?ts=${start}&apikey=${publicApiKey}&hash=${md5sum}`)
    .then(res => {
      return res.json()
    })
    .then(json => {
      res.send(json.data.results)
    })
    .catch(err => console.error(err));

})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
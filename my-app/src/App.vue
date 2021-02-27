<template>
  <div id="nav">
    <h1 class="marvel-h1"><span class="marvel-span">MARVEL</span> CHARACTERS</h1>
    <p>By: Vincent Dante</p>
  </div>
  <router-view/>



</template>

<style lang="scss">
  body {
    background-color: #f4f4f4;
  }

  h1 {
    font-weight: bold;
  }

  .marvel-h1 {
    font-family: 'Bebas Neue', cursive;
  }

  .marvel-span {
    color: #e62429;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  .content-container {
    padding: 0 0 200px 0;
  }

  $count: 10;
  $time: 2; //in seconds
  $size: 100;
  $color: #d52323;

  .holder {
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 0px;
    right: 0px;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.9s;
  }

  .preloader {
    /* size */
    width: $size + px;
    height: $size + px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: rotatePreloader $time + s infinite ease-in;
  }

  @keyframes rotatePreloader {
    0% {
    transform: translateX(-50%) translateY(-50%) rotateZ(0deg);
    }
    100% {
    transform: translateX(-50%) translateY(-50%) rotateZ(-360deg);
    }
  }

  .preloader div {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .preloader div:before {
    content: "";
    position: absolute;
    left: 50%;
    top: 0%;
    width: 10%;
    height: 10%;
    background-color: $color;
    transform: translateX(-50%);
    border-radius: 50%;
  }

  @for $i from 1 through $count {
    .preloader div:nth-child(#{$i}) {
      transform: rotateZ(((360 / $count) * ($i - 1)) + deg);
      animation: rotateCircle + $i $time + s infinite linear;
      z-index: $count - $i;
    }
    @keyframes rotateCircle#{$i} {
      #{percentage(((50 / $count) * ($i - 1)) / 100)} {
        opacity: 0;
      }
      #{percentage((((50 / $count) + 0.0001) * ($i - 1)) / 100)} {
        opacity: 1;
        transform: rotateZ((0 - ((360 / $count) * ($i - 2))) + deg);
      }
      #{percentage((((50 / $count) * ($i - 0)) + 2) / 100)} {
        transform: rotateZ((0 - ((360 / $count) * ($i - 1))) + deg);
      }
      #{percentage(((50 + ((50 / $count) * ($i - 0))) + 2) / 100)} {
        transform: rotateZ((0 - ((360 / $count) * ($i - 1))) + deg);
      }
      100% {
        transform: rotateZ((0 - ((360 / $count) * ($count - 1))) + deg);
        opacity: 1;
      }
    }
  }
</style>

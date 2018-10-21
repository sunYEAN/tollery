<template>
  <div id="app">
    <!--<router-view></router-view>-->
    <!--<my-books></my-books>-->
    <tollery></tollery>
  </div>
</template>

<script>
  import MyBooks from './pages/a';
  import Tollery from './pages/tollery';
export default {
  name: 'App',
  components: {MyBooks, Tollery}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
*{
  padding: 0;
  margin: 0;
}
  body{
    background-color: black;
  }
  li{
    list-style: none;
  }
</style>

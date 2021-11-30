<template>

<div class="content">
      <!-- <TheNavBar/> -->
      <NavBar/>
      <div class="switch-pages-container">
         <router-view :key="$route.path"/>
      </div>
</div>
  
</template>

<script>
//import TheNavbar from '@/components/TheNavBar.vue'
import NavBar from '@/components/TheNavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
    //TheNavbar
    }
}
</script>

<style>
li{
  list-style: none;
}
ul{
      margin:0 0;
    padding: 0 0;
}
a{
  text-decoration: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

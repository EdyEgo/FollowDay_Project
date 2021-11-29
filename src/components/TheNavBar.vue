<template>
    <div class="nav-bar">
      
          <div class="nav-bar-container"> 
              <router-link :to="{name:'HomePosts'}" class="logo-container">
                    FollowDay Logo
              </router-link >
              <div class="search-container">
                    <TheSearchBar/>
              </div>

              <div class="account-options">
                 <TheAccountOptions/>

              </div>

          </div>
    </div>
</template>

<script>
import TheAccountOptions from '@/components/TheNavBarOptions/TheAccountOptions'
import TheSearchBar from '@/components/TheNavBarOptions/SearchBar'
export default {
    components:{
       TheAccountOptions,
       TheSearchBar
    }

}
</script>

<style scoped>
.nav-bar-container{
 display: flex;
 justify-content: space-between;
}
</style>
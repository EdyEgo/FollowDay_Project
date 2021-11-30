<template>
    <div class="nav-bar">
      <!-- v-if="user_is_loged_in != null" -->
          <div class="nav-bar-container loged-in-user-nav" v-if="user_is_loged_in"> 
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
    },
    computed:{
      user_is_loged_in(){
          const auth_user = this.$store.state.auth.auth_user
          if(auth_user) return true
            return false
          }
    },
    data(){
        return{
          //  user_is_loged_in:this.$store.state.auth.auth_user
        }
    }

}
</script>

<style scoped>
.nav-bar{
 display: flex;
 justify-content: center;
 align-items: center;
}
.nav-bar-container{
 display: flex;
 justify-content: space-between;
 width: 80%;
}
.logo-container,

.account-options{
 width: 18%;
}

</style>
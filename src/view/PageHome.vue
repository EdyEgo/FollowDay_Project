<template>

  <div class="page-home-container">
   <h2>Page Home: {{Test_UserInfo}}</h2>

     <div class="home-page-content-container">
            <div class="home-page__left-side-content-container-desktop post-list-and-friends-header-mobile">
                <div class="header-recomended-channels-container">

                </div>
                <div class="posts-list-container">

                </div>

            </div>

            <div class="home-page__right-side-content-container-desktop">
                <div class="switch-accounts-header">

                </div>

                <div class="suggestions-for-you">

                </div>

            </div>
                

        </div>
    </div>
</template>

<script>
export default {
  computed:{
      Test_UserInfo(){
          console.log('need it',this.$store.state.user_history)
          return this.$store.state.auth.user_history
      }
  }
}
</script>

<style>

</style>
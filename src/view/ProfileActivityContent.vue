<template>
   <div class="profile-activity-content-container">
       <div class="profile-content-type-posts">
           <div class="profile-content__info-actions-title"></div>
           <div class="profile-content__user-posts">
               <p class="test" v-if="current_user_viewd_posts.postsViewed !== '' ">{{current_user_viewd_posts}}</p>
              
           </div>


       </div>
      
       <div class="profile-content-type-bookmarks">
           <div class="profile-content__info-actions-title"></div>
           <div class="profile-content__bookmarks-posts">

           </div>

       </div>

   </div>
</template>

<script>
export default {
    data(){
        return{
            last_doc_post_loaded:null,
            last_doc_bookmark_loaded:null,
            userId:this.$store.state.auth.user_uId

        }
    },
    computed:{ // getCollection
       current_user_viewd_posts(){
           const find_user = this.$store.state.posts.other_users_viewed.find((user)=>user.id === this.userId)
        return  find_user != null &&  find_user.postsViewed != null?  find_user.postsViewed : ''  // postsViewed
       }
    },
    async created(){
        const call_resourses = async(type)=>{
              const posts_loaded = await this.$store.dispatch('posts/getInitialPostsByIds',{userId:this.userId,getCollection:type})//await
                const return_user= this.$store.state.posts.other_users_viewed.find((user)=>user.id === this.userId)
                const posts_viewed = return_user?.postsViewed
                console.log('hey i am calling posts',posts_loaded,posts_viewed)
                return
        }
          
          if(this.activityType === 'posts'){
               await call_resourses('posts')
               return
                // const posts_loaded = await this.$store.dispatch('posts/getInitialPostsByIds',{userId:this.userId})//await
                // const return_user= this.$store.state.posts.other_users_viewed.find((user)=>user.id === this.userId)
                // const posts_viewed = return_user?.postsViewed
                // console.log('hey i am calling posts',posts_loaded,posts_viewed)
                // return
          }
           if(this.activityType === 'bookmarks'){
              await call_resourses('bookmarks')
           }
      
    },
    props:{
        activityType:{
            type:String,
            required:true
        },
        ids_array:{
            type:Array,
            required:true
        }
    }

}
</script>

<style>

</style>
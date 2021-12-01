<template>
   <div class="profile-activity-content-container">
       <div class="profile-content-type-posts">
           <div class="profile-content__info-actions-title"></div>
           <div class="profile-content__user-posts">
               
               
               <ul class="user-posts-list" v-if="current_user_viewd_posts?.length > 0">
                   <PostIcon  v-for="post in current_user_viewd_posts" v-bind:key="post.id" :ViewPostModal="ViewPostModal" :post="post"/>
               </ul>
               <p class="no-posts-msg" v-if="current_user_viewd_posts?.length <= 0 || current_user_viewd_posts == null">You have no posts to be showned</p>
           </div>


       </div>
      
       <div class="profile-content-type-bookmarks">
           <div class="profile-content__info-actions-title">
               <span class="msg-bookmarks">Only you can see your bookmarks</span>
               <span class="add-bookmark-collection"></span>
           </div>
           <div class="profile-content__bookmarks-posts">
                <ul class="user-posts-list" v-if="current_user_viewed_bookmarks_posts?.length > 0">
                     <PostIcon  v-for="post in current_user_viewed_bookmarks_posts" v-bind:key="post.id" :ViewPostModal="ViewPostModal" :post="post"/>
                </ul>
                <p class="no-bookmarks-msg" 
                 v-if="current_user_viewed_bookmarks_posts?.length <= 0 || current_user_viewed_bookmarks_posts == null">
                     You have no bookmarks to be showned
                </p>
           </div>

       </div>

   </div>
</template>

<script>
import PostIcon from '@/components/PostIcon'
export default {
    data(){
        return{
            last_doc_post_loaded:null,
            last_doc_bookmark_loaded:null,
            userId:this.$store.state.auth.user_uId

        }
    },
    components:{ PostIcon },
    computed:{ // getCollection
       current_user_viewd_posts(){
           const find_user = this.$store.state.posts.other_users_viewed.find((user)=>user.id === this.userId)
           
          
        return  find_user != null &&  find_user.postsViewed != null?  find_user.postsViewed : null  // postsViewed
       },
        current_user_viewed_bookmarks_posts(){
             const loged_in_user_obj = this.$store.state.auth.loged_in_user_obj//bookMarks and bookmarksViewed
               console.log('bookmarker is ',loged_in_user_obj)
             if(loged_in_user_obj?.bookmarksViewed.length > 0 && loged_in_user_obj.bookmarksViewed.length <= loged_in_user_obj.posts){
               
                 return loged_in_user_obj.bookmarksViewed
             }
            //  if(loged_in_user_obj?.bookmarks.length > 1 && loged_in_user_obj.bookmarksViewed.length === 0){

            //  }
             return loged_in_user_obj.bookmarksViewed

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
        const custom_call_resourses = async(type)=>{
            if(type === 'bookmarks'){

            const bookmarks_posts_ids = this.$store.state.auth.loged_in_user_obj.bookMarks || [];
            const resorseHasNoContent = this.$store.state.auth.loged_in_user_obj.bookmarksViewed.length === 0
             await  this.$store.dispatch('posts/getPostsFromDataBase',{quantity: 5,postsIds:bookmarks_posts_ids,forTypeBookmarksAuth:true,resorseHasNoContent})
            //await getPostsFromDataBase({quantity: 5,postsIds:bookmarks_posts_ids,forTypeBookmarksAuth:ture})
           }
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
            //  await call_resourses('posts') // you nee still the posts but some a selected heand
            await custom_call_resourses('bookmarks')
           }
      
    },
    props:{
        activityType:{
            type:String,
            required:true
        },
        // ids_array:{
        //     type:Array,
        //     required:true
        // }
    },
    methods:{
        ViewPostModal(event,{post}){
            console.log('post is',event,'target',event.target,'LL',post,post.id,post.title)
        }
    }

}
</script>

<style scoped>

.placeholder-icon-post{
    object-fit: cover;
}
</style>
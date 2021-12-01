<template>
<!--  v-for="post in current_user_viewd_posts"  :key="post.id" -->
   <li class="post-picture-icon" 
                     v-bind="$attrs"
                       @click="(event)=>{ViewPostModal(event , {post})}">
                       <img class="post-icon-image" :src="post.pictures[0]" alt="missing post picture" v-if="Array.isArray(post?.pictures) && post.pictures.length > 0">
                       <img class="post-icon-image placeholder-icon-post" src="/images/auth/placeholder.png" 
                       alt="missing post placeholder picture" v-if="Array.isArray(post?.pictures) === false || post.pictures.length === 0">
                       <div class="post-reactions-section">
                           <div class="reactions__heart-container">
                              <span class="hearts-to-post-number-container">{{post?.likes ? post.likes.length : 0}}</span>
                              <span class="heart-post-icon-container"><FontAwesome icon="heart" class="heart-post-icon"/></span>  
                           </div>
                          <div class="reactions__comments-container">
                              <span class="comments-to-post-number-container">{{post?.comments ? post.likes.length : 0}}</span>
                              <span class="comments-post-icon-container"> <FontAwesome icon="comment" class="comments-post-icon"/></span>  
                                
                           </div>



                       </div>

                       <!-- if in a post there are multiple picture place a font awesome multiple page -->
                     
                   </li>
</template>

<script>
export default {
    props:{
        post:{
            type:Object,
            required:true
        },
        ViewPostModal:{
            type:Function,
            required:true
        }
    }

}
</script>

<style>
.post-icon-image{
    max-width: 8em;
}

</style>
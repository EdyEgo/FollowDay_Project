<template>
  <div class="profile-container">
        <div class="profile-header">
            <div class="profile-picture-side-section">
                <img src="/images/auth/placeholder.png" alt="Image Placeholder by WingTillDie from Pixabay" v-if="AvatarUrl == null">
                 <img :src="AvatarUrl" alt="User Image" v-if="AvatarUrl">

            </div>
            <div class="profile-infos-side-section">
                <div class="profile-infos__edits-section">
                    <span class="edits-section__user-name">{{user_infos.username}}</span>
                    <span class="edits-section__user-edit-profile">Edit Profile</span>
                    <span class="edits-section__user-settings-cog"><FontAwesome icon="cog"/></span>
                </div>
                <div class="profile-infos__user-following-section desktop">
                    <span class="following-section__posts-number">{{user_infos.posts.length}}</span>
                     <span class="following-section__followers-number">{{user_infos.followers.length}}</span>
                     <span class="following-section__following-number">{{user_infos.following.length}}</span>

                </div>
                <div class="profile-infos__fullname-section">
                    <span class="fullname-section__fullname">{{user_infos.fullname}}</span>

                </div>
            </div>

        </div>
        <div class="profile-activity-content-switch">
            <div class="content-switch__tabs">
               
                <ul class="tabs-activity-list">
                       <router-link :to="{name:'ProfileActivity', params:{activityType:'posts',ids_array:user_infos.posts}}">Posts</router-link>
                       <router-link :to="{name:'ProfileActivity' , params:{activityType:'bookmarks',ids_array:user_infos.posts_bookmarks}}">Saved</router-link>
                </ul>
            </div>

            <div class="switch-activity-nested-content">
                    <router-view :key="$route.path"/>
            </div>


        </div>

  </div>
</template>

<script>
export default {
   computed:{
       user_infos(){
           const auth_module = this.$store.state.auth
           return {// user_history
               username:auth_module.username || 'Username Anonim',
               fullname:auth_module.fullname || 'Full Name Anonim',
               posts:auth_module.posts || [],// remember to take .length
               posts_bookmarks:auth_module.posts_bookmarks || [],
               followers:auth_module.followers || [],
               following:auth_module.following || []
           }
       },
       AvatarUrl(){ return this.$store.state.auth?.profileAvatarUrl},
    //     Test_of(){
    //        const arr = [{id:'hey'},{id:'yo'},3,4];
    //        const somet = [{id:'hoho'},{id:'lolo'}]
    //        arr.push(...somet)
    //        console.log('make it something',arr)
    //        for(const file of arr){
    //            console.log('file is ',file)
    //        }
    //        return 1
    //    }
   }
}
</script>

<style>

</style>
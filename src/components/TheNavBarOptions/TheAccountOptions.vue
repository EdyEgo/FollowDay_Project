<template>
    <div class="account-options-elements">
         <router-link :to="{name:'HomePosts'}" class="home-icon-container-link">
             <FontAwesome icon="home"/>
         </router-link>

         <div class="add-post-wrapper" @click="CallAddPostModal">
             <FontAwesome icon="plus-square"/>
         </div>

         <div class="account-activity-wrapper">
             <FontAwesome icon="heart"/>
         </div>
        
         <div class="user-account-menu-wrapper">
             <div class="account-picture">
                  <FontAwesome icon="portrait"/>
             </div>
             <div class="account-manager-options">
                 <ul class="options-manager">
                     <li class="manager-option" v-for="option in options_manager" :key="option.name">
                           <span class="manager-option_icon">
                                 <FontAwesome :icon="option.icon"/>
                           </span>
                           <span class="manager-option_name">{{option.name}}</span>
                     </li>
                 </ul>
                 <div class="log-out-option">
                     <div class="log-out-manager-btn" @click="LogOut">Log out</div>
                 </div>

             </div>
         </div>


         
    </div>
</template>

<script>
// here $emit events
export default {
    data(){
        return{
            options_manager:[
                {name:'Profile',icon:'portrait'},
                {name:'Settings',icon:'cog'},
                {name:'BookMarks',icon:'bookmark'}
            ]
        }
    },
   methods:{
       CallAddPostModal(){
           console.log('i was called to add a modal so you can add a post')
       },
       LogOut(){

       }
   }
}
</script>

<style scoped>
.account-options-elements{
    display: flex;
}
.user-account-menu-wrapper{
    position: relative;
}
.account-manager-options{
    position: absolute;
    right:0;
    top:180%;
    
}
/* .options-manager{
    margin:0 0;
    padding: 0 0;

} */

</style>
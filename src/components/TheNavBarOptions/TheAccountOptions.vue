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
    justify-content: space-between;
}
.user-account-menu-wrapper{
    position: relative;
}
.account-manager-options{
    position: absolute;
    right:-490%;
    top:180%;
    
}
.manager-option{
    display: flex;
    cursor: pointer;
    margin: 0.4em 0.4em;
}
.manager-option:hover{
    background-color: rgba(201, 200, 200, 0.247);
}
.manager-option_name{
    margin-left:0.2em;
}
.log-out-option{
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.4em 0.4em;
    text-align: left;
    border-top: 1px solid rgba(204, 204, 204, 0.555);
}
.log-out-option:hover{
    color: red;
}
/* .options-manager{
    margin:0 0;
    padding: 0 0;

} */

</style>
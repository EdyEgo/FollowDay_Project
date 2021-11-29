<template>
   <div class="search-bar-container">
       <div class="search-bar-border-eye-visible">
               <FontAwesome icon="search"/>
             <input type="text" class="search-input-bar" v-model="search_text"
                placeholder="Search" @blur="()=>{users_results_are_fetching = false}" 
                @change="HanndleChangeSearch" v-bind="$attrs" @focus="()=>{users_results_are_fetching = true}">
             <span class="cancel-search-menu-btn">
                 x
             </span>
       </div>

       <div class="users_found-toggle-container" v-if="users_found.length >= 1">
           <div v-if="search_text === ''" class="last_searched_users">
               <div class="users-found-header">
                   <div class="users-searched-title">History</div>
                   <div class="clear-users-history-btn">Clear All</div>

               </div>
                
             <div class="users-found-content">
                 <ul class="users-found-list"></ul>
                 <!-- <li><div class="user-found-item-container"><UserTabComponent/></div> <div class="clear-history-user-searched">x</div> </li> -->

             </div>
           </div>
           <div v-if="search_text !== ''" class="users_found__results">
                <div class="users-found-header">
                   <div class="users-searched-title">Results</div>
                   <div class="clear-users-history-btn"></div>

               </div>
               <div class="users-found-content"> 
                    <ul class="users-found-list"></ul>

               </div>

           </div>
       </div>
       <div class="users_found-spinner-login-on-focus" v-if="users_results_are_fetching">
           <p class="info-fetching-results">Results are about to pop up</p>
       </div>
       
   </div>
</template>

<script>


export default {
    inheritAttrs:false,
    data(){
        return{
          last_timeout:null,
        //   last_timeout_fired:false,
          users_found:[],
          users_results_are_fetching:false,
          search_text:'',
          last_timeout_search_index:null
        }
    },
    methods:{
         SendSearchedText(){
            return 1
         },
         HanndleChangeSearch(){
             const trim_user_text = this.search_text.trim()
             if(trim_user_text === '' || trim_user_text.length === 1){
                  return;
             }

            if(this.last_timeout) clearTimeout(this.last_timeout)
 
             this.last_timeout = setTimeout(()=>{
                    this.SendSearchedText()
                    console.log('time out search fired',this.search_text)

             },2000)


             

         }
    }

}
</script>

<style>
.search-bar-border-eye-visible{
    border: 1px solid black;
}
.search-input-bar{
 border: none;
 outline: none;
}

</style>

// import debounce from 'lodash/debounce'
// const PageScrollDirective = {
//   mounted (el, binding) {
//     el.__PageScroll__ = debounce(
//       () => {
//       binding.value()
//     }, 200, { leading: true })
//     document.addEventListener('scroll', el.__PageScroll__)
//   },
//   unmounted (el) {
//     document.removeEventListener('scroll', el.__PageScroll__)
//   }
// }
// export default (app) => {
//   app.directive('page-scroll', PageScrollDirective)
// }
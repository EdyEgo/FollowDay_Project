<template>
  <div class="login-container-page">
      
         <div class="page-login-user" >
             <div class="log-in-user-container" v-if="action === 'login' || action == undefined">
                 <div class="log-in-user__left-side">
                     <p class="placeholder">Log In Please</p>
                 </div>
                 <div class="log-in-user__right-side">
                     <div class="hero-login-section">
                        <div class="form-container">                 
                            <h3 class="logo-title">{{company_name}}</h3>
                            <VeeForm @submit="LogInUser"> 
                                
                                <AppFormField name="email" label="Email" v-model="login_email" :rules="`required|email`"/>
                                <AppFormField  name="password" type="password" v-model="login_password" label="Password" :rules="`required|min:8`"/>
                                <button class="login-submit">Login</button>
                            </VeeForm>
                            <div class="or-line-choose-diff-login-method">
                                <span class="or-left-line or-line"></span>
                                <span>OR</span>
                                <span class="or-right-line or-line"></span>
                            </div>
                        </div>
                        <div class="log-in-with-google-or-facebook">
                            <div class="login-with-facebook"></div>
                            <div class="log-in-with-google"></div>
                        </div>
                     </div>
                     <div class="middle-login-section">
                         <p class="account-question">
                             You don't have an account? 
                             <router-link :to="{name:'LogIn',params:{action:'register'}}">Sign Up</router-link>  
                             <!-- <span class="switch-register" @click="SwitchToPages">Sign Up</span>     -->
                         </p>
                     </div>
                 </div>
             </div>
              <RegisterUser @registerInfo="Register_User" :action="action"/>

         </div>
  </div>
</template>

<script>
import RegisterUser from '@/components/RegisterUser.vue'
export default {
  props:{
      action:{
          type:String,
          required:true
      }
  },
  components:{ RegisterUser },
  data(){
      return{
          company_name:this.$store.state.company_name,
          change_action:this.action,
          login_email:'',
          login_password:'',
 //         register_email:'',
    //      register_password:''
            // register_username:'',
            // register_fullname:''
         
      }
  },
  computed:{
    
  },
  methods:{
     async LogInUser(){
      
       try{
          await this.$store.dispatch('auth/LogIn',{email:this.login_email,password:this.login_password})
           this.login_email = ''
           this.login_password = ''
           this.$router.push({name:'HomePosts'})
       }catch(err){
          console.log('log in error',err)
       }
       
      },
      Register_User(event){
         console.log('register event is :',event)
      },

  }
}
</script>

<style>

</style>
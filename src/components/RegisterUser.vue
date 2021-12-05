<template>
    <div class="page-register-user" v-if="action === 'register'">
      <div class="register-user__left-side">
                <p class="placeholder">Register !</p>
      </div>
            <div class="register-user__right-side">
                <h3 class="logo-title">{{company_name}}</h3>
                <VeeForm @submit="SendRegisterInfos"> 
                
                <AppFormField name="email" label="Email" v-model="email" :rules="`required|email`"/>
                <AppFormField  name="password" type="password" v-model="password" label="Password" :rules="`required|min:8`"/>
                <AppFormField  name="username" label="UserName" v-model="username" :rules="`required|min:5`"/>
                <AppFormField  name="fulusername" label="Full Name" v-model="fullname" :rules="`required|min:3`"/>

                <button class="register-submit">Finish Register</button>
                </VeeForm>
            </div>

    </div>
   
</template>

<script>
export default {
    props:{
        action:{
            type:String,
            default:''
        }
    },
    data(){
        return {
             email:'',
             password:'',
             username:'',
             fullname:'',
             company_name:this.$store.state.company_name
        }
    },
    methods:{
        SendRegisterInfos(){
             this.$emit('registerInfo',{register_email:this.email,register_password:this.password,register_username:this.username,register_fullname:this.fullname})
        }
    }

}
</script>

<style>

</style>
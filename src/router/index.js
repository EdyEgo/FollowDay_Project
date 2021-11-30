import {createRouter,createWebHistory} from 'vue-router'
import store from '@/store'

const routes=[
    {
        name:'HomePosts',
        path:'/',
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageHome')
    },
    {
        name:'LogIn',
        path:'/login/:action',
        props:true,
        meta:{doesNotRequireAuth:true},
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageLogin')
    },
    {
        name:'Register',
        path:'/register',
        props:true,
        meta:{doesNotRequireAuth:true},
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageLogin')
    },


]


const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach(async (to,from)=>{
    console.log('to',to,from)
    if(to.meta?.doesNotRequireAuth !== true && store.state.auth_user === null){
         return {name:'LogIn',params:{action:'login'}}
    }
  //await this.$store.dispatch('Watch_state_auth_changes')
 // await store.dispatch('Watch_state_auth_changes')
})
export default router
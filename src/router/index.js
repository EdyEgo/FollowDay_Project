import {createRouter,createWebHistory} from 'vue-router'
import store from '@/store'

const routes=[
    {
        name:'HomePosts',
        path:'/',
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageHome')
    },
    {
        name:'PageProfile',
        path:'/profile',
        children:[
            {
                name:'ProfileActivity',
                path:':activityType',
                props:true,
                component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/ProfileActivityContent')   
            }
        ],
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageProfile')   
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



router.beforeEach(async (to)=>{
   
 //  await  store.dispatch('auth/initAuthentication')
    console.log('shit',to.meta?.doesNotRequireAuth,store.state.auth.loged_in_user_obj)
    if(to.meta?.doesNotRequireAuth !== true && store.state.auth.loged_in_user_obj.id == null){
       
         return {name:'LogIn',params:{action:'login'}}
    }
    // if(to.meta.doesNotRequireAuth && store.state.auth.auth_user != null){//to not be able to log in or register if you allready are
    //     return {name:'HomePosts'}
    // }
 console.log(to,store)
})
export default router
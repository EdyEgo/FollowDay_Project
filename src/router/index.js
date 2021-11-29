import {createRouter,createWebHistory} from 'vue-router'
//import store from '@/store'

const routes=[
    {
        name:'HomePosts',
        path:'/',
        component:()=>import(/* webpackChunkName: "HomePosts" */ '@/view/PageHome')
    }

]


const router = createRouter({
    history:createWebHistory(),
    routes
})

router.beforeEach(async (to,from)=>{
    console.log('to',to,from)
  //await this.$store.dispatch('Watch_state_auth_changes')
 // await store.dispatch('Watch_state_auth_changes')
})
export default router
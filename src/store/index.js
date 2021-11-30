import { createStore } from 'vuex'
//import firebase from '@/helpers/firebase'
import getters from '@/store/getters'
import actions from '@/store/actions'
import mutations from '@/store/mutations'
import posts from './modules/posts'
import users from './modules/users'
import auth from './modules/auth'

export default createStore({
    modules:{
        posts,
        users,
        auth
    },
   state:{
       user_unsubscribe:null,
       company_name:'FollowDay',
        auth_user:null,
        user_uId:null,
       chatback_categories:[
           {
               id:'brlp_post',
               name:'cats',
               posts:[
                 'heytest'
               ],
               text:'Cats And Fish',
               userId:'brlp'
           }
       ],
       chatback_comments:[
           {
               id:'veryfishy',
               postId:'heytest',
               text:'Hello friends do you need some food , for your cats?',
               userId:'pifqobsdojb'
           }
       ],
       chatback_users:[
           {
             id:'ikea is for me',
             username:'I am your angry cat',
             postsIds:['heytest'],
             commentsIds:[],
             bio:'i meow much',
             email:'meow.mewo@gmail.com',
             
           },
           {
               id:'pifqobsdojb',
               username:'I am your angry doggy',
               postsIds:[],
               commentsIds:[
                'veryfishy'
               ],
               bio:'i meow much',
               email:'meow.mewo@gmail.com',
           }
       ],
       chatback_posts:[
           {
               id:'heytest',
               title:'A Message from above',
               text:'First one , btw do you love the very mister fish of mine?',
               userId:'ikea is for me',
               commentsIds:[
                 'veryfishy'
               ]
           }
       ],
       logedInUser:{id:'eqiqpg',name:'Anonim'},
       unsubscribes:[]
   },
   getters,
   actions,
   mutations

//    getters:{
//     //   get  PushComments(){
//     //        return new Propmise((resolve))
//     //   }
//    },
//    actions:{
   
//     //         Recall_auth_state_change_command({commit},recall_value){
//     //             commit('auth_state_change_value',recall_value)
//     //         },
//     //        async Watch_state_auth_changes({commit}){
//     //            const unsubscribe = await firebase.auth().onAuthStateChanged(async (user)=>{
//     //                console.log('user state has changed',user)
//     //                commit('write_user_uId_and_email',{email:user?.email,uId:user?.uid})
                  
//     //             //    if(state.user_unsubscribe != null)
//     //                commit('unSubUserStateChange')
//     //            })
               

//     //            commit('memorize_unsub_function',unsubscribe)
//     //         },
    
     
    
//     //    async RegisterUser({state,commit},{email,password}){
//     //        if(state.auth_user != null) return;
          
//     //        const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
//     //        commit('remember_new_user',result)
           
//     //    },
//     //    async LogInExistingUser({state,commit},{email,password}){
//     //        if(state.auth_user != null) return;
//     //        const result = await firebase.auth().signInWithEmailAndPassword(email, password)
//     //        const userId = firebase.auth().currentUser?.uid
//     //        console.log('current loged user info ',userId)
//     //        commit('remember_new_user',{userCread:result,userId})
//     //        return true
//     //    },
//     //    async LogOutUser({commit}){
//     //     const signed_out =   await firebase.auth().signOut()
//     //     console.log('signed out user has this value',signed_out)
//     //      commit('sign_out_user',null)

//     //    }
//     // //    AddCommentsToPost({commit},{postId,commentObject}){

//     // //    }


//    },
//    mutations:{
//     //    memorize_unsub_function(state,unsub_func){
//     //     state.unsubscribes = unsub_func
//     //    },
//     //    remember_new_user(state,{userCread,userId = ''}){
//     //          state.auth_user = userCread.user.email
//     //          state.user_uId = userId
//     //          console.log('user is now this ',state.auth_user,'and his id', state.user_uId,'||',userCread.user.email)
//     //    },
//     //    write_user_uId_and_email(state,{uId,email}){
//     //         state.auth_user = email
//     //         state.user_uId = uId
//     //    },
//     //    unSubUserStateChange(state){
//     //        if(state.unsubscribes != null){
//     //          state.unsubscribes()
//     //          state.unsubscribes = null

//     //        }
//     //    },
//     //    sign_out_user(state,replace_user_with_this_value){
//     //      state.auth_user = replace_user_with_this_value
//     //    },
//     //    push_to_commnets(state,comment_obj){
           
//     //         state.chatback_comments.push(comment_obj)
           

//     //         console.log('now the state is at least on commnets',state.chatback_comments)
//     //    },
//     //    push_to_commnetsFromFirestore(state,{comment_obj,commentId}){
//     //     comment_obj['id'] = commentId
//     //     console.log('hello man mutation',comment_obj,'and state',state)
//     //     state.chatback_comments.push(comment_obj)

//     //    },
//     //    add_category_to_state(state,create_category_obj){
//     //         state.chatback_categories.push(create_category_obj)
//     //    }  
//    }
})

// you can create with modules{here place sets of actions}
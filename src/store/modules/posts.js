import firebase from '@/helpers/firebase'
export default {
    namespaced: true,
    state:{
        other_users_viewed:[
            // {
            //     id:'brlp',
            //     postsId:[],
            //     postsViewed:[
            //         { // just the hole post obj
            //             id:'sss',
            //             pictureUrls:[]
            //         }
            //     ],
                //bookmarksViewed:[// incorrect only you have acces to them go in auth_user_history
                      {

                      }
             //  ]
            // },
            

        ],
        // posts_viewd:[
        //     {
        //         user_id:'brlp',
        //         postsIds_viewed:['brpltwo']
        //     }
        // ]

    },
    getters: {},
    actions:{
    //    async getUserInfo(,{}){
            
    //    },
    async getUserObjByIdFromDataBase({commit},{userId}){
        console.log('i was TTT 22')
            return new Promise((resolve)=>{
                 
                const async_fetch_user = async ()=>{
                const user_database = await firebase.firestore().collection('users').doc(userId).get() //await
                const user_obj = {id:user_database.id,...user_database.data()}
                console.log('i was TTT',user_obj)
                commit('write_user_to_other_users_viewed',{user_obj})
                return user_obj
                }
                
               const user_obj = async_fetch_user()
              
                resolve(user_obj)
            })
    },
    async getPostsFromDataBase({commit,dispatch},{quantity,postsIds,userId = '',getCollection = 'posts',forTypeBookmarksAuth = false,resorseHasNoContent = false}){
        return new Promise((resolve)=>{// use write_user_to_other_users_viewed(state,{user_obj})
            const return_all_req_posts = async()=>{
                let posts_number_fetched = 0
                const posts_objects_found = []
               
                for(const postId of postsIds){
                    posts_number_fetched += 1
                    if(posts_number_fetched >= quantity) break
                    const post_database = await firebase.firestore().collection(getCollection).doc(postId.trim()).get()
                    
                    if(post_database.exists){
                       
                        const post_object = {id:post_database.id,...post_database.data()}
                        posts_objects_found.push(post_object)
                      
                    }
                }

                if(forTypeBookmarksAuth && resorseHasNoContent){
                  // make here an action to write the posts to auth loged_in_user_obj.bookmarksViewed
                  dispatch('auth/write_auth_bookmarks_view_posts',{posts_objects_found},{root:true})
                    return 
                }
                commit('write_user_postsViewed',{posts_objects:posts_objects_found,userId})
                return posts_objects_found
               
            }
            return_all_req_posts()
           
            
            resolve(true)
        })
    },

     async getInitialPostsByIds({state,dispatch},{userId,getCollection = 'posts',for_type = 'posts'}){// for when you load or reload in a page
        // return new Promise((resolve)=>{// first find the user in db or locally then
             
        //     const async_function_initial_posts = async ()=>{

            
        //     const user_is_local_available = for_type === 'posts' ? 
        //           state.other_users_viewed.find((user_obj)=>user_obj.id === userId) : dispatch('auth/user_has_viewed_some_initital_bookmarks')
             
        //     const post_local = typeof user_is_local_available === 'object'
        //     const user_obj_ = post_local ?  post_local : await dispatch('getUserObjByIdFromDataBase',{userId})//await
        //     // return true then find the in state by user id , and go to viewd post and if the viewed is shorter then available posts call this function 
        //     // on scroll
        //     const requested_user_has_posts = user_obj_.postsId?.length > 0
        //     const current_user_has_viewed_some_requested_user_posts =requested_user_has_posts ? 
        //            Array.isArray(user_obj_?.postsViewed) ? 
        //                  user_obj_.postsViewed.length > 1 : 'look for posts in database' : null
        //      if(current_user_has_viewed_some_requested_user_posts === 'look for posts in database'){
        //        await dispatch('getPostsFromDataBase',{quantity:5,postsIds:user_obj_.postsId,userId,getCollection})
        //      }
        //    //  if(current_user_has_viewed_some_requested_user_posts === true)

        //     }
            const initial_posts = async ()=>{ // rewrite
                const user_posts_to_view_is_local_available = for_type === 'posts' ? 
                state.other_users_viewed.find((user_obj)=>user_obj.id === userId && user_obj.postsViewed) : await dispatch('auth/user_has_viewed_some_initital_bookmarks',{hey:'ll'},{root:true})
                const posts_exist_in_local = typeof user_posts_to_view_is_local_available === 'object'
                console.log('aci ai problema',user_posts_to_view_is_local_available,'aha',state.other_users_viewed.find((user_obj)=>user_obj.id === userId),'frate', state.other_users_viewed)
                const user_obj_ = posts_exist_in_local ?  posts_exist_in_local : await dispatch('getUserObjByIdFromDataBase',{userId})//await
               
                const requested_user_has_posts = for_type === 'posts' ? user_obj_.postsId?.length > 0 : user_obj_.bookmarksIds?.length > 0//user_obj_.postsId?.length > 0
                const current_user_has_viewed_some_requested_user_posts =requested_user_has_posts ? 
                   Array.isArray(user_obj_?.postsViewed) ? 
                         user_obj_.postsViewed.length > 1 : 'look for posts in database' : null
             if(current_user_has_viewed_some_requested_user_posts === 'look for posts in database'){
                console.log('hello sirrrrrrrrrr')
                 const postsIds = for_type === 'posts' ? user_obj_.postsId : user_obj_.bookmarksIds
                 const forTypeBookmarksAuth = for_type !== 'posts' 
               await dispatch('getPostsFromDataBase',{quantity:5,postsIds,userId,getCollection,forTypeBookmarksAuth,resorseHasNoContent:true})
             }


            }
          //  async_function_initial_posts()
            initial_posts()
            // resolve(true)
      //   })
     },
     async getNextPostsByViewdPost_UserId(){// compare postsIds with viewed posts id in user_object that you wanna post view

     }
    },
    mutations:{
        write_user_to_other_users_viewed(state,{user_obj}){
            if(Array.isArray(state.other_users_viewed)){
                state.other_users_viewed.push(user_obj)
                return
            }  
            state['other_users_viewed'] = [user_obj]      
        },
        write_user_postsViewed(state,{posts_objects,userId}){
            console.log('did firestore find it?',posts_objects,userId)
            state.other_users_viewed.find((user_object,index_users_viewed_array)=>{
                if(user_object.id === userId){
                     if(Array.isArray(state.other_users_viewed[index_users_viewed_array]['postsViewed'])){
                        state.other_users_viewed[index_users_viewed_array]['postsViewed'].push(...posts_objects)
                     }
                     state.other_users_viewed[index_users_viewed_array]['postsViewed'] = [...posts_objects]
                }
            })
             
        }
    }
}   
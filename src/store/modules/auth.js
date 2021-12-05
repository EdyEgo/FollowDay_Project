import firebase from '@/helpers/firebase'

//import useNotifications from '@/composables/useNotifications' // poinless
export default {
  namespaced: true,
  state: {
    authId: null,
    authUserUnsubscribe: null,
    authObserverUnsubscribe: null,
    loged_in_user_obj:{
      loged_all_post:false,
      loged_all_bookmarks:false,
      bookmarksViewed:[

      ]
    },
    // saved_users_objects:{
    //   some_random_user_id_name:{}
    // }
  },
  getters: {
    // authUser: (state, getters, rootState, rootGetters) => {
    //   return rootGetters['users/user'](state.authId)
    // }
  },
  actions: {
    user_has_viewed_some_initital_bookmarks({state},{hey}){
      console.log('i was here',hey,state.loged_in_user_obj.bookmarksViewed.length > 0)
      const bookmarks_viewd =  state.loged_in_user_obj.bookmarksViewed
      if(bookmarks_viewd.length > 0) return bookmarks_viewd
      return false
      
    },
    // async updateEmail ({ state }, { email }) {
    //   return firebase.auth().currentUser.updateEmail(email)
    // },
    // async reauthenticate ({ state }, { email, password }) {
    //   const credential = firebase.auth.EmailAuthProvider.credential(email, password)
    //   await firebase.auth().currentUser.reauthenticateWithCredential(credential)
    // },
    // initAuthentication ({ dispatch, commit, state }) {
    //   if (state.authObserverUnsubscribe) state.authObserverUnsubscribe()
    //   return new Promise((resolve) => {
    //     const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    //       dispatch('unsubscribeAuthUserSnapshot')
    //       if (user) {
    //         await dispatch('fetchAuthUser')
    //         resolve(user)
    //       } else {
    //         resolve(null)
    //       }
    //     })
    //     commit('setAuthObserverUnsubscribe', unsubscribe)
    //   })
    // },
    // async registerUserWithEmailAndPassword ({ dispatch }, { avatar = null, email, name, username, password }) {
    //   const result = await firebase.auth().createUserWithEmailAndPassword(email, password)
    //   avatar = await dispatch('uploadAvatar', { authId: result.user.uid, file: avatar })
    //   await dispatch('users/createUser', { id: result.user.uid, email, name, username, avatar }, { root: true })
    // },
    // async uploadAvatar ({ state }, { authId, file, filename }) {
    //   if (!file) return null
    //   authId = authId || state.authId
    //   filename = filename || file.name
    //   try {
    //     const storageBucket = firebase.storage().ref().child(`uploads/${authId}/images/${Date.now()}-${filename}`)
    //     const snapshot = await storageBucket.put(file)
    //     const url = await snapshot.ref.getDownloadURL()
    //     return url
    //   } catch (error) {
    //     const { addNotification } = useNotifications()
    //     addNotification({ message: 'Error uploading avatar image', type: 'error' })
    //   }
    // },
    // signInWithEmailAndPassword (context, { email, password }) {
    //   return firebase.auth().signInWithEmailAndPassword(email, password)
    // },
    // async signInWithGoogle ({ dispatch }) {
    //   const provider = new firebase.auth.GoogleAuthProvider()
    //   const response = await firebase.auth().signInWithPopup(provider)
    //   const user = response.user
    //   const userRef = firebase.firestore().collection('users').doc(user.uid)
    //   const userDoc = await userRef.get()
    //   if (!userDoc.exists) {
    //     return dispatch('users/createUser',
    //       { id: user.uid, name: user.displayName, email: user.email, username: user.email, avatar: user.photoURL },
    //       { root: true }
    //     )
    //   }
    // },
    // async signOut ({ commit }) {
    //   await firebase.auth().signOut()

    //   commit('setAuthId', null)
    // },
    // fetchAuthUser: async ({ dispatch, state, commit }) => {
    //   const userId = firebase.auth().currentUser?.uid
    //   if (!userId) return
    //   await dispatch('fetchItem', {
    //     emoji: '🙋',
    //     resource: 'users',
    //     id: userId,
    //     handleUnsubscribe: (unsubscribe) => {
    //       commit('setAuthUserUnsubscribe', unsubscribe)
    //     }
    //   },
    //   { root: true }
    //   )
    //   commit('setAuthId', userId)
    // },
    // async fetchAuthUsersPosts ({ commit, state }, { startAfter }) {
    //   // limit(10)
    //   // startAfter(doc)
    //   // orderBy()
    //   let query = await firebase.firestore().collection('posts')
    //     .where('userId', '==', state.authId)
    //     .orderBy('publishedAt', 'desc')
    //     .limit(10)
    //   if (startAfter) {
    //     const doc = await firebase.firestore().collection('posts').doc(startAfter.id).get()
    //     query = query.startAfter(doc)
    //   }
    //   const posts = await query.get()
    //   posts.forEach(item => {
    //     commit('setItem', { resource: 'posts', item }, { root: true })
    //   })
    // },
    // async unsubscribeAuthUserSnapshot ({ state, commit }) {
    //   if (state.authUserUnsubscribe) {
    //     state.authUserUnsubscribe()
    //     commit('setAuthUserUnsubscribe', null)
    //   }
    // }

   async find_loged_in_user_obj({commit},{userId}){
         return new Promise((resolve)=>{
             const find_user_obj_in_database = async ()=>{
                   const data_base_check = await firebase.firestore().collection('users').doc(userId).get()
                   if(data_base_check.exist){
                      const user_obj = {id:data_base_check.id,...data_base_check.data()}
                      commit('add_to_loged_user_object',{user_obj})
                   }
             }
             find_user_obj_in_database()
             resolve(true)
            
         })
   },// pointless

  async  initAuthentication({dispatch,commit}){
     
      // state.user_unsubscribe()
       dispatch('unsubscribeAuthUserSnapshot')
    return new Promise((resolve)=>{
      const unsubscribe = firebase.auth().onAuthStateChanged(async (user)=>{
        if(user){
          const userCred = await firebase.auth()
          const user = userCred.currentUser
          const userEmail = user.email
          const userId = user?.uid
          // here go in store and take the user obj and store in state.loged_in_user_obj
        // await dispatch('find_loged_in_user_obj',{userId})
         commit('setUserIds',{user:userEmail,userId})
        await dispatch('updateUserInfo',{userId,once:true})
      //   this.$router.push({name:'HomePosts'})
        resolve(user)
        }

      })
      console.log('unsub',unsubscribe)
      // commit('setAuthUserUnsubscribe',unsubscribe) // here is the problem fk you vue 3
    })
        
        // state.user_unsubscribe = unsubscribe
    },
     updateUserInfo({commit},{userId,once = false}){
       return new Promise((resolve)=>{
          const unSubscribe = firebase.firestore().collection('users').doc(userId).onSnapshot((doc)=>{
            if(once) unSubscribe()
              
            if(doc.exists){
              const user_info = {...doc.data(),user_id:doc.id}
              
              commit('setUserHistoryObj',{user_info})
              
            }
          
          resolve(unSubscribe)
        })
      })
     
    },
    async LogIn({state,commit},{email,password}){
    
      if(state.auth_user != null) return;
       await firebase.auth().signInWithEmailAndPassword(email, password)
      const userCred = await firebase.auth()
    
      
      const user = userCred.currentUser?.email
      const userId = userCred.currentUser?.uid
      console.log('log in action',userCred,user,userId)
      commit('setUserIds',{user,userId:userId})
    },
    async logOut({commit}){
        await firebase.auth().signOut()
          commit('setUserIds',{user:null,userId:null})
    }, 

   async unsubscribeAuthUserSnapshot({state,commit}){
        if(state.user_unsubscribe) {
          state.user_unsubscribe()
          console.log('hey',commit)
        //   commit('setAuthUserUnsubscribe',null) // same here
        } 
   },
   write_auth_bookmarks_view_posts({commit},{posts_objects_found}){
          commit('mutate_loged_user_viewed_bookmarks',{posts_objects_found})
   }
   
  },
  mutations: {
    // remember_logedin_user(state,{user,userId}){
    //   state.auth_user = user.email
    //   state.user_uId = userId
    // },
    setUserHistoryObj(state,{user_info}){
    
       //  state.user_history = user_info
       state.loged_in_user_obj = {...state.loged_in_user_obj,...user_info}
    },
    setUserIds(state,{user,userId}){
      state.loged_in_user_obj.id = userId
      state.loged_in_user_obj.useremail = user
      // state.auth_user = user
      // state.user_uId = userId

      console.log('wierd',state.auth_user,state.user_uId)
    },
    setAuthUserUnsubscribe(state,value_to_be_set){
      state.user_unsubscribe = value_to_be_set
    },
    add_to_loged_user_object(state,{user_obj}){
           state.loged_in_user_obj = {...user_obj}
    },// poitless
    mutate_loged_user_viewed_bookmarks(state,{posts_objects_found}){
      console.log('did i find?',posts_objects_found)
             state.loged_in_user_obj.bookmarksViewed.push(...posts_objects_found)
    }

    // setAuthId (state, id) {
    //   state.authId = id
    // },
    // setAuthUserUnsubscribe (state, unsubscribe) {
    //   state.authUserUnsubscribe = unsubscribe
    // },
    // setAuthObserverUnsubscribe (state, unsubscribe) {
    //   state.authObserverUnsubscribe = unsubscribe
    // }
  }
}

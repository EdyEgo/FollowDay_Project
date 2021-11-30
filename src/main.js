import { createApp } from 'vue'
import App from './App.vue'
import firebase from '@/helpers/firebase'
import firebaseConfig from '@/config/firebase'
import store from '@/store'
import router from '@/router'
import VeeValidate from '@/plugins/VeeValidatePlugin'
import FontAwesome from '@/plugins/FontAwesome'
import ClickOutSideDirective from '@/plugins/ClickOutSideDirective'

firebase.initializeApp(firebaseConfig)

const follow_day =createApp(App)

//follow_day.component(NavBar)
follow_day.use(store)
follow_day.use(router)
follow_day.use(VeeValidate)
follow_day.use(FontAwesome)
follow_day.use(ClickOutSideDirective)

const requireComponent = require.context('./components', true, /App[A-Z]\w+\.(vue|js)$/)
requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  follow_day.component(baseComponentName, baseComponentConfig)
})






follow_day.mount('#app')

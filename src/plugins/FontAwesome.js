import { library } from '@fortawesome/fontawesome-svg-core'
import {faHome,faCompass,faPlusSquare,faHeart, faPortrait, faBookmark, faCog,faWater,faSearch,faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome,faCompass,faPlusSquare,faHeart,faPortrait,faCog,faBookmark,faWater,faSearch,faComment)
//  <FontAwesome icon="portrait"/>
export default (app) => {
    app.component('FontAwesome', FontAwesomeIcon)
  } 
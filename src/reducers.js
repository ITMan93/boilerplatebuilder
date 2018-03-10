import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from 'api/modules/auth'
import document from 'api/modules/document'

export default combineReducers({
  routing: routerReducer,
  auth,
  document
})

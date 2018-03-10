import { all } from 'redux-saga/effects'
import auth from './auth'
import document from './document'

export default function* rootSaga() {
  yield all([auth(), document()])
}

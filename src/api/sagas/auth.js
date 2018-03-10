import { takeLatest } from 'redux-saga/effects'
import { LOGIN, LOGOUT } from 'api/modules/auth'
import request from 'utils/request'

const doLogin = request({
  type: LOGIN,
  method: 'POST',
  url: 'login',
  success: (res, action) => {
    console.log(action);
    localStorage.setItem('token', JSON.stringify(res.data))
  },
})

const doLogout = request({
  type: LOGOUT,
  method: 'POST',
  url: 'logout',
  success: (res, action) => {
    localStorage.removeItem('token')
  },
  fail: (res, action) => {
    localStorage.removeItem('token')
  },
})

export default function* rootSaga() {
  yield takeLatest(LOGIN, doLogin)
  yield takeLatest(LOGOUT, doLogout)
}

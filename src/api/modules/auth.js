import { createAction, handleActions } from 'redux-actions'
import { requestSuccess, requestFail } from 'utils/request'

// ------------------------------------
// Constants
// ------------------------------------
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------

export const logIn = createAction(LOGIN)
export const logOut = createAction(LOGOUT)

const token = localStorage.getItem('token')

const initialState = {
  token,
  status: 'INIT',
  error: null,
}
// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(
  {
    [requestSuccess(LOGIN)]: (state, { payload }) => ({
      ...state,
      token: payload,
      status: requestSuccess(LOGIN),
    }),

    [requestFail(LOGIN)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: requestFail(LOGIN),
      error: payload,
    }),

    [requestSuccess(LOGOUT)]: (state, { payload }) => ({
      ...state,
      token: null,
      status: requestSuccess(LOGOUT),
    }),

    [requestFail(LOGOUT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(LOGOUT),
      token: null,
      error: payload,
    }),
  },
  initialState
)

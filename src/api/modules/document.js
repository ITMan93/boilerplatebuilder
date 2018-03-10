import { createAction, handleActions } from 'redux-actions';
import { requestSuccess, requestFail } from 'utils/request';

// ------------------------------------
// Constants
// ------------------------------------
export const GET_DOCUMENTS = 'GET_DOCUMENTS';
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT';
export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT';
export const DELETE_DOCUMENT = 'DELETE_DOCUMENT';
export const SEARCH_DOCUMENT = 'SEARCH_DOCUMENT';

// ------------------------------------
// Actions
// ------------------------------------

export const getDocuments   = createAction(GET_DOCUMENTS);
export const createDocument = createAction(CREATE_DOCUMENT);
export const updateDocument = createAction(UPDATE_DOCUMENT);
export const deleteDocument = createAction(DELETE_DOCUMENT);
export const searchDocument = createAction(SEARCH_DOCUMENT);

const initialState = {
  documents: [],
  status: 'INIT',
  error: null,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions(
  {
    [requestSuccess(GET_DOCUMENTS)]: (state, { payload }) => ({
      ...state,
      documents: payload,
      status: requestSuccess(GET_DOCUMENTS),
    }),

    [requestFail(GET_DOCUMENTS)]: (state, { payload }) => ({
      ...state,
      status: requestFail(GET_DOCUMENTS),
      error: payload,
    }),

    [requestSuccess(SEARCH_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      documents: payload,
      status: requestSuccess(SEARCH_DOCUMENT),
    }),

    [requestFail(SEARCH_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(SEARCH_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(CREATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(CREATE_DOCUMENT),
    }),

    [requestFail(CREATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(CREATE_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(UPDATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(UPDATE_DOCUMENT),
    }),

    [requestFail(UPDATE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(UPDATE_DOCUMENT),
      error: payload,
    }),

    [requestSuccess(DELETE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestSuccess(DELETE_DOCUMENT),
    }),

    [requestFail(DELETE_DOCUMENT)]: (state, { payload }) => ({
      ...state,
      status: requestFail(DELETE_DOCUMENT),
      error: payload,
    }),


  },
  initialState
);

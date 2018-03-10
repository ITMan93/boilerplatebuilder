import { takeLatest, takeEvery, call } from 'redux-saga/effects';
import {
  GET_DOCUMENTS,
  CREATE_DOCUMENT,
  UPDATE_DOCUMENT,
  DELETE_DOCUMENT,
  SEARCH_DOCUMENT,
} from 'api/modules/document';

import request from 'utils/request';

const getDocuments = request({
  type: GET_DOCUMENTS,
  method: 'GET',
  url: 'my/documents',
});

const createDocument = request({
  type: CREATE_DOCUMENT,
  method: 'POST',
  url: 'document',
});

const updateDocument = request({
  type: UPDATE_DOCUMENT,
  method: 'PUT',
  url: 'document'
});

const deleteDocument = function* (action) {
  const apiRequest = request({
    type: DELETE_DOCUMENT,
    method: 'DELETE',
    url: 'document/' + action.payload.id,
    success: action.payload.success
  });
  yield call(apiRequest, action.payload)
};

const searchDocument = function* (action) {
  const apiRequest = request({
    type: SEARCH_DOCUMENT,
    method: 'GET',
    url: 'my/documents/' + action.payload.searchValue,
  });
  yield call(apiRequest, action.payload)
};

export default function* rootSaga() {
  yield takeLatest(GET_DOCUMENTS, getDocuments);
  yield takeLatest(SEARCH_DOCUMENT, searchDocument);
  yield takeEvery(CREATE_DOCUMENT, createDocument);
  yield takeEvery(UPDATE_DOCUMENT, updateDocument);
  yield takeEvery(DELETE_DOCUMENT, deleteDocument);
}

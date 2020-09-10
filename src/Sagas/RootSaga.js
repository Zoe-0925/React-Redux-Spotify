import { ApiSaga } from "./ApiSagas"
import { LibrarySaga } from "./LibrarySagas"
import { all } from 'redux-saga/effects';

export default function* RootSaga() {
     yield all([...ApiSaga, ...LibrarySaga])
}
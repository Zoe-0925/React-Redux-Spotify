import { ApiSaga } from "./Api.sagas"
import { LibrarySaga } from "./Library.sagas"
import { all } from 'redux-saga/effects';

export default function* RootSaga() {
     yield all([...ApiSaga, ...LibrarySaga])
}
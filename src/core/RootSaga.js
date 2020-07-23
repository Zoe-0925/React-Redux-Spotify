import { ApiSaga } from "./api/sagas"
import { LibrarySaga } from "./library/sagas"
import { PlayerSaga } from "./player/sagas"
import { all } from 'redux-saga/effects';

export default function* RootSaga() {
     yield all([...ApiSaga, ...LibrarySaga, ...PlayerSaga])
}
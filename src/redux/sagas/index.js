import { all } from 'redux-saga/effects';
import { fetchLogin, fetchRegister } from "./auth.sagas";
import { fetchDashboard } from './dashboard.saga';
export default function* rootSaga() {
    yield all([
        fetchLogin(),
        fetchRegister(),
        fetchDashboard(),
    ])
}
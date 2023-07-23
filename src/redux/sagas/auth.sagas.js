import { call, put, takeLatest  } from 'redux-saga/effects';  //takeLatest
import * as actions from '../actions/auth.actions';
import * as constants from '../constants/auth.constants';
import paths from '../../api/path';
import NetworkApi from '../../api/NetworkApi';


export function* authRegister(request = {}) {
    const { payload = {} } = request;
  try{
    const response = yield call(NetworkApi.post, paths.validateRegisterURL, payload, );
    console.log(response);
    if(response && response.success === true){
      const {
        _id, name
      } = response.data;
        localStorage.setItem('userName', name);
        localStorage.setItem('userId', _id !== undefined && _id !== null ? _id : "-1");
          
        yield put(actions.userValidationSuccessful(response));
    } else {
      const message = response?.message ? (
        response?.message
      ) : (
        ''
      );
      yield put(actions.userValidationFailed(message));
    }
  }
  catch(error){

  }
}



export function* authLogin(request = {}) {
  const { payload = {} } = request;
  const {
    userphone,
    userpassword
  } = payload;
  try {
    const response = yield call(NetworkApi.post, paths.validateLoginURL, {
        userphone,
        userpassword,
    }, );
    if (response && response.success === true) {
      const {
        _id, name
      } = response.data;
        localStorage.setItem('userName', name);
        localStorage.setItem('userId', _id !== undefined && _id !== null ? _id : "-1");
          
        yield put(actions.userValidationSuccessful(response));
    } else {
      const message = response?.message ? (
        response?.message
      ) : (
        ''
      );
      yield put(actions.userValidationFailed(message));
    }

  } catch (error) {
    const message = error?.response?.non_field_errors ? (
      error.response.non_field_errors
    ) : (
      ''
    );
    yield put(actions.userValidationFailed(message));
  }
}

export function* fetchLogin() {
  yield takeLatest(constants.LOGIN_USER, authLogin);
}
export function* fetchRegister()  {
  yield takeLatest(constants.REGISTER_USER, authRegister);
}

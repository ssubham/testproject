import { call, put, takeLatest  } from 'redux-saga/effects';  //takeLatest
import * as actions from '../actions/dashboard.actions';
import * as constants from '../constants/dashboard.constants';
import paths from '../../api/path';
import NetworkApi from '../../api/NetworkApi';

export function* getDashboardData(request = {}) {
    console.log('getDashboardData ')
  try{
    const response = yield call(NetworkApi.get, paths.dashBoardURL)
    // console.log(response);
    if(response && response.count>0){
        // console.log(response.entries);
        yield put(actions.successDashboardData(response.entries))
    } else {
        yield put(actions.failedDashboardData({message:'Data is not available.'}))
    }
  }
  catch(error){
    const message = error?.response?.non_field_errors ? (
        error.response.non_field_errors
      ) : (
        ''
      );
      yield put(actions.failedDashboardData(message));
  }
}
export function* fetchDashboard()  {
    yield takeLatest(constants.GET_DASHBOARD, getDashboardData);
  }
  
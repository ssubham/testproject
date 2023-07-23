import { FAILED_GET_DASHBOARD, SUCCESS_GET_DASHBOARD, GET_DASHBOARD, CLEAR_DASHBOARD } from '../constants/dashboard.constants';

export const successDashboardData = (data) => {
    return {
        type: SUCCESS_GET_DASHBOARD,
        data
    }
}
export const failedDashboardData = (data) => {
    return {
        type: FAILED_GET_DASHBOARD,
        data
    }
}
export const clearDashboardData = () => {
    return {
        type: CLEAR_DASHBOARD,
    }
}
export const getDashboardData = (payload) =>{
    return {type: GET_DASHBOARD, payload}

}
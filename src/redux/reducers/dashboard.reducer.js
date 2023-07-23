import {GET_DASHBOARD, SUCCESS_GET_DASHBOARD, FAILED_GET_DASHBOARD, CLEAR_DASHBOARD } from '../constants/dashboard.constants';

const initialState = {

    dashboardDetails: {
        isSuccess: false,
        isFailure: false,
        isLoading: false,
        message: null,
        data: null,
    }
};


export const dashboardReducer = (state = initialState, action) =>{
    const {payload, type } = action;
    switch(type){
        case GET_DASHBOARD: 
            return {
                ...state,
                dashboardDetails: {
                    isLoading: true,
                    isSuccess: false,
                    isFailure: false,
                    data: null,
                    message: null,
                },
            }
        case FAILED_GET_DASHBOARD: 
        return {
            ...state,
            dashboardDetails: {
                isLoading: false,
                isSuccess: false,
                isFailure: true,
                data: null,
                message: payload,
            },
        }
        case SUCCESS_GET_DASHBOARD: 
        return {
            ...state,
            dashboardDetails: {
                isLoading: false,
                isSuccess: true,
                isFailure: false,
                data: action.data,
                message: null,
            },
        }
        case CLEAR_DASHBOARD: 
        return {
            ...state,
            dashboardDetails: {
                isLoading: false,
                isSuccess: null,
                isFailure: false,
                data: null,
                message: null,
            },
        }
        default:
            return state;
    }
}
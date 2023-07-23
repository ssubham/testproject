import * as authConstant from '../constants/auth.constants';


export const authRegisterFail = (payload) =>{
    return {
        type: authConstant.FAILED_REGISTER_USER,
        payload
    }
}
export const authRegisterSuccess = (response) => {
    return {
        type: authConstant.SUCCESS_REGISTER_USER,
        response
    }
}

export const userValidationSuccessful = (response) => ({
    type: authConstant.SUCCESS_LOGIN_USER,
    response
});

export const userValidationFailed = (payload) => ({
    type: authConstant.FAILED_LOGIN_USER,
    payload
});

export const authRegister = (payload) => {
    return {
        type: authConstant.REGISTER_USER,
        payload
    }
}


export const authLogin = (payload) => {
    return {
        type: authConstant.LOGIN_USER,
        payload
    }
}
export const clearAuth = (payload) => {
    return {
        type: authConstant.CLEAR_USER,
        payload
    }
}
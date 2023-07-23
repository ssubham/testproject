import * as constants from '../constants/auth.constants';

export const initialState = {
  
  userValidation: {
    isLoading: false,
    isSuccessful: false,
    isFailure: false,
    data: null,
    message: null,
    registerMessage: null,
  },
};

export const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  switch (type) {
    
    case constants.REGISTER_USER:
      return {
        ...state,
        userValidation: {
          isLoading: true,
          isSuccessful: false,
          isFailure: false,
          data: null,
          message: null,
          registerMessage: null,
        },
      }
      case constants.SUCCESS_REGISTER_USER:
        return {
          ...state,
          userValidation: {
            isLoading: false,
            isSuccessful: true,
            isFailure: false,
            message: null,
            registerMessage: null,
            data: action.response.data
          }
        };
      case constants.FAILED_REGISTER_USER:
        return {
          ...state,
          userValidation: {
            isLoading: false,
            isSuccessful: false,
            isFailure: true,
            message: null,
            registerMessage: payload,
            data: null
          }
        };

    case constants.LOGIN_USER:
      return {
        ...state,
        userValidation: {
          isLoading: true,
          isSuccessful: false,
          isFailure: false,
          data: null,
          message: null,
          registerMessage: null
        },
      };
    case constants.SUCCESS_LOGIN_USER:
      return {
        ...state,
        userValidation: {
          isLoading: false,
          isSuccessful: true,
          isFailure: false,
          message: null,
          registerMessage: null,
          data: action.response.data
        }
      };
    case constants.FAILED_LOGIN_USER:
      return {
        ...state,
        userValidation: {
          isLoading: false,
          isSuccessful: false,
          isFailure: true,
          message: payload,
          registerMessage: null,
          data: null
        }
      };
    case constants.CLEAR_USER:
      return {
        ...state,
        userValidation: {
          isLoading: false,
          isSuccessful: false,
          isFailure: false,
          message: null,
          registerMessage: null,
          data: null
        }
      };
    
    default:
      return state;
  }
};

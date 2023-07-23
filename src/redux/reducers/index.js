import { combineReducers } from "redux";
import { authReducer } from "./auth.reducer";
import { dashboardReducer } from "./dashboard.reducer";  

const reducers = combineReducers({
  dashboardDetails: dashboardReducer,
  authDetails: authReducer,
});

export default reducers;

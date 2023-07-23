import { createSelector } from '@reduxjs/toolkit';

const selectState = (state) => state.dashboardDetails;

const selectDashboardDetails = createSelector(selectState, (state) => state);
export default selectDashboardDetails;

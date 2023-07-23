import { createSelector } from '@reduxjs/toolkit';

const selectState = (state) => state.authDetails;

const selectAuthDetails = createSelector(selectState, (state) => state);
export default selectAuthDetails;

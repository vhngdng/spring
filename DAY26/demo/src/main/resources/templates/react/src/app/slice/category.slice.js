import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
});

// eslint-disable-next-line no-empty-pattern
export const {} = CategorySlice.actions;

export default CategorySlice.reducer;

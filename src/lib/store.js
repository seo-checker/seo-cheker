import { configureStore, createSlice } from '@reduxjs/toolkit'

const _ls = window.localStorage;

export const pageSlice = createSlice({
    name: 'page',
    initialState: {
        value: _ls.getItem('seo-checker-current') ?? 'head',
    },
    reducers: {
        setPage: (state, action) => {
            state.value = action.payload;
            _ls.setItem('seo-checker-current', action.payload);
        }
    }
});

export const { setPage } = pageSlice.actions;

export default configureStore({
    reducer: {
        page: pageSlice.reducer
    },
})
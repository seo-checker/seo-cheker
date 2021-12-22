import { configureStore, createSlice } from '@reduxjs/toolkit'

const _ls = window.localStorage;

export const checkerSlice = createSlice({
    name: 'checker',
    initialState: {
        page: _ls.getItem('seo-checker-current') ?? 'head',
        visibility: _ls.getItem('seo-checker-visibility') != null ? !!parseInt(_ls.getItem('seo-checker-visibility')) : true,
    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
            _ls.setItem('seo-checker-current', action.payload);
        },
        toggleVisibility: state => {
            state.visibility = !state.visibility;
            _ls.setItem('seo-checker-visibility', +state.visibility);
        }
    }
});

export const { setPage, toggleVisibility } = checkerSlice.actions;

export default configureStore({
    reducer: {
        checker: checkerSlice.reducer
    },
})
import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './service/blog.service';
import { categoryApi } from './service/category.service';
import { pdfApi } from './service/pdf.service';
const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [pdfApi.reducerPath]: pdfApi.reducer,
    },
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare().concat(
            blogApi.middleware,
            categoryApi.middleware,
            pdfApi.middleware,
        ),
});

export default store;

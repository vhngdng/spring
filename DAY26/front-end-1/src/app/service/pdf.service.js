import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { useLocation } from 'react-router-dom';

export const pdfApi = createApi({
    reducerPath: 'pdfApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/images/pdf',
    }),
    endpoints: (builder) => ({
        readPdf: builder.query({
            query: (id) => `${id}`,
            // eslint-disable-next-line no-unused-vars
            transformResponse: async (response) => {
                const buffer = await response.arrayBuffer();
                const blob = new Blob([buffer], { type: 'application/pdf' });
                return URL.createObjectURL(blob);
            },
        }),
    }),
});

export const { useReadPdfQuery } = pdfApi;

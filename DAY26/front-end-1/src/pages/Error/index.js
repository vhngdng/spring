import React from 'react';
import { Helmet } from 'react-helmet';

function ErrorPage() {
    return (
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <h1>Page Not Found</h1>
        </>
    );
}

export default ErrorPage;

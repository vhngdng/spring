import React, { useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';
import { useParams } from 'react-router-dom';
// import { useReadPdfQuery } from '~/app/service/pdf.service';
// import Loader from '~/components/layouts/Loader';

function SlideDetails() {
    const [pdfData, setPdfData] = useState(null);
    const [numPages, setNumPages] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const { id } = useParams();
    // const { data, isLoading, error } = useReadPdfQuery(id);

    // if (isLoading) return <Loader />;
    // const transformedResponse = transformedResponse(data.response);
    // console.log('Transformed response:', transformedResponse);

    const request = new Request(`http://localhost:8080/api/v1/images/pdf/402`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    });
    useEffect(() => {
        const fetchPdf = async () => {
            try {
                await fetch(request, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/octet-stream',
                    },
                })
                    // .then((response) => response.blob())
                    .then((response) => {
                        setPdfData(response.arrayBuffer());
                        console.log(pdfData);
                    });
            } catch {
                (err) => console.log(err);
            }
        };
        fetchPdf();
    }, [id]);

    console.log(id);
    // console.log(data);
    // console.log('error: ', error.status);

    return (
        <div>
            {pdfData ? (
                <>
                    <Document
                        file={pdfData}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </>
            ) : (
                <div>No PDF file found.</div>
            )}
        </div>
    );
}

export default SlideDetails;

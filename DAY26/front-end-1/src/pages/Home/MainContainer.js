/* eslint-disable use-isnan */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Content from './component/Content';
import { useLocation, useParams } from 'react-router-dom';
import { useGetBlogsQuery } from '~/app/service/blog.service';
import { ClipLoader } from 'react-spinners';
import Footer from './component/Footer';
import { Helmet } from 'react-helmet';
const cx = classNames.bind();

function Container() {
    const { page } = useParams();
    const [thisPage, setThisPage] = useState(1);
    // eslint-disable-next-line no-unused-vars
    useEffect(() => {
        if (page !== undefined && page > 1) {
            setThisPage(page);
        } else {
            setThisPage(1);
        }
    }, [useLocation()]);
    const { data: blogs, isLoading } = useGetBlogsQuery(thisPage - 1);
    console.log(blogs);
    if (isLoading)
        return (
            <ClipLoader
                color="#123abc"
                loading="true"
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                className={cx('sweet-loading')}
            />
        );

    return (
        <>
            <Helmet>
                <title>Main</title>
            </Helmet>
            <div className={cx('container')}>
                {blogs.content.map((blog, index) => (
                    <Content
                        className={cx('post-entry')}
                        article={blog}
                        key={index}
                        index={index}
                    />
                ))}
                {blogs.totalElements > 10 && (
                    <Footer page={thisPage} totalPage={blogs.totalPages} />
                )}
            </div>
        </>
    );
}

export default Container;

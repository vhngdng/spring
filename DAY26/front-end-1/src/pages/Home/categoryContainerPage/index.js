/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useGetBlogByCategoryIdQuery } from '~/app/service/blog.service';
import { useGetCategoryIdQuery } from '~/app/service/category.service';
import { ClipLoader } from 'react-spinners';
import Content from '../component/Content';
import Footer from '../component/Footer';
const cx = classNames.bind();

function Page() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [thisPage, setThisPage] = useState(1);
    const page = parseInt(searchParams.get('page')) || 1;
    console.log('page1st', page);

    // eslint-disable-next-line no-unused-vars
    const { data: category, isLoading: categoryLoading } =
        useGetCategoryIdQuery(id);

    useEffect(() => {
        if (page !== null && page > 1) {
            setThisPage(page);
        } else {
            setThisPage(1);
        }
    }, [useLocation()]);
    const {
        data: blog,
        isLoading,
        isSuccess,
    } = useGetBlogByCategoryIdQuery({
        id,
        page: thisPage - 1,
    });

    if (isLoading || categoryLoading)
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
        <main className={cx('main')}>
            <header className={cx('page-header')}>
                <h1>{category.name}</h1>
            </header>
            {isSuccess &&
                blog.content.map((article, index) => (
                    <Content
                        className={cx('post-entry')}
                        article={article}
                        key={article.id}
                        index={index}
                    />
                ))}
            {blog.totalElements > 10 && (
                <Footer
                    page={page}
                    totalPage={blog.totalPages}
                    categoryId={id}
                />
            )}
        </main>
    );
}

export default Page;

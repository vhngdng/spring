import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetBlogByIdQuery } from '~/app/service/blog.service';
import classNames from 'classnames/bind';
import styles from './BlogDetail.module.scss';
const cx = classNames.bind(styles);
import findReadingTime from '~/utils/findReadingTime';
import formatDateTime from '~/utils/formatDateTime';
import { Helmet } from 'react-helmet';
function BlogDetail() {
    const { id } = useParams();

    // eslint-disable-next-line no-unused-vars
    const { data, isLoading } = useGetBlogByIdQuery(id);

    if (isLoading) return <div>Loading........</div>;
    let { date } = formatDateTime(data.publishedAt);

    return (
        <>
            <Helmet>
                <title>{data.title}</title>
            </Helmet>
            <header className={cx('post-header')}>
                <h1 className={cx('post-title')}>{data.title}</h1>
                <div className={cx('post-meta')}>
                    <span title={data.publishedAt}>{date}</span>
                    &nbsp;·&nbsp;{findReadingTime(data.content.length)} phút
                </div>
            </header>
            <div className={cx('toc')}></div>
            <div className={cx('post-content')}>{data.content}</div>
            <footer className={cx('post-footer')}>
                <ul className={cx('post-tags')}>
                    {data.categories.map((c) => (
                        <Link
                            className={cx('post-tags', 'category-name')}
                            to={''}
                            key={c.id}
                        >
                            {c.name}
                        </Link>
                    ))}
                </ul>
            </footer>
        </>
    );
}

export default BlogDetail;

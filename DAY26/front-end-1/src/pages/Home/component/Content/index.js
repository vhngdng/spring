import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { Link } from 'react-router-dom';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import findReadingTime from '~/utils/findReadingTime';
import formatDateTime from '~/utils/formatDateTime';
const cx = classNames.bind(styles);
function Content({ article, index }) {
    const { date, dateTitle } = article.publishedAt
        ? formatDateTime(article.publishedAt)
        : {};
    console.log(article);

    return (
        index < 10 && (
            <>
                <article className={cx('post-entry')}>
                    <Link
                        className={cx('entrynpm i date-fns-link')}
                        aria-label={`post link to ${article.id}`}
                        to={`http://localhost:3000/blog/${article.id}/${article.slug}`}
                    >
                        <header className={cx('entry-header')}>
                            <h2>{article.title}</h2>
                        </header>
                        <div className={cx('entry-content')}>
                            <ReactMarkdown>{article.content}</ReactMarkdown>
                        </div>
                        <footer className={cx('entry-footer')}>
                            <span title={dateTitle ? dateTitle : ''}>
                                {date ? date : ''}
                            </span>
                            &nbsp; ·&nbsp;
                            <span>
                                {findReadingTime(article.content.length)} phút
                            </span>
                        </footer>
                    </Link>
                </article>
            </>
        )
    );
}

export default Content;

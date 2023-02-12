import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import moment from 'moment';
const cx = classNames.bind(styles);
function Content({ article, index }) {
    let date = moment(article.publishedDate).format('L');
    return (
        index < 10 && (
            <article className={cx('post-entry')}>
                <a
                    className={cx('entrynpm i date-fns-link')}
                    aria-label={`post link to ${article.path}`}
                    href={article.path}
                >
                    <header className={cx('entry-header')}>
                        <h2>{article.name}</h2>
                    </header>
                    <div className={cx('entry-content')}>
                        <p>{article.introduction}</p>
                    </div>
                    <footer className={cx('entry-footer')}>
                        <span title={moment(article.publishedDate).format()}>
                            {date}
                        </span>
                        &nbsp;·&nbsp;{article.readingTime} phút
                    </footer>
                </a>
            </article>
        )
    );
}

export default Content;

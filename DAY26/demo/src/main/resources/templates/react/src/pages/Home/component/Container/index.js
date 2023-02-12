import React, { useEffect, useLayoutEffect, useState } from 'react';
import styles from './Container.module.scss';
import classNames from 'classnames/bind';
import Content from '../Content';
import { articleMain, articleGo } from '~/fakeDB';
import Footer from '../Footer';
const cx = classNames.bind(styles);

let tag = '/';
console.log('tag', tag);

function Container() {
    const uri = window.location.href;
    if (uri.includes('/tags')) tag = uri.slice(uri.lastIndexOf('/tags/') + 6);

    const [articles, setArticle] = useState([]);
    const [page, setPage] = useState(1);
    // const [uri, setUri] = useState(window.location.href);

    useEffect(() => {
        if (tag === '/') {
            setArticle(articleMain);
        } else {
            setArticle(articleGo);
        }
    }, []);

    useLayoutEffect(() => {
        if (uri.includes('/page')) {
            setPage(uri.slice(uri.lastIndexOf('/page/') + 5));
        }
    }, []);

    console.log('articles=', articles);
    return (
        <div className={cx('container')}>
            {articles.map((article, index) => {
                return (
                    <Content
                        className={cx('post-entry')}
                        article={article}
                        key={index}
                        index={index}
                    />
                );
            })}
            {articles.length > 10 && (
                <Footer page={page} hasNext={articles.length > page * 10} />
            )}
        </div>
    );
}

export default Container;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Header from './component/Header';

const cx = classNames.bind(styles);
function Search() {
    return (
        <main className={cx('main')}>
            <Header className={cx('page-header')} />
            <div id={cx('searchbox')}>
                <div className="gcse-search">
                    {/* <input
                        id={cx('searchInput')}
                        autoFocus
                        placeholder="Tìm kiếm bài viết"
                        aria-label="search"
                        type="search"
                        autoComplete="off"
                    /> */}
                </div>
                <ul id="searchResults" aria-label="search results"></ul>
            </div>
        </main>
    );
}

export default Search;

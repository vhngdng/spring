import React from 'react';
import styles from './Tags.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Tags() {
    return (
        <main className={cx('main')}>
            <header className={cx('page-header')}>
                <h1>Tags</h1>
            </header>
            <ul className={cx('term-tags')}></ul>
        </main>
    );
}

export default Tags;

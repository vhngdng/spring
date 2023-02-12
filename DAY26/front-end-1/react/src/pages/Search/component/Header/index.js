import React from 'react';
import { searchIcon } from '~/assets/images';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('page-header')}>
            <h1>
                Search&nbsp;
                <img src={searchIcon.logo.default} />
            </h1>
            <div className={cx('post-description')}>Tìm kiếm bài viết</div>
        </header>
    );
}

export default Header;

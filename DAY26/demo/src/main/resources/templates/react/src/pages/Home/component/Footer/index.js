import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer({ page, hasNext }) {
    return (
        <nav className={cx('pagination')}>
            {page > 1 && (
                <a className={cx('prev')} href={`/page/${page - 1}/`}>
                    « Trang trước
                </a>
            )}
            {hasNext && (
                <a className={cx('next')} href={`/page/${page + 1}/`}>
                    Trang tiếp theo »
                </a>
            )}
        </nav>
    );
}

export default Footer;

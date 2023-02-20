import React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Footer({ page, totalPage, categoryId }) {
    const nextPage = parseInt(page) + 1;
    const previousPage = parseInt(page) - 1;

    return (
        <nav className={cx('pagination')}>
            {page > 1 && (
                <Link
                    className={cx('prev')}
                    to={
                        previousPage === 1
                            ? categoryId
                                ? `/tags/${categoryId}`
                                : '/'
                            : categoryId
                            ? `/tags/${categoryId}/page/${previousPage}/`
                            : `/page/${previousPage}/`
                    }
                    disabled={page === 1}
                >
                    « Trang trước
                </Link>
            )}
            {page < totalPage && (
                <Link
                    className={cx('next')}
                    to={
                        categoryId
                            ? `/tags/${categoryId}?page=${nextPage}`
                            : `/page/${nextPage}/`
                    }
                >
                    Trang tiếp theo »
                </Link>
            )}
        </nav>
    );
}

export default Footer;

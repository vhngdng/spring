import React from 'react';
import styles from './Tags.module.scss';
import classNames from 'classnames/bind';
import { useGetCategoriesQuery } from '~/app/service/category.service';
import Loader from '~/components/layouts/Loader';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function Tags() {
    const { data: categories, isLoading } = useGetCategoriesQuery();
    if (isLoading) return <Loader />;
    return (
        <main className={cx('main')}>
            <header className={cx('page-header')}>
                <ul className={cx('terms-tags')}></ul>
            </header>
            <ul className={cx('terms-tags')}>
                {categories.map((c) => (
                    <li key={c.id}>
                        <Link className={cx('tag-name')}>
                            {c.name}
                            <sup>
                                <strong>
                                    <sup>{c.used}</sup>
                                </strong>
                            </sup>
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default Tags;

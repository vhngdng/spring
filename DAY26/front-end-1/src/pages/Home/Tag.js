import React from 'react';
import styles from './module/Tags.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useGetCategoryTop5Query } from '~/app/service/category.service';

const cx = classNames.bind(styles);

function Tags() {
    const { data: tags, isLoading } = useGetCategoryTop5Query();
    if (isLoading) return <h2>Loading.....</h2>;
    return (
        <ul className={cx('terms-tags', 'top-tags')}>
            {tags.map((tag, index) => {
                return (
                    <li key={index}>
                        <Link to={`/tags/${tag.id}`}>
                            {tag.name}
                            <sup>
                                <strong>
                                    <sup>{tag.used}</sup>
                                </strong>
                            </sup>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default Tags;

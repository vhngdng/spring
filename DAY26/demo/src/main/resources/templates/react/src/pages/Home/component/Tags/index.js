import React from 'react';
import styles from './Tags.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const tags = [
    { name: 'Go', path: 'go', sup: 9 },
    { name: 'ReactJs', path: 'react', sup: 8 },
    { name: 'Linux', path: 'linux', sup: 6 },
    { name: 'EnglishTranslated', path: 'english-translated', sup: 5 },
    { name: 'Github', path: 'git-hub', sup: 5 },
];
function Tags() {
    return (
        <ul className={cx('terms-tags', 'top-tags')}>
            {tags.map((tag, index) => {
                return (
                    <li key={index}>
                        <Link to={`/tags/${tag.path}`}>
                            {tag.name}
                            <sup>
                                <strong>
                                    <sup>{tag.sup}</sup>
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

import React, { memo } from 'react';
import styles from './Footer.module.scss';
import { github, codepen, hackerrank, stackoverflow } from '~/assets/images';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
function Footer() {
    return (
        <footer className={cx('footer')}>
            <span>HuyDQ © 2022</span>
            <span className={cx('social-icons')}>
                <a href="https://github.com/robinhuy" aria-label="Github">
                    <img src={github.logo.default} alt="github" />
                </a>
                <a href="https://codepen.io/robinhuy" aria-label="CodePen">
                    <img src={codepen.logo.default} alt="codepen" />
                </a>
                <a
                    href="https://stackoverflow.com/users/5229299/robin-huy"
                    aria-label="Stackoverflow"
                >
                    <img src={stackoverflow.logo.default} alt="stackoverflow" />
                </a>
                <a
                    href="https://www.hackerrank.com/robinhuy"
                    aria-label="HackerRank"
                >
                    <img src={hackerrank.logo.default} alt="hackerrank" />
                </a>
            </span>
            <a href="/support">Support me ❤</a>
        </footer>
    );
}

export default memo(Footer);

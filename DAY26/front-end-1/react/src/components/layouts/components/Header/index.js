import React, { memo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { ThemeContext } from '~/context/ThemeProvider';
import { sun, moon } from '~/assets/images';
const cx = classNames.bind(styles);

function Header() {
    const theme = useContext(ThemeContext);
    return (
        <header className={cx('wrapper')}>
            <nav className={cx('nav')}>
                <div className={cx('logo')}>
                    <a href="/" accessKey="h" title="huydq.dev (Alt + H)">
                        huydq.dev
                    </a>
                    <div className={cx('logo-switches')}>
                        <button
                            id="theme-toggle"
                            accessKey="t"
                            title="(Alt + T)"
                            onClick={theme.changeTheme}
                        >
                            {theme.theme === true ? (
                                <img src={moon.logo.default} alt="moon" />
                            ) : (
                                <img src={sun.logo.default} alt="sun" />
                            )}
                        </button>
                    </div>
                </div>
                <ul id={cx('menu')}>
                    <li>
                        <a
                            href="/search/"
                            title="Search (Alt + /)"
                            accessKey="/"
                        >
                            <span>Search</span>
                        </a>
                    </li>
                    <li>
                        <a href="/tags/" title="Tags">
                            <span>Tags</span>
                        </a>
                    </li>
                    <li>
                        <a href="/projects/" title="Projects">
                            <span>Projects</span>
                        </a>
                    </li>
                    <li>
                        <a href="/slides/" title="Slides">
                            <span>Slides</span>
                        </a>
                    </li>
                    <li>
                        <a href="/about/" title="About">
                            <span>About</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default memo(Header);

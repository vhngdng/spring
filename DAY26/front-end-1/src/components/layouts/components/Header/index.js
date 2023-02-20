import React, { memo, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { ThemeContext } from '~/context/ThemeProvider';
import { sun, moon } from '~/assets/images';
import { Link, NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

function Header() {
    const theme = useContext(ThemeContext);
    return (
        <header className={cx('wrapper')}>
            <nav className={cx('nav')}>
                <div className={cx('logo')}>
                    <Link to="/" accessKey="h" title="dungvh (Alt + H)">
                        dungvh
                    </Link>
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
                        <NavLink
                            to="/search/"
                            title="Search (Alt + /)"
                            accessKey="/"
                        >
                            <span>Search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tags/" title="Tags">
                            <span>Tags</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects/" title="Projects">
                            <span>Projects</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/slides/" title="Slides">
                            <span>Slides</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about/" title="About">
                            <span>About</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default memo(Header);

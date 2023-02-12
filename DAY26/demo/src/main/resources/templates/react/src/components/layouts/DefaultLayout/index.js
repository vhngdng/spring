import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toplink } from '~/assets/images';
import { UpButtonContext } from '~/context/UpButtonProvider';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const upContext = useContext(UpButtonContext);
    let visibility = upContext[0];
    let opacity = upContext[1];
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // for smoothly scrolling
        });
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <main className={cx('container', 'main')}>
                <div className={cx('content')}>{children}</div>
            </main>
            <Footer />
            <button
                href="#top"
                aria-label="go to top"
                title="Go to Top (Alt + G)"
                className={cx('top-link')}
                id={cx('top-link')}
                accessKey="g"
                style={{
                    visibility: visibility,
                    opacity: opacity,
                }}
                onClick={scrollToTop}
            >
                <img src={toplink.logo.default} alt="Up arrow" />
            </button>
        </div>
    );
}

export default DefaultLayout;

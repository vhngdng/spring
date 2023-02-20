import React from 'react';
import { Helmet } from 'react-helmet';
// import '. ./Header.module.scss';
function Header() {
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <h1>
                <span
                    style={{
                        display: 'inline-block',
                        transform: 'rotateY(180deg)',
                    }}
                >
                    🐈
                </span>{' '}
                Happy New Year <span>🐈</span>
            </h1>
        </>
    );
}

export default Header;

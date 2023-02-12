import React from 'react';
import './Header.module.scss';

function Header() {
    return (
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
    );
}

export default Header;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Page.module.scss';
import Content from '../Content';
import Container from '../Container';

const cx = classNames.bind(styles);

function Page() {
    const uri = window.location.href;
    console.log('uri', uri);
    const tag = uri.slice(uri.lastIndexOf('/') + 1);
    console.log(tag);
    return (
        <main className={cx('main')}>
            <header className={cx('page-header')}>
                <h1>{tag}</h1>
            </header>
            <Container className={cx('container')}>
                <Content className={cx('content')}></Content>
            </Container>
        </main>
    );
}

export default Page;

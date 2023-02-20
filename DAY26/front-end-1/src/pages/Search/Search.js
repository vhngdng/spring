import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import Header from './SearchHeader';
import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLazyGetSearchBlogsQuery } from '~/app/service/blog.service';
import Loader from '~/components/layouts/Loader';

const cx = classNames.bind(styles);
function Search() {
    const [term, setTerm] = useState('');
    const [searchBlog] = useLazyGetSearchBlogsQuery();
    const [blogs, setBlogs] = useState([]);
    const schema = yup.object().shape({
        term: yup.string().required('Từ khoá không được để trống'),
    });
    const {
        register,
        handleSubmit,
        // eslint-disable-next-line no-unused-vars
        formState: { errors },
    } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => console.log(data);

    const handleSearch = async (e) => {
        if (e.key === 'Enter') {
            // if (term.trim() !== '') {
            // toast.error('Từ khoá không được để trống');
            // return;
            try {
                let { data, isLoading } = await searchBlog(term);
                if (isLoading) return <Loader />;
                setBlogs(data);
                console.log('data ', data);
                console.log(blogs);
            } catch (err) {
                console.log(err);
            }
        }
        // }
    };
    return (
        <main className={cx('main')}>
            <Header className={cx('page-header')} />
            <div id={cx('searchbox')}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        id={cx('searchInput')}
                        autoFocus
                        placeholder="Tìm kiếm bài viết"
                        aria-label="search"
                        type="search"
                        autoComplete="off"
                        defaultValue={term}
                        onChange={(e) => {
                            setTerm(e.target.value);
                            searchBlog(term);
                        }}
                        onKeyDown={(e) => handleSearch(e)}
                        {...register('term')}
                    />
                    <span className={cx('error-message')}>
                        {errors.term?.message}
                    </span>
                </form>
                <ul id={cx('searchResults')} aria-label="search results">
                    {blogs.map((b, index) => (
                        <li className={cx('post-entry')} key={index}>
                            <Link to={`/blog/${b.id}/${b.slug}`}>
                                <header className={cx('entry-content')}>
                                    {b.result}&nbsp;
                                </header>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default Search;

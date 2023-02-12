import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import { DefaultLayout } from './components/layouts';
import ErrorBoundary from './exception/ErrorBoundary';
import UpButtonProvider from './context/UpButtonProvider';
import { ThemeContext } from './context/ThemeProvider';
const cx = classNames.bind(styles);
function App() {
    // eslint-disable-next-line no-unused-vars
    const context = useContext(ThemeContext);
    // eslint-disable-next-line no-unused-vars
    let theme = '';
    context.theme === false ? (theme = ['list', 'dark']) : (theme = 'list');
    return (
        <div className={cx(theme)}>
            <Router>
                <div>
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Layout = DefaultLayout;
                            const Page = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <ErrorBoundary>
                                            <UpButtonProvider>
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            </UpButtonProvider>
                                        </ErrorBoundary>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;

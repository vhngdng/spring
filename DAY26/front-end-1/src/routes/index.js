import Home from '~/pages/Home/Home';
import Projects from '~/pages/Projects';
import Search from '~/pages/Search/Search';
import Slides from '~/pages/Slides';
import Tags from '~/pages/Tags';
import About from '~/pages/About';
import Page from '~/pages/Home/categoryContainerPage';
import BlogDetail from '~/pages/BlogDetail';
import ErrorPage from '~/pages/Error';
// import SlideDetails from '~/pages/Slides/component/SlideDetails';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/page/:page', component: Home },
    { path: '/projects', component: Projects },
    { path: '/search', component: Search },
    { path: '/slides', component: Slides },
    { path: '/tags', component: Tags },
    { path: `/tags/:id`, component: Page },
    { path: `/tags/:id?page=:page`, component: Page },
    { path: '/about', component: About },
    { path: `/blog/:id/:blogSlug`, component: BlogDetail },
    // { path: `/pdf/:id`, component: SlideDetails },
    { path: '*', component: ErrorPage },
];

export { publicRoutes };

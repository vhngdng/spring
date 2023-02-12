import Home from '~/pages/Home';
import Projects from '~/pages/Projects';
import Search from '~/pages/Search';
import Slides from '~/pages/Slides';
import Tags from '~/pages/Tags';
import About from '~/pages/About';
import Page from '~/pages/Home/component/pages';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/projects', component: Projects },
    { path: '/search', component: Search },
    { path: '/slides', component: Slides },
    { path: '/tags', component: Tags },
    { path: '/tags/go/', component: Page },
    { path: '/tags/react', component: Page },
    { path: '/tags/page', component: Page },
    { path: '/tags/linux', component: Page },
    { path: '/about', component: About },
];

export { publicRoutes };

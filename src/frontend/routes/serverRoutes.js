import Home from '../containers/Home';
//import Player from '../containers/player';
import Login from '../containers/Login';
import Register from '../containers/Register';
//import NotFount from '../containers/NotFount';
const serverRoutes= ()=>{
  return [
    {
      path: '/',
      exact: true,
      component: Home,
    },
    {
      path: '/player/:id',
      exact: true,
      component: Login,
    },
    {
      path: '/login',
      exact: true,
      component: Login,
    },
    {
      path: '/register',
      exact: true,
      component: Register,
    },
    {
      name: 'NotFount',
      component: Home,
    },
  ];
}


export default serverRoutes;

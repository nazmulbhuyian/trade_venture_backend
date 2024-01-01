import express from 'express';
import { UserRegRoutes } from '../app/userReg/userRegRoutes';
import { UserLogRoutes } from '../app/userLogin/userLoginRoutes';
import { UserGetMeRoutes } from '../app/getMe/getMeRoutes';
import { UserRoleRoutes } from '../app/addUserRole/addUserRoleRoutes';
import { FAQRoutes } from '../app/FAQ/FAQRoutes';
import { ContactUsRoutes } from '../app/contactUs.getNotified/contactUsRoutes';
import { BlogRoutes } from '../app/blog/blogRoutes';
import { AdsRoutes } from '../app/ads/adsRoutes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/userReg',
    route: UserRegRoutes,
  },
  {
    path: '/userLog',
    route: UserLogRoutes,
  },
  {
    path: '/getMe',
    route: UserGetMeRoutes,
  },
  {
    path: '/user/addRoleType',  //from dashboard
    route: UserRoleRoutes,
  },
  {
    path: '/faq',  //from dashboard
    route: FAQRoutes,
  },
  {
    path: '/contactUs',
    route: ContactUsRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/ads',
    route: AdsRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

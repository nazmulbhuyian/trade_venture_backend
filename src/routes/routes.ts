import express from 'express';
import { UserRegRoutes } from '../app/userReg/userRegRoutes';
import { UserLogRoutes } from '../app/userLogin/userLoginRoutes';
import { UserGetMeRoutes } from '../app/getMe/getMeRoutes';
import { UserRoleRoutes } from '../app/addUserRole/addUserRoleRoutes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

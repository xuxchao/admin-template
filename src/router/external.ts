import type { CustomRouteRecordRaw } from '.';

export const noAuthRoute: CustomRouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/external/login/index.vue'),
    meta: {
      title: '登陆',
      noAuth: true,
    },
  },
  {
    path: '/lowcode',
    name: 'lowcode',
    component: () => import('../views/lowcode/index.vue'),
    meta: {
      title: '低代码',
      noAuth: true,
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/lowcode/test.vue'),
    meta: {
      title: '低代码',
      noAuth: true,
    },
  },
];

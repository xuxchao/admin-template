import {
  createRouter,
  createWebHashHistory,
  type RouteMeta,
  type RouteRecordRaw,
} from 'vue-router';
import LayoutMain from '@/components/Layout/LayoutMain.vue';
import EpSetting from '~icons/ep/setting';
import { useAccountStore } from '@/stores/account';
import EpHouse from '~icons/ep/house';
import EpPosition from '~icons/ep/position';
import EpPrinter from '~icons/ep/printer';

export type IconsType = typeof EpSetting;

export interface CustomRouteMeta extends RouteMeta {
  /** 图标 */
  icon?: IconsType;
  /** 标题 */
  title: string;
  /** 是否需要登陆, 不填为需要登陆 */
  noAuth?: boolean;
  /**
   * 跳转规则有 url 按照 url 打开站外链接
   * 没有 url 有 tap 按照 tap 函数执行
   * 否则都按照 name 跳转
   */
  url?: string;
  tap?: (route: CustomRouteRecordRaw) => void;
}

export type CustomRouteRecordRaw = {
  meta?: CustomRouteMeta;
  children?: CustomRouteRecordRaw[];
} & RouteRecordRaw;

function NullComponents() {
  return h('span');
}

export const adminRoute: CustomRouteRecordRaw[] = [
  {
    path: 'home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      icon: EpHouse,
      title: '首页',
    },
  },
  {
    path: 'business',
    name: 'business',
    meta: {
      title: '常见业务',
      icon: EpPrinter,
    },
    children: [
      {
        path: 'b-table',
        name: 'b-table',
        component: () => import('../views/business/BTable.vue'),
        meta: {
          title: '数据列表',
        },
      },
    ],
  },
  {
    path: 'external-link',
    name: 'external-link',
    meta: {
      title: '外部链接',
      icon: EpPosition,
    },
    children: [
      {
        path: 'github',
        name: 'github',
        component: () => h(NullComponents),
        meta: {
          title: 'Github',
          url: 'https://github.com/xuxchao/admin-template',
        },
      },
      {
        path: 'github-issues',
        name: 'github-issues',
        component: () => h(NullComponents),
        meta: {
          title: 'Github issues',
          url: 'https://github.com/xuxchao/admin-template/issues',
        },
      },
      {
        path: 'simple-ui',
        name: 'simple-ui',
        component: () => h(NullComponents),
        meta: {
          title: '极简 Vue 组件',
          url: 'https://simple-ui-nu.vercel.app/',
        },
      },
      {
        path: 'ep-icons',
        name: 'ep-icons',
        component: () => h(NullComponents),
        meta: {
          title: 'element plus 图标',
          url: 'https://icones.js.org/collection/ep',
        },
      },
    ],
  },
];

export const noAuthRoute: CustomRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登陆',
      noAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...noAuthRoute,
    {
      path: '/admin',
      component: LayoutMain,
      children: [...adminRoute],
    },
  ],
});

router.beforeEach((to, from, next) => {
  const toMeta = to.meta as CustomRouteMeta;
  // 不需要授权的页面直接进入
  if (toMeta.noAuth) {
    next();
    return;
  }
  // 需要授权的页面没有授权重新进入到登陆页面
  const { account } = storeToRefs(useAccountStore());
  if (!account.value) {
    next({ name: 'login' });
    return;
  }
  next();
});

export default router;

import {
  createRouter,
  createWebHashHistory,
  type RouteMeta,
  type RouteRecordRaw,
} from 'vue-router';
import LayoutMain from '@/components/Layout/LayoutMain.vue';
import EpSetting from '~icons/ep/setting';
import { useAccountStore } from '@/stores/account';
import { adminRoute } from './admin';
import { noAuthRoute } from './external';

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

export function NullComponents() {
  return h('span');
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...noAuthRoute,
    {
      path: '/admin',
      component: LayoutMain,
      children: [...adminRoute],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: import('../views/external/404.vue'),
      meta: {
        noAuth: true,
      },
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

export * from './admin';
export * from './external';

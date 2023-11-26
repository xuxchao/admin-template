import EpHouse from '~icons/ep/house';
import EpPosition from '~icons/ep/position';
import EpPrinter from '~icons/ep/printer';
import { NullComponents, type CustomRouteRecordRaw } from '.';
import EpSuitcaseLine from '~icons/ep/suitcase-line';

export const adminRoute: CustomRouteRecordRaw[] = [
  {
    path: 'home',
    name: 'home',
    component: () => import('../views/admin/home/index.vue'),
    meta: {
      title: '数据列表',
      icon: EpSuitcaseLine,
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
        component: () => import('../views/admin/business/BTable.vue'),
        meta: {
          title: '数据列表',
        },
      },
      {
        path: 'draft-form',
        name: 'draft-form',
        component: () => import('../views/admin/business/DraftForm.vue'),
        meta: {
          title: '草稿表单',
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

# admin template

打造最基础的后端模版功能

# icon

采用了 Iconify 提供的图标。超过 100+ 流行的图标集合，10000+ 的图标。

[element plus 图标地址](https://icones.js.org/collection/ep)

## 使用方式

1. 组件

```
<i-ep-setting></i-ep-setting>
```

2.  脚本引入

```
import Setting from '~icons/ep/setting'
```

ep 的位置放哪个库的图标。例如 ep 就是 element-plus 的，setting 放这个库的什么图标. i-ep-setting 就是 ep 库的 setting 图标( 脚本也是同理)

# 侧边栏 & 路由 & 权限

这三者是相辅相成的。例如侧边栏是根据路由生成的，权限中的路由权限是在路由中配置的

## 侧边栏

侧边栏是根据 route 生成的, `src/route/index.ts` 有导出对象 adminRoute 对象。这个里面的路由只有登陆后才能够进入，并且 menu 也是通过他来生成的

其中 meta 对象定义了一些跟侧边栏相关的规则, 详情可见 `CustomRouteMeta` 类型的定义

```
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
```

## 路由

`src/route/index.ts` 中有对象`adminRoute`和`noAuthRoute`。第一个用来定义侧边栏路由, 通常都是需要登陆之后才能访问的。第二个用来定义非侧边栏路由，通常不需要登陆也可以访问。当然你也可以定义一个新的 `newAdminRoute` 来做俩套不同布局的 admin 系统

## 权限

路由限制访问权限，这个会慢慢补充

### 登录

包含了常见的登录之后跳转指定页面的功能

# 本地缓存

推荐使用 `pinia` 的方式来做处理。`pinia-plugin-persistedstate` 提供了本地缓存功能使得定义一个 pinia 的时候不需要额外操作就可以缓存内容。例如下面就会在本地缓存创建一个叫 account 的缓存 key, 缓存的值会自动根据 accout 的变化来更新。其中的关键就是第三个参数 `{ persist: true}` 的开启

```
export const useAccountStore = defineStore(
  'account',
  () => {
    const account = ref();
    return { account };
  },
  { persist: true }
);
```

# TODO

1. 发送埋点的通用方法
2. 权限
3.

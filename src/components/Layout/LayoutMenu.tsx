import {
  adminRoute,
  type CustomRouteMeta,
  type CustomRouteRecordRaw,
  type IconsType,
} from '@/router';
import { ElMenu, ElMenuItem, ElSubMenu } from 'element-plus';
import 'element-plus/theme-chalk/el-menu.css';
import 'element-plus/theme-chalk/el-menu-item.css';
import 'element-plus/theme-chalk/el-sub-menu.css';
import type { RouteRecordRaw } from 'vue-router';

function icons(v?: IconsType) {
  return <span>{v && h(v)}</span>;
}

function MenuTitle({ route }: { route: CustomRouteRecordRaw }) {
  const meta = route?.meta;
  return (
    <div class={'flex items-center'}>
      {icons(meta?.icon)}
      <span class={'ml-1'}>{meta?.title ?? route.name}</span>
    </div>
  );
}

function MenuItem(routes: CustomRouteRecordRaw[]) {
  const router = useRouter();

  function tapHandler(route: CustomRouteRecordRaw) {
    if (route?.meta?.url) {
      window.open(route.meta.url);
      return;
    }
    if (route.meta?.tap) {
      route.meta.tap(route);
      return;
    }
    router.push({
      name: route.name,
    });
  }

  return routes.map((item) => {
    if (item.children) {
      return (
        <ElSubMenu index={item.name as string}>
          {{
            default: () => MenuItem(item.children!),
            title: () => <MenuTitle route={item}></MenuTitle>,
          }}
        </ElSubMenu>
      );
    } else {
      return (
        <ElMenuItem onClick={() => tapHandler(item)} index={item.name as string}>
          <MenuTitle route={item}></MenuTitle>
        </ElMenuItem>
      );
    }
  });
}

export default defineComponent({
  setup() {
    const { name } = useRoute();
    return () => <ElMenu defaultActive={(name as string) ?? 'home'}>{MenuItem(adminRoute)}</ElMenu>;
  },
});

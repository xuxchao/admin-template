export interface Account {
  userName: string;
  avatar: string;
}

export const useAccountStore = defineStore(
  'account',
  () => {
    const account = ref<Account>();
    const router = useRouter();
    const route = useRoute();

    const redirect = computed(() => {
      const redirect = route.query.redirect as string | undefined;
      if (!redirect) return undefined;
      return new URL(decodeURIComponent(redirect));
    });

    const login = () => {
      account.value = {
        userName: 'xuxchao',
        avatar: '/image/avatar.png',
      };
      if (redirect.value) {
        router.push(redirect.value.hash.slice(1));
      } else {
        router.push({ name: 'home' });
      }
    };

    function logout() {
      account.value = undefined;
      router.push({
        name: 'login',
        query: {
          redirect: encodeURIComponent(location.href),
        },
      });
    }

    return { account, login, logout };
  },
  { persist: true }
);

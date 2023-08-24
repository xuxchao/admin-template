import type { UnwrapRef } from 'vue';

export function useSearchValue<P extends Record<string, any>>({
  defaultValue,
  storageName: sn,
}: {
  defaultValue: P;
  storageName?: string;
}) {
  const route = useRoute();
  const cloneValue = { ...defaultValue };
  const storageName = sn ?? (route.name as string);
  const form = ref<P>(getSearchStorage(storageName) ?? { ...cloneValue });
  watch(
    form,
    (v) => {
      if (v) {
        setSearchStorage(storageName, JSON.stringify(v));
      } else {
        removeSearchStorage(storageName);
      }
    },
    { deep: true }
  );

  function resetSearch() {
    console.log(cloneValue);
    form.value = { ...cloneValue } as UnwrapRef<P>;
  }

  return {
    searchValues: form,
    resetSearch,
  };
}

const storagePrefix = 'search-';

function getSearchStorage<T>(key: string) {
  const storage = localStorage.getItem(storagePrefix + key);
  if (!storage) return null;
  try {
    return JSON.parse(storage) as T;
  } catch (error) {
    return null;
  }
}

function setSearchStorage(key: string, value: string) {
  localStorage.setItem(storagePrefix + key, value);
}

function removeSearchStorage(key: string) {
  localStorage.removeItem(storagePrefix + key);
}

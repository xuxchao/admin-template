import type { Raw } from 'vue';

export interface MetaDataItem<T> {
  id: string | number;
  isContainer?: boolean;
  component: Raw<T> | string;
  props?: Record<string, string>;
  children?: MetaDataItem<T>[];
  desc?: string;
}

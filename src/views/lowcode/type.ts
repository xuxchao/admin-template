import { type } from 'os';
import type { Raw } from 'vue';

export interface MetaDataItem<T> {
  id: string | number;
  isContainer?: boolean;
  component: Raw<T> | string;
  props?: Record<string, string>;
  children?: MetaDataItem<T>[];
  desc?: string;
}

export interface PropsObject<T> {
  key: string;
  desc: string;
  type: string;
  value: T | T[];
  userValue?: T;
  initValue?: T;
}

export type PropsValue = string | string[];

export interface MetaInfoItem<T> {
  id: string | number;
  comonentName: string;
  props?: PropsObject<T>[];
  slots?: Record<string, string>;
}

import { createAlova, type RequestBody } from 'alova';
import VueHook from 'alova/vue';
import type { AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';
import { mockAdapter } from './mock';

export interface ResponseBody<T> {
  message: string;
  data: T;
  code: number;
}

export const alova = createAlova({
  statesHook: VueHook,
  // 请求适配器，推荐使用fetch请求适配器
  requestAdapter: mockAdapter,
  // 全局的响应拦截器
  // responded: (response) => response.data,
});

export function post<Result, Params>(
  url: string,
  data?: RequestBody | undefined,
  configs?: {
    headers?: Record<string, string>;
  }
) {
  alova.Post<AxiosResponse<ResponseBody<Result>>, Params>(url, data, {
    headers: configs?.headers,
  });
}

export function bussinessPost<Result, Params>(
  url: string,
  data?: RequestBody,
  configs?: {
    headers?: Record<string, string>;
  }
) {
  return alova.Post<Result, Params>(url, data, {
    headers: configs?.headers,
    transformData: (data) => {
      const d = data as AxiosResponse<ResponseBody<Result>>;
      if (d.status >= 300 || d.status < 200) {
        const res = `网络错误: code: ${d.status}; message: ${d.statusText}`;
        ElMessage({
          message: res,
          type: 'error',
          grouping: true,
          customClass: 'message-ellipsis',
        });
        throw new Error(res);
      }
      if (d.data.code !== 200) {
        console.log('ccc', d.data.message);
        ElMessage({
          message: d.data.message,
          type: 'error',
          grouping: true,
          customClass: 'message-ellipsis',
        });
        throw new Error(d.data.message);
      }
      return d.data.data;
    },
  });
}

export * from './methods/login';
export * from './methods/draftForm';

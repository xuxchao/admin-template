import { axiosRequestAdapter } from '@alova/adapter-axios';
import { createAlovaMockAdapter } from '@alova/mock';
import type { AxiosResponse, AxiosResponseHeaders } from 'axios';
import login from './login';
import draftForm from './draftForm';

export const mockAdapter = createAlovaMockAdapter([draftForm, login], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: axiosRequestAdapter(),

  // mock接口响应延迟，单位毫秒
  delay: 500,

  // 是否打印mock接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  onMockResponse: (data) => {
    return {
      response: {
        data: data.body,
        config: {},
        headers: data.responseHeaders,
        status: data.status,
        statusText: data.statusText,
      } as AxiosResponse,
      headers: {} as AxiosResponseHeaders,
      // status: data.status,
      // statusText: data.statusText,
      // headers: data.responseHeaders,
      // data: data.body,
    };
  },
});

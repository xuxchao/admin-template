import { defineMock } from '@alova/mock';

export default defineMock(
  {
    '[POST]/login': (params) => {
      return {
        code: 200,
        data: {
          // 有效时间十分钟的 token
          token: Date.now() + 1000 * 60 * 10,
          account: params.data.account,
          userName: 'xuxchao',
          avatar: '/image/avatar.png',
        },
        message: 'ok',
      };
    },
    // 捕获get请求
    '/todo': [1, 2, 3, 4],

    // rest风格请求
    '/todo/{id}': ({ params }) => {
      const id = params.id;
      // ...
      return {
        title: '...',
        time: '10:00',
      };
    },

    // 捕获post请求
    '[POST]/todo': ({ query, data }) => {
      // ...
      return { success: true };
    },

    // // 返回更详细的信息
    // '[POST]/todo': ({ query, data }) => {
    //   // ...
    //   return {
    //     status: 403,
    //     statusText: 'unknown error',
    //     responseHeaders: {
    //       // ...
    //     },
    //     body: {
    //       success: true,
    //     },
    //   };
    // },

    // // 模拟网络错误
    // '[POST]/todo': ({ query, data }) => {
    //   throw new Error('network error');
    // },

    // key前面添加`-`，表示禁用此mock接口
    '-[DELETE]/todo/{id}': ({ params }) => {
      // ...
      return { success: true };
    },
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭

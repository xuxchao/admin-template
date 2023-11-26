import { defineMock } from '@alova/mock';

export default defineMock(
  {
    '[GET]/data-list': () => {
      return {
        code: 200,
        message: 'ok',
        data: [
          {
            id: 1,
          },
        ],
      };
    },
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭

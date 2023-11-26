import { defineMock } from '@alova/mock';

export default defineMock(
  {
    '[POST]/draft-form': () => {
      return {
        code: 200,
        message: 'ok',
      };
    },
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭

import { bussinessPost } from '..';

export interface DraftFormApiOption {
  name: string;
  age: number;
  /** 毫秒时间戳 */
  birth: string;
  sex: string;
  /** 身份证号 */
  idCard: string;
  /** 性趣爱好 */
  hobbies: string[];
  /** 个人介绍 */
  desc: string;
}

export const draftFormApi = (params: DraftFormApiOption) =>
  bussinessPost<undefined, DraftFormApiOption>('/draft-form', params);

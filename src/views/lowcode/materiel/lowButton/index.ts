import type { MetaInfoItem } from '../../type';
import type { ButtonInstance } from 'element-plus';

const LowButton = {
  comonentName: 'el-button',
  props: [
    { key: 'type', type: 'select', value: ['primary', 'success', 'warning'], initValue: 'primary' },
  ],
};

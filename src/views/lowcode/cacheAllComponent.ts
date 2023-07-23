import { ElButton } from 'element-plus';
import type { Component } from 'vue';

export const ALL_COMMENTS = new Map<string, Component>();

ALL_COMMENTS.set(ElButton.name, ElButton);

console.log(ALL_COMMENTS);

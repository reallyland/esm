import baseCloneDeep from 'lodash-es/cloneDeep';

export function cloneDeep<T>(data: T): T {
  return baseCloneDeep<T>(data);
}

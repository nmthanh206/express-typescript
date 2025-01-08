import type { Controller } from '@/types';

import { asyncHandler } from './asyncHandler';

const createController = <T extends Controller>(controller: T) => {
  return Object.entries(controller).reduce((pre: any, [key, method]) => {
    pre[key] = asyncHandler(method);
    return pre;
  }, {}) as T;
};
export { createController };

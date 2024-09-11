import { some, isEmpty } from 'lodash-es';

export const hasEmptyValue = (obj: object) => {
  return some(
    obj,
    (value: unknown) => isEmpty(value) || value === null || value === undefined,
  );
};

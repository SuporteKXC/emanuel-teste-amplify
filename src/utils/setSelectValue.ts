import { FormHandles } from '@unform/core';
import { SelectOption } from 'contracts';
import { RefObject } from 'react';

export const setSelectValue = function<dataKeys>(
  value: keyof dataKeys,
  options: SelectOption[],
  data: dataKeys,
  ref: RefObject<FormHandles>
) {
  if (data[value]) {
    const [filteredOption] = options.filter(
    option => option.value === data[value]
  )
  
    if (filteredOption && typeof value === 'string' ) {
      ref?.current?.setFieldValue(value, filteredOption);
    }
  }
}
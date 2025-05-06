import { FormHandles } from '@unform/core';
import { SelectOption } from 'contracts';
import { RefObject } from 'react';

export const setMultiSelectValue = function<dataKeys>(
  value: keyof dataKeys,
  options: SelectOption[],
  data: dataKeys,
  ref: RefObject<FormHandles>
) {
  const passedOption = data[value];
  if (passedOption && passedOption instanceof Array) {
    const filteredOptions = options.filter(
      option => passedOption.includes(option.value)
    );
    
    if (filteredOptions && typeof value === 'string') {
      ref?.current?.setFieldValue(value, filteredOptions); 
    }
  }
}
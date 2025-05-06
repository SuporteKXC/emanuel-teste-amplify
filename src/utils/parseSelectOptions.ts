import { SelectContentProps } from "@/components/ui/Forms";
import { SelectOption } from "@/contracts";
import { GroupBase, OptionsOrGroups } from "react-select";

export const parseSelectOptions = <T>(
  data: T[] | T | any,
  label: keyof T,
  value: keyof T
) => {
  if (!data) return [];

  if (data.constructor === Object) {
    return [
      {
        label: data[label],
        value: data[value],
      },
    ] as OptionsOrGroups<SelectOption, GroupBase<SelectOption>>;
  }

  if (data.constructor === Array) {
    return data.map((item) => ({
      label: item[label],
      value: item[value],
    })) as OptionsOrGroups<SelectOption, GroupBase<SelectOption>>;
  }
};

export const parseSelectOptionsGs = <T>(
  data: T[] | T | any,
  label: keyof T,
  value: keyof T
) => {
  if (!data) return [];

  if (data.constructor === Object) {
    return [
      {
        name: data[label],
        value: data[value],
      },
    ] as SelectContentProps[];
  }

  if (data.constructor === Array) {
    return data.map((item) => ({
      name: item[label],
      value: item[value],
    })) as SelectContentProps[];
  }
};

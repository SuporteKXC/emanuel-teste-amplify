import { Colors, fonts } from 'styles';

export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components/Form';

export const customStyles: Record<string, any> = {
  menu: (provided: any) => ({
    ...provided,
    borderRadius: 0,
    padding: 0,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    borderWidth: 0,
    color: state.isSelected ? '#FFF' : '#000',
    backgroundColor: state.isSelected ? Colors.Gray30 : '#FFF',
    padding: 8,
    fontFamily: fonts.GilroySemiBold,
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
    borderRadius: 0,
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 0,
    fontFamily: fonts.GilroySemiBold,
    fontSize: 14,
    margin: 0,
    maxHeight: 50,
    borderRadius: 0,
  }),
  container: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    fontSize: 14,
    padding: 0,
    paddingLeft: 16,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontFamily: fonts.GilroySemiBold,
    fontSize: 14,
    padding: 0,
  }),
  multiValue: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    boxSizing: 'border-box',
    outline: 'none',
    color: Colors.Gray30,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    marginLeft: 0,
    fontSize: 14,
    fontFamily: fonts.GilroySemiBold,
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    fontSize: 10,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    color: Colors.Gray30,
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    backgroundColor: Colors.Gray30,
  }),
};

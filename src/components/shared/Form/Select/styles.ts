import { Colors, fonts } from 'styles';

export {
  FieldContainer,
  FieldError,
  FieldLabel,
} from 'styles/styled-components/Form';

export const customStyles: Record<string, any> = {
  option: (provided: any, state: any) => ({
    ...provided,
    borderBottom: `1px #ddd solid`,
    color: state.isSelected ? '#FFF' : '#000',
    backgroundColor: state.isSelected ? Colors.Gray30 : '#FFF',
    padding: 8,
    fontFamily: fonts.GilroyRegular,
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
  }),
  input: (provided: any) => ({
    ...provided,
    paddingTop: 16,
    paddingBottom: 16,
    fontSize: 14,
    margin: 0,
    maxHeight: 50,
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
    fontSize: 14,
    padding: 0,
  }),
  multiValue: (provided: any) => ({
    ...provided,
  }),
  control: (provided: any) => ({
    ...provided,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 6,
    boxSizing: 'border-box',
    outline: 'none',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    marginLeft: 0,
    fontSize: 14,
  }),
  indicatorsContainer: (provided: any) => ({
    ...provided,
    fontSize: 10,
    color: '#ccc',
  }),
};

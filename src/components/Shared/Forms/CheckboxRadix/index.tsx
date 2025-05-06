import * as S from "./styles";

interface CheckboxRadixProps {
  id: number;
  isChecked?: boolean;
  handleCheck: (e: any) => void;
  hidden?: boolean;
  disabled?: boolean;
}

const CheckboxRadix = ({
  id,
  isChecked = false,
  handleCheck,
  hidden,
  disabled,
}: CheckboxRadixProps) => {
  return (
    <S.CheckboxContainer
      type="button"
      title="Selecionar NF"
      checked={isChecked}
      id={`${id}`}
      value={id}
      onClick={handleCheck}
      hide={hidden}
      disabled={disabled}
    >
      <S.Indicator>
        {isChecked === true && <S.CheckedIcon size={20} />}
      </S.Indicator>
    </S.CheckboxContainer>
  );
};

export { CheckboxRadix };

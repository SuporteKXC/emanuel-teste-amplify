import React from "react";
import * as S from "./styles";

interface Props {
  label: string;
  active: boolean;
  options: string[];
  onSelect: (value: boolean) => void;
}

export const Toggle: React.FC<Props> = ({
  label,
  active,
  options,
  onSelect,
}) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.Button active={active} onClick={() => onSelect(!active)}>
        {active ? <S.IconToggleOn /> : <S.IconToggleOff />}
        {active ? options[0] : options[1]}
      </S.Button>
    </S.Container>
  );
};

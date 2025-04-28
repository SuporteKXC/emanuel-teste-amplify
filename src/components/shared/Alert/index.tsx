import React from "react";
import { useTranslation } from "hooks";
import { translations } from "./translations";
import * as S from "./styles";

interface IAlertProps {
  title?: string;
  text?: string;
  close: () => void;
  action: () => void;
  labelAction?: string;
  icon?: object;
  isLoading?: boolean;
}

export const Alert: React.FC<IAlertProps> = ({
  title,
  text,
  close,
  action,
  labelAction = "Ok",
  icon,
  isLoading = false,
}) => {
  const { getTranslation } = useTranslation(translations);
  return (
    <S.Container>
      <S.Header>
        {icon || <S.IconWarning />}
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Text>{text}</S.Text>
      <S.ButtonsWrapper>
        <S.Button btStyle="cancel" onClick={close}>
          {getTranslation("cancelar")}
        </S.Button>
        <S.Button btStyle="danger" onClick={action}>
          {isLoading ? <S.Loading /> : labelAction}
        </S.Button>
      </S.ButtonsWrapper>
    </S.Container>
  );
};

import React from "react";
import * as S from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useTranslation } from "react-i18next";

interface FilterProps {
  onFilter: () => void;
}

export const CarrierFilter = React.memo<FilterProps>(({ onFilter }) => {
  const formRef = React.useRef<FormHandles>(null);
  const { t } = useTranslation();
  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onFilter} placeholder="">
        <S.InputJust
          name="tradeName"
          placeholder={t("general.config.carriers.nome") + "..."}
        />
        <S.InputJust
          name="documentNumber"
          placeholder={t("general.config.carriers.documento") + "..."}
          type="number"
        />
        <S.ButonsWrapper>
          <S.Button type="submit">
            <S.SearchIcon /> {t("general.config.carriers.buscar")}
          </S.Button>
        </S.ButonsWrapper>
      </Form>
    </S.Container>
  );
});

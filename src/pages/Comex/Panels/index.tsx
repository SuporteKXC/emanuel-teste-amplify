import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
//components
import { AlteracaoGr, Gerencial } from "components";

type PanelMenu = "gr" | "gerencial";

export const Panels: React.FC = () => {
  const [selected, setSelected] = useState<PanelMenu>("gr");
  const { i18n, t } = useTranslation();

  const selectPanel = (option: PanelMenu) => {
    localStorage.setItem("PanelMenu", option);
    setSelected(option);
  };

  useEffect(() => {
    const last = localStorage.getItem("PanelMenu");
    setSelected(last !== null ? (last as PanelMenu) : "gr");
  }, []);

  return (
    <S.Container>
      <S.MenuWrapper>
        <S.MenuItem
          active={selected === "gr"}
          onClick={() => selectPanel("gr")}
        >
          {t("comex.panels.changeGR")}
        </S.MenuItem>
        <S.MenuItem
          active={selected === "gerencial"}
          onClick={() => selectPanel("gerencial")}
        >
          {t("comex.panels.managerial")}
        </S.MenuItem>
      </S.MenuWrapper>
      {selected === "gr" ? <AlteracaoGr /> : <Gerencial />}
    </S.Container>
  );
};

export default Panels;

import React from "react";
import imgExcel from "assets/images/excel.png";
import imgLoad from "assets/images/load.gif";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  onExport?: () => void;
  compact?: boolean;
  progress?: number;
}

const ExportExcel: React.FC<Props> = ({
  loading,
  onExport,
  compact,
  progress,
}) => {
  const { t } = useTranslation();

  return (
    <S.ExportExcelContainer
      onClick={onExport}
      disabled={loading}
      isCompact={compact}
      type="button"
    >
      <span>
        {loading && !progress ? (
          <img src={imgLoad} alt="" />
        ) : loading && progress ? (
          <S.ProgressBar width={progress}>
            <div className="progress"/>
          </S.ProgressBar>
        ) : (
          <img src={imgExcel} alt="" />
        )}
      </span>
      <p>{t("general.exportReport")}</p>
    </S.ExportExcelContainer>
  );
};

export default ExportExcel;

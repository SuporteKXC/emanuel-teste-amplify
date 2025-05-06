import { Modal } from "components/shared";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

export const JustificationModal = (props: any): JSX.Element => {
  const { onClickOutside, elementDivergent } = props;
  const { t } = useTranslation();

  const { description, code, batch, company_total_qty, warehouse_total_qty, diff_qty, plant_code, justification } = elementDivergent;

  const not = "---";

  return (
    <Modal {...props}>
      <S.Container>
        <S.Title>
        <S.MessageIcon />
        {elementDivergent && code ? code : not} - {elementDivergent && description ? description : not}
          <S.CloseButton >
            <S.CloseIcon onClick={onClickOutside}/>
          </S.CloseButton>
        </S.Title>
        <S.GridContainer>
          <S.Header>
            <p>{t("management.snapshot.divergencias.lote")}</p>
            <p>{t("management.snapshot.divergencias.planta")}</p>
            <p>{t("management.snapshot.divergencias.qtdSap")}</p>
            <p>{t("management.snapshot.divergencias.qtdWms")}</p>
            <p>{t("management.snapshot.divergencias.divergencia")}</p>
          </S.Header>
          <S.ItemContainer>
          <S.Item>
            <S.Column className="bold">{elementDivergent && batch ? batch : not}</S.Column>
            <S.Column>{elementDivergent && plant_code ? plant_code : not}</S.Column>
            <S.Column>{elementDivergent && company_total_qty ? company_total_qty : not}</S.Column>
            <S.Column>{elementDivergent && warehouse_total_qty ? warehouse_total_qty : not}</S.Column>
            <S.Column className="divergence">{elementDivergent && diff_qty ? diff_qty : not}</S.Column>
          </S.Item>
          </S.ItemContainer>
        </S.GridContainer>
        <S.TitleText>{t("management.snapshot.divergencias.justificativa")}</S.TitleText>
        <S.CommentText>{elementDivergent && justification && justification[0] ? justification[0]?.name : ""}</S.CommentText>
        <S.TitleText>{t("management.snapshot.divergencias.comentario")}</S.TitleText>
        <S.DivMensage>
          <S.CommentText>{elementDivergent && justification && justification[0] ? justification[0]?.comment : ""}</S.CommentText>
        </S.DivMensage>
      </S.Container>
    </Modal>
  );
};

import { Modal, ModalProps, Select, TextArea } from "components/shared";
import * as S from "./styles";
import { useCallback, useRef, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DivergenceContext } from "contexts/DivergenceContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { DivergentJustificationCreateManyActions } from "store/ducks/management/divergentJustification";
import * as Yup from "yup";
import { useAuth, useValidation } from "hooks";
import { FormHandles, SubmitHandler } from "@unform/core";
import { SnapshotDivergentListActions } from "store/ducks/management/snapshotDivergent";

interface DivergenceModalProps extends ModalProps {
  divergences?: any[];
  onClickOutside: () => void;
}

interface ItemProps {
  divergence: any;
}

interface Groups {
  label: string;
  value: string;
}

export const DivergenceModal = (props: DivergenceModalProps): JSX.Element => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const { handleFormErrors } = useValidation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [arrayDivergent, setArrayDivergent] = useState<any[]>([]);
  const { profile } = useAuth();

  const { isOpen, onClickOutside } = props;

  const { selectedList, onClear } = useContext(DivergenceContext);

  const { data } = useSelector(
    (state: RootState) => state.snapshotDivergentList
  );

  const { data: justificationSnapshotType } = useSelector(
    (state: RootState) => state.justificationSnapshotTypeList
  );

  const { data: snapshotDivergentFilter } = useSelector(
    (state: RootState) => state.snapshotDivergentFilterData
  );

  const clearDivergenceForm = () => {
    formRef.current?.reset();
    onClear();
    onClickOutside();
  };

  const onSuccess = useCallback(() => {
    clearDivergenceForm();
    dispatch(
      SnapshotDivergentListActions.request({ ...snapshotDivergentFilter })
    );
  }, [dispatch, SnapshotDivergentListActions, snapshotDivergentFilter]);

  let arrayDivergents: any[] = [];

  useEffect(() => {
    setLoading(true);
    data?.forEach((element) => {
      element.snapshotDivergent.forEach((item) => {
        const verifyDivergent = selectedList.includes(String(item.id));
        if (verifyDivergent) {
          arrayDivergents.push(item);
        }
      });
    });

    setLoading(false);
    setArrayDivergent(arrayDivergents);
  }, [isOpen]);

  const justificationSnapshotTypeValid: Groups[] = [];
  justificationSnapshotType?.forEach((item: any) => {
    const justificationSnapshotTypeValidAdapt = {
      value: `${item.id}`,
      label: item.name,
    };
    justificationSnapshotTypeValid.push(justificationSnapshotTypeValidAdapt);
  });

  const onSubmit = useCallback<SubmitHandler>(
    async (item: any) => {
      try {
        const dataSubmit = arrayDivergent?.map((element) => {
          return {
            comment: item.comment,
            snapshotDivergentId: element.id,
            justificationSnapshotTypeId: item.justification_snapshot_type_id,
            userId: profile?.userId,
          };
        });

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          data: Yup.array()
            .of(
              Yup.object().shape({
                snapshotDivergentId: Yup.number().required(
                  t("management.message.fieldMandatory")
                ),
                justificationSnapshotTypeId: Yup.number().required(
                  t("management.message.fieldMandatory")
                ),
                comment: Yup.string(),
                userId: Yup.number().required(
                  t("management.message.necessariologar")
                ),
              })
            )
            .min(1, t("management.message.fieldMandatory")),
        });

        await schema.validate(
          {
            data: dataSubmit,
          },
          {
            abortEarly: false,
          }
        );

        dispatch(
          DivergentJustificationCreateManyActions.request(
            { data: dataSubmit },
            onSuccess
          )
        );
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, arrayDivergent, handleFormErrors, profile]
  );

  const Item = ({ divergence }: ItemProps) => {
    const not = "---";

    const {
      description,
      batch,
      plant_code,
      company_total_qty,
      warehouse_total_qty,
      diff_qty,
    } = divergence;

    return (
      <S.Item>
        <S.Column className="bold">{description ?? not}</S.Column>
        <S.Column className="bold">{batch ?? not}</S.Column>
        <S.Column>{plant_code ?? not}</S.Column>
        <S.Column>{company_total_qty ?? not}</S.Column>
        <S.Column>{warehouse_total_qty ?? not}</S.Column>
        <S.Column className="divergence">{diff_qty ?? not}</S.Column>
      </S.Item>
    );
  };

  return (
    <Modal {...props}>
      <S.Container>
        <S.Title>
          <S.MessageIcon />
          {t("management.snapshot.divergencias.adicionarjustificativa")}
          <S.CloseButton onClick={props.onClickOutside}>
            <S.CloseIcon />
          </S.CloseButton>
        </S.Title>
        <S.GridContainer>
          <S.Header>
            <p>{t("management.snapshot.divergencias.produto")}</p>
            <p>{t("management.snapshot.divergencias.lote")}</p>
            <p>{t("management.snapshot.divergencias.planta")}</p>
            <p>{t("management.snapshot.divergencias.qtdSap")}</p>
            <p>{t("management.snapshot.divergencias.qtdWms")}</p>
            <p>{t("management.snapshot.divergencias.divergencia")}</p>
          </S.Header>
          <S.ItemContainer>
            {loading ? (
              <S.ActivityIndicator />
            ) : (
              <>
                {arrayDivergent.map((item) => (
                  <Item divergence={item} key={item.id} />
                ))}
              </>
            )}
          </S.ItemContainer>
        </S.GridContainer>
        <S.JustifyForm ref={formRef} onSubmit={onSubmit} placeholder="">
          <Select
            label={t("management.snapshot.divergencias.justificativa")}
            name="justification_snapshot_type_id"
            scheme="tertiary"
            options={justificationSnapshotTypeValid}
            placeholder={t("management.snapshot.divergencias.selecione")}
          />
          <TextArea
            name="comment"
            label={t("management.snapshot.divergencias.comentario")}
            height={"96px"}
            maxHeight={"100%"}
          />
          <S.Submit type="submit">
            {t("management.snapshot.divergencias.adicionar")}
          </S.Submit>
        </S.JustifyForm>
      </S.Container>
    </Modal>
  );
};

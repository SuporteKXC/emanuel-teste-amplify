import React, { useEffect, useMemo, useRef } from "react";
import * as S from "./styles";

import * as Yup from "yup";

import { Input, Modal, MultiSelect, Select, TextArea } from "components/shared";
import { Form } from "@unform/web";
import { Alert } from "../Complaint/styles";
import { useTranslation } from "react-i18next";
import { FormHandles } from "@unform/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import {
  ComplaintResponsiblesActions,
  ComplaintTypesActions,
  InsertComplaintActions,
} from "store/ducks/management";
import { TransferInsertComplaintActions } from "store/ducks/management/transfer";

const validationSchema = Yup.object().shape({
  number: Yup.number()
    .typeError("Somente números.")
    .required("Este campo é obrigatório."),
  description: Yup.string().required("Este campo é obrigatório."),
  complaintTypes: Yup.array()
    .min(1, "Selecione pelo menos um tipo de complaint.")
    .required(),
  complaintResponsibleId: Yup.number()
    .typeError("Este campo é obrigatório.")
    .required("Selecione um resposável."),
});

export interface FormData {
  number: number;
  description: string;
  complaintTypes: number[];
}

export const ComplaintModal = (props: any): JSX.Element => {
  const { snapshotId, setIsOpen } = props;
  const { t } = useTranslation();
  const { data } = useSelector((state: RootState) => state.complaintTypes);
  const { loading } = useSelector((state: RootState) => state.InsertComplaint);
  const { data: user } = useSelector((state: RootState) => state.auth);
  const { data: responsibles } = useSelector(
    (state: RootState) => state.complaintResponsibles
  );
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = async (data: FormData) => {
    try {
      const validData = {
        ...data,
        userId: user?.profile.userId,
        stockTransferSnapshotId: snapshotId,
      };

      await validationSchema.validate(validData, { abortEarly: false });
      formRef.current?.setErrors({});

      dispatch(TransferInsertComplaintActions.request(validData));

      setIsOpen(false);
    } catch (error) {
      const validationErrors: Record<string, string> = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          validationErrors[err.path as keyof Partial<FormData>] = err.message;
        });
        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  const complaintTypesOptions = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.map((types: any) => ({ value: types.id, label: types.name }));
  }, [data]);

  const complaintResponsibleOptions = useMemo(() => {
    if (responsibles)
      return responsibles.map((responsible) => ({
        value: responsible.id,
        label: responsible.name,
      }));

    return [];
  }, [responsibles]);

  const fetchComplaintResponsibles = () => {
    dispatch(ComplaintResponsiblesActions.request());
  };

  const fetchComplaintTypes = () => {
    dispatch(ComplaintTypesActions.request());
  };

  useEffect(() => {
    fetchComplaintTypes();
    fetchComplaintResponsibles();
  }, []);

  useEffect(() => {
    if (!props.isOpen) {
      if (formRef.current) {
        formRef.current.reset();
        formRef.current?.setErrors({});
      }
    }
  }, [props.isOpen]);

  return (
    <Modal {...props}>
      <S.Container>
        <S.Title>
          <S.TitleWrapper>
            <Alert />
            {t("management.tracking.importacao.complaintModalTitle")}
          </S.TitleWrapper>
          <S.ModalCloseButton onClick={() => setIsOpen(false)}>
            <S.CloseIcon />
          </S.ModalCloseButton>
        </S.Title>
        <Form ref={formRef} onSubmit={handleSubmit} placeholder="">
          <Input
            name="number"
            placeholder={t("management.tracking.importacao.complaintNumber")}
          />
          <TextArea
            name="description"
            placeholder={t(
              "management.tracking.importacao.complaintDescription"
            )}
          />
          <MultiSelect
            name="complaintTypes"
            options={complaintTypesOptions}
            placeholder={t("management.tracking.importacao.complaintTypes")}
          />
          <Select
            name="complaintResponsibleId"
            options={complaintResponsibleOptions}
            placeholder={t("management.tracking.importacao.responsavel")}
          />

          <S.ButtonContainer>
            <S.Button disabled={loading}>
              {loading && <S.ActivityIndicator />}
              {!loading &&
                t("management.tracking.importacao.complaintBtnSalvar")}
            </S.Button>
          </S.ButtonContainer>
        </Form>
      </S.Container>
    </Modal>
  );
};

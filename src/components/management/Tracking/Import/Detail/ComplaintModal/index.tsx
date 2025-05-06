import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import { DatePicker } from "components/shared/Forms/DatePicker";
import { api, notify } from "services";
import { ComplaintUploadFileActions } from "store/ducks/management/complaintUploadFile";
import { ComplaintImpactedAreaActions } from "store/ducks/management/complaint";

const validationSchema = Yup.object().shape({
  number: Yup.number()
    .typeError("Somente números.")
    .required("Este campo é obrigatório."),
  descriptionByType: Yup.string().required("Este campo é obrigatório."),
  complaintTypes: Yup.number()
    .typeError("Selecione um tipo.")
    .required("Este campo é obrigatório.")
    .required(),
  complaintResponsibleId: Yup.number()
    .typeError("Este campo é obrigatório.")
    .required("Selecione um resposável."),
  receivedDate: Yup.string().required("Selecione uma data."),
  invoiceNumber: Yup.string().required("Este campo é obrigatório."),
  siteShipper: Yup.string().required("Este campo é obrigatório."),
  responsibleAnalyst: Yup.string().required("Este campo é obrigatório."),
  receivingPlant: Yup.string().required("Este campo é obrigatório."),
  materialCode: Yup.string().required("Este campo é obrigatório."),
  materialDescription: Yup.string().required("Este campo é obrigatório."),
  lote: Yup.string().required("Este campo é obrigatório."),
  totalAmount: Yup.string().required("Este campo é obrigatório."),
  quantityDeviation: Yup.string().required("Este campo é obrigatório."),
  complaintImpactedAreaId: Yup.string().required("Este campo é obrigatório."),
  ncClosingDate: Yup.string().required("Este campo é obrigatório."),
});

export interface FormData {
  number: number;
  description: string;
  complaintTypes: number[];
}

export const ComplaintModal = (props: any): JSX.Element => {
  const { snapshotId, setIsOpen, po, product, orderId } = props;
  const { t } = useTranslation();
  const { data, loading: complaintTypesLoading } = useSelector((state: RootState) => state.complaintTypes);
  const { loading } = useSelector((state: RootState) => state.InsertComplaint);
  const { data: user } = useSelector((state: RootState) => state.auth);
  const { data: responsibles, loading: responsiblesLoading } = useSelector(
    (state: RootState) => state.complaintResponsibles
  );
  const { data: impactedArea, loading: impactedAreaLoading } = useSelector(
    (state: RootState) => state.complaintImpactedArea
  );
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const [images, setImages] = useState<any[]>([]);
    
  const handleSubmit = async (data: FormData) => {
    try {
      const validData = {
        ...data,
        userId: user?.profile.userId,
        stockMovementsSnapshotId: snapshotId,
        complaintImages: images.map((image) => ({
          path: image.fileKey,
          fileKey: image.fileKey,
          name: image.name,
          type: image.type,
        })),
        po: po,
        product: product?.code,
        orderId: orderId,
        isSentSupplier: 1,
      };

      await validationSchema.validate(validData, { abortEarly: false });
      formRef.current?.setErrors({});

      dispatch(InsertComplaintActions.request(validData));

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

  const complaintImpactedAreaOptions = useMemo(() => {
    if (!impactedArea) {
      return [];
    }
    return impactedArea.map((area: any) => ({
      value: area.id,
      label: area.name,
    }));
  }, [impactedArea]);

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

  const fetchComplaintImpactedArea = () => {
    dispatch(ComplaintImpactedAreaActions.request());
  };

  const uploadOnSuccess = async (file: any) => {
    formRef.current?.setFieldValue("image", null);

    setImages([...images, file]);
  };

  const UploadComplaintImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.currentTarget?.files![0];
    if (!file) return;

    try {
      const fileSizeLimit = 5242880; // 5MB

      const fullSize = file.size;

      if (fullSize > fileSizeLimit) {
        formRef.current?.setFieldValue("image", null);
        throw new Error("Limite máximo de tamanho de imagem (5MB) excedido");
      }

      const match = file.name.match(/^(.+)\.([a-zA-Z]+)$/i)!;
      const fileName = match[1];
      const type = match[2];

      const checkType = new RegExp(/^(jpg|jpeg|png)$/i);

      if (!checkType) {
        formRef.current?.setFieldValue("image", null);
        throw new Error("Formato do arquivo inválido.");
      }

      dispatch(
        ComplaintUploadFileActions.request(
          {
            name: fileName,
            type: type,
            data: file,
          },
          uploadOnSuccess
        )
      );
    } catch (error) {
      console.log("oops>>", error);
    }
  };

  const handleDescriptionByType = (type: any) => {
    if (!type) return;
    const currentType = data.find((dataType) => dataType.id === type.value);
    formRef.current?.setFieldValue(
      "descriptionByType",
      currentType?.description
    );
  };

  useEffect(() => {
    fetchComplaintTypes();
    fetchComplaintResponsibles();
    fetchComplaintImpactedArea();
  }, []);

  useEffect(() => {
    if (!props.isOpen) {
      if (formRef.current) {
        formRef.current.reset();
        formRef.current?.setErrors({});
        setImages([]);
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
          <S.FormContainer>
            <S.InputWrapper minmax={4}>
              <Input
                type="date"
                name="receivedDate"
                label={"Data de Recebimento"}
              />
              <Input
                name="number"
                label={t("management.tracking.importacao.complaintNumber")}
                placeholder={t(
                  "management.tracking.importacao.complaintNumber"
                )}
              />
            </S.InputWrapper>

            <S.InputWrapper minmax={3}>
              <Input
                name="invoiceNumber"
                label={"Nº Nota Fiscal"}
                placeholder={"Nº Nota Fiscal"}
              />
              <Input
                name="siteShipper"
                label={"Site embarcador"}
                placeholder={"Site embarcador"}
              />
              <Input
                name="responsibleAnalyst"
                label={"Analista responsável"}
                placeholder={"Analista responsável"}
              />
            </S.InputWrapper>

            <S.InputWrapper minmax={3}>
              <Input
                name="receivingPlant"
                label={"Planta Recebedora"}
                placeholder={"Planta Recebedora"}
              />
              <Input
                name="materialCode"
                label={"Código do material"}
                placeholder={"Código do material"}
              />
              <Input
                name="materialDescription"
                label={"Descrição do material"}
                placeholder={"Descrição do material"}
              />
              <Input name="lote" label={"Lote"} placeholder={"Lote"} />
              <Input
                name="totalAmount"
                label={"Quantidade total"}
                placeholder={"Quantidade total"}
              />
              <Input
                name="quantityDeviation"
                label={"Quantidade com desvio"}
                placeholder={"Quantidade com desvio"}
              />
            </S.InputWrapper>

            <S.InputWrapper minmax={3}>
              <Select
                name="complaintImpactedAreaId"
                options={complaintImpactedAreaOptions}
                label={"Área impctada"}
                placeholder={"Área impctada"}
                isLoading={impactedAreaLoading}
              />
              <Input
                type="date"
                name="ncClosingDate"
                label={"Data de encerramento da NC"}
              />
              <Select
                name="complaintResponsibleId"
                options={complaintResponsibleOptions}
                label={t("management.tracking.importacao.responsavel")}
                placeholder={t("management.tracking.importacao.responsavel")}
                isLoading={responsiblesLoading}
              />
            </S.InputWrapper>

            <Select
              name="complaintTypes"
              options={complaintTypesOptions}
              label={t("management.tracking.importacao.complaintTypes")}
              placeholder={t("management.tracking.importacao.complaintTypes")}
              onChange={(value) => handleDescriptionByType(value)}
              isLoading={complaintTypesLoading}
            />

            <TextArea
              name="descriptionByType"
              label={"Descrição"}
              placeholder={"Descrição"}
              readOnly
            />
            <TextArea
              name="description"
              label={"Descrição da ocorrência"}
              placeholder={"Descrição da ocorrência"}
            />

            <Input
              type="file"
              name="complaintImages"
              onChange={UploadComplaintImage}
              label="Evidência da não conformidade"
              accept="image/*"
            />

            <S.ImageShowContianer>
              {images.map((image, index) => (
                <span key={index.toString()}>{image.name}</span>
              ))}
            </S.ImageShowContianer>
            <S.ButtonContainer>
              <S.Button disabled={loading}>
                {loading && <S.ActivityIndicator />}
                {!loading &&
                  t("management.tracking.importacao.complaintBtnSalvar")}
              </S.Button>
            </S.ButtonContainer>
          </S.FormContainer>
        </Form>
      </S.Container>
    </Modal>
  );
};

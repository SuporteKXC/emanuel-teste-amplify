import React, { useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";

import * as S from "./styles";
import { Input, Select, TextArea } from "@/components";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Button } from "@/styles/components";

import FinalizeModal from "@/components/management/Tracking/Complaint/FinalizeModal";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { parseSelectOptions } from "@/utils/parseSelectOptions";
import {
  ComplaintResponsiblesActions,
  ComplaintTypesActions,
  InsertComplaintActions,
  UpdateComplaintActions,
} from "@/store/ducks/management";
import {
  ComplaintImpactedAreaActions,
  ComplaintShowActions,
} from "@/store/ducks/management/complaint";
import { MultiValue } from "react-select";
import { SelectOption } from "@/contracts";
import { ComplaintUploadFileActions } from "@/store/ducks/management/complaintUploadFile";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ComplaintData } from "@/contracts/management";
import { Loading } from "@/components/shared/Forms/Input/styles";
import { notify } from "@/services";
import ComplaintAccordion from "@/components/management/Tracking/Complaint/ComplaintAccordion";
import ComplaintImage from "@/components/management/Tracking/Complaint/ComplaintImage";
import ComplaintOrdersGrid from "@/components/management/Tracking/Complaint/ComplaintOrdersGrid";
import { ComplaintDownloadButton } from "@/components/management/Tracking/Import/Detail/ComplaintDownloadButton";
import { StockOrderProductCreateActions } from "@/store/ducks/management/stockOrderProduct";
import { Dropzone } from "@/components/ui/Forms/inputFileDrag";

const validationSchema = Yup.object().shape({
  descriptionByType: Yup.string().required(
    "Este campo é preenchido automático."
  ),
  complaintTypes: Yup.string().required("Selecione o tipo de complaint."),
  complaintResponsibleId: Yup.string().required("Selecione um responsável."),
  complaintImpactedAreaId: Yup.string().required(
    "Selecione uma área impactada."
  ),
});

export interface FormData {
  descriptionByType: string;
  customDescriptionByType: string;
  complaintTypes: number;
  complaintResponsibleId: number;
  complaintImpactedAreaId: number;
  complaintImages: string | any;
}

export const NovoComplaint = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const orderId = search.get("order");
  const productId = search.get("product");

  const { id } = useParams();

  const navigation = useNavigate();

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const [images, setImages] = useState<any[]>([]);
  const [imageLoad, setImageLoad] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [defectType, setDefectType] = useState(null);
  const [defectQty, setDefectQty] = useState(0);

  const { data: user } = useSelector((state: RootState) => state.auth);

  const { data: complaintShow } = useSelector(
    (state: RootState) => state.complaintShow
  );
  const { data: complaintTypes, loading: complaintTypesLoading } = useSelector(
    (state: RootState) => state.complaintTypes
  );
  const { data: responsibles, loading: responsiblesLoading } = useSelector(
    (state: RootState) => state.complaintResponsibles
  );
  const { data: impactedArea, loading: impactedAreaLoading } = useSelector(
    (state: RootState) => state.complaintImpactedArea
  );

  const { loading: insertComplaintLoading } = useSelector(
    (state: RootState) => state.InsertComplaint
  );
  const { loading: uploadComplaintLoading } = useSelector(
    (state: RootState) => state.updateComplaint
  );

  const complaintTypesOptions = parseSelectOptions(
    complaintTypes,
    "name",
    "id"
  );
  const impactedAreaOptions = parseSelectOptions(impactedArea, "name", "id");
  const responsiblesOptions = parseSelectOptions(responsibles, "name", "id");

  const fetchs = () => {
    dispatch(ComplaintResponsiblesActions.request());
    dispatch(ComplaintTypesActions.request());
    dispatch(ComplaintImpactedAreaActions.request());
  };

  const showComplaintSuccess = (data: ComplaintData) => {
    if (data) {
      const {
        impactedArea,
        responsible,
        complaintTypes,
        complaintMovementsSnapshot,
      } = data;
      formRef.current?.setData({
        complaintImpactedAreaId: parseSelectOptions(impactedArea, "name", "id"),
        complaintResponsibleId: parseSelectOptions(responsible, "name", "id"),
        complaintTypes: parseSelectOptions(complaintTypes, "name", "id"),
        customDescriptionByType: data.description,
        descriptionByType: complaintTypes[0].description,
      });
      const complaintOrders = complaintMovementsSnapshot.map((stock) => {
        delete stock.status;
        return {
          ...stock,
          batch: stock?.stockElement?.batch,
          orderReference: stock.stockOrders.orderReference,
          invoiceNumber: stock.stockOrders.invoiceNumber,
          plant_delivery: stock.stockOrders.order.orderItem[0].plant_delivery,
          description:
            stock.stockOrders?.order?.orderItem[0]?.supplier?.description,
          name: stock.stockOrders.order.orderItem[0]?.supplier
            ?.user_suppliers[0]?.user?.name,
          nameFantasy: stock.stockOrders.order.company.nameFantasy,
          materialCode: stock.stockOrders.order.product.code,
          materialDescription: stock.stockOrders.order.product.description,
        };
      });
      setOrders([...orders, ...complaintOrders]);
    }
  };

  const showComplaintError = () => {
    navigation(-1);
  };

  const fetchShowComplaint = () => {
    dispatch(
      ComplaintShowActions.request(id, showComplaintSuccess, showComplaintError)
    );
  };

  const handleDescriptionByType = (type: MultiValue<SelectOption> | any) => {
    if (!type) return;

    const currentType = complaintTypes.find(
      (dataType) => dataType.id === type.value
    );
    formRef.current?.setFieldValue(
      "descriptionByType",
      currentType?.description
    );
  };

  const onSubmitSuccess = (complaint: any) => {
    formRef.current?.reset();
    navigation(`/management/tracking/complaint`);
  };

  const onSubmit = async (data: FormData) => {
    try {
      if (
        orders.length === 0 &&
        !orderId &&
        !productId &&
        complaintShow?.complaintMovementsSnapshot.length
      ) {
        notify("error", "Selecione uma order");
        return;
      }

      const adaptOrder = orders?.map((order) => {
        return {
          id: order.id,
          defectQty: order.defectQty,
          defectTypeId: order.defectTypeId,
        };
      });
      const validData = {
        ...data,
        id: id ?? null,
        complaintImages: images.map((image) => ({
          path: image.fileKey,
          fileKey: image.fileKey,
          name: image.name,
          type: image.type,
        })),
        stockMovementsSnapshotId: adaptOrder,
        isSentSupplier: 1,
        description: data.customDescriptionByType,
        userId: user?.profile.userId,
        defectTypeId: defectType,
        defectQty: defectQty,
        orderId: orderId ?? null,
        productId: productId ?? null,
      };

      await validationSchema.validate(validData, { abortEarly: false });
      formRef.current?.setErrors({});

      if (validData.id === null) {
        if (productId && orderId) {
          dispatch(InsertComplaintActions.request(validData, onSubmitSuccess));
        } else {
          dispatch(InsertComplaintActions.request(validData, onSubmitSuccess));
        }
      } else {
        dispatch(UpdateComplaintActions.request(validData));
      }
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

  const uploadOnSuccess = async (file: any[]) => {
    formRef.current?.setFieldValue("complaintImages", null);
    setImages([...images, ...file]);
    setImageLoad(false);
  };

  const UploadComplaintImage = async (data: FileList | null) => {
    if (!data) return;
    const file = data[0];
    if (!file) return;
    try {
      setImageLoad(true);
      const fileSizeLimit = 5242880; // 5MB

      const fullSize = file.size;

      if (fullSize > fileSizeLimit) {
        formRef.current?.setFieldValue("image", null);
        throw new Error("Limite máximo de tamanho de arquivo (5MB) excedido");
      }
      const dataSend = Object.values(data).map((file: File) => {
        const match = file.name.match(/^(.+)\.([a-zA-Z]+)$/i)!;
        const fileName = match[1];
        const type = match[2];

        const checkType = new RegExp(/^(jpg|jpeg|png|pdf|xls|csv|xlsm|doc|docx|dotx|rtf|text)$/i);

        if (!checkType) {
          formRef.current?.setFieldValue("image", null);
          throw new Error("Formato do arquivo inválido.");
        }
        return {
          name: fileName,
          type: type,
          data: file,
        };
      });
      dispatch(ComplaintUploadFileActions.request(dataSend, uploadOnSuccess));
    } catch (error: any) {

      notify('error', error?.message)
      setImageLoad(false);
    }
  };

  const removeImage = (image: any) => {
    if (!image) return;
    const imageRemoved = images?.filter((i) => i.fileKey !== image.fileKey);
    setImages(imageRemoved);
  };

  const onSelectOrders = (order: any, isChecked?: boolean) => {
    if (isChecked) {
      setOrders([...orders, order]);
    } else {
      const removed = orders?.filter((item) => item.id !== order.id);
      setOrders(removed);
    }
  };

  const loadingImages = async () => {
    if (complaintShow) {
      const { complaintImages } = complaintShow;

      setImages([...images, ...complaintImages]);
    }
  };

  useEffect(() => {
    fetchs();
  }, []);

  useEffect(() => {
    if (id) {
      fetchShowComplaint();
    }
  }, [id]);

  useEffect(() => {
    loadingImages();
  }, [complaintShow]);

  useEffect(() => {
    return () => {
      dispatch(ComplaintShowActions.reset());
    };
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.BackButton onClick={() => navigation(-1)}>
          <S.Arrow />
          <S.MensagemClear>Voltar</S.MensagemClear>
        </S.BackButton>
      </S.Header>
      <S.Wrapper>
        <S.Title>
          <h1>{id ? "Editar Complaint" : "Novo Complaint"}</h1>
          {id && (
            <ComplaintDownloadButton label="Baixar PDF" complaintId={id} />
          )}
        </S.Title>
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.InputWrapper minmax={3}>
            <Select
              name="complaintImpactedAreaId"
              options={impactedAreaOptions}
              label={"Área impactada"}
              placeholder={"Área impactada"}
              isLoading={impactedAreaLoading}
            />
            <Select
              name="complaintResponsibleId"
              options={responsiblesOptions}
              label={t("management.tracking.importacao.responsavel")}
              placeholder={t("management.tracking.importacao.responsavel")}
              isLoading={responsiblesLoading}
            />
            <Select
              name="complaintTypes"
              options={complaintTypesOptions}
              label={t("management.tracking.importacao.complaintTypes")}
              placeholder={t("management.tracking.importacao.complaintTypes")}
              onChange={(value) => handleDescriptionByType(value)}
              isLoading={complaintTypesLoading}
            />
          </S.InputWrapper>
          <TextArea
            name="descriptionByType"
            label={"Descrição"}
            placeholder={"Descrição"}
            readOnly
          />
          <TextArea
            name="customDescriptionByType"
            label={"Descrição adicional"}
            placeholder={"Descrição adicional"}
          />
          <>
            <p className="text-sm font-GilroySemibold mb-3">
              Evidência de não conformidade
            </p>
            {imageLoad ? (
              <> <ActivityIndicator /> <span>Carregando imagens...</span> </>
            ) : (
              <Dropzone
                dropMessage="Arraste e solte seus arquivos aqui"
                handleOnDrop={UploadComplaintImage}
              />
            )}
          </>

          <S.ImagePreview>
            {images.map((image, index) => {
              return (
                <ComplaintImage
                  key={index}
                  image={image}
                  removeImage={removeImage}
                />
              );
            })}
          </S.ImagePreview>
        </Form>
        {orderId ||
        (complaintShow?.stockOrderProduct &&
          !complaintShow?.complaintMovementsSnapshot.length) ? (
          <></>
        ) : (
          <ComplaintOrdersGrid
            onSelectOrders={onSelectOrders}
            orders={orders}
          />
        )}
      </S.Wrapper>
      {orderId ||
      (complaintShow?.stockOrderProduct &&
        !complaintShow?.complaintMovementsSnapshot.length) ? (
        <></>
      ) : (
        <ComplaintAccordion
          items={orders}
          title={`${orders.length} selecionado(s)`}
          onRemove={onSelectOrders}
        />
      )}

      <S.ButtonContainer>
        <Button
          type="button"
          disabled={insertComplaintLoading || uploadComplaintLoading || imageLoad}
          onClick={() => {
            formRef.current?.submitForm();
          }}
        >
          {(insertComplaintLoading || uploadComplaintLoading) && <Loading />}
          Salvar
        </Button>
        {id && (
          <Button type="button" onClick={() => setIsOpen(true)}>
            Encerrar complaint
          </Button>
        )}
      </S.ButtonContainer>

      {id && (
        <FinalizeModal
          isOpen={isOpen}
          onModalClose={() => setIsOpen(false)}
          complaintOrders={orders}
          complaint={complaintShow}
        />
      )}
    </S.Container>
  );
};

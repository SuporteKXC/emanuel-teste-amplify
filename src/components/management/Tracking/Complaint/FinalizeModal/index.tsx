import { Input, Modal, ModalProps, TextArea } from "@/components/shared";

import * as S from "./style";
import { useTranslation } from "react-i18next";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { Button } from "@/styles/components";
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import { date } from "@/utils";
import { useDispatch, useSelector } from "react-redux";
import { EndProcessActions } from "@/store/ducks/management";
import { useParams } from "react-router-dom";
import { Loading } from "@/components/shared/Forms/Input/styles";
import { RootState } from "@/store";

type FormData = {
  ncClosingDate: string;
  description: string;
};

type FinalizeModalProps = ModalProps & {
  onModalClose: () => void;
  complaintOrders: any[];
  complaint?: any;
};

const validationSchema = Yup.object().shape({
  regularizedAt: Yup.string().required("Campo obrigatório."),
  description: Yup.string(),
});

const FinalizeModal = ({
  onModalClose,
  complaintOrders,
  complaint,
  ...rest
}: FinalizeModalProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.endProcess);

  const onSubmit = async (data: FormData) => {
    try {
      const validData = {
        ...data,
        complaintId: id,
      };

      await validationSchema.validate(validData, { abortEarly: false });
      formRef.current?.setErrors({});

      dispatch(EndProcessActions.request(validData));
      onModalClose();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const validationErrors: Partial<FormData> = {};
        err.inner.forEach((error) => {
          validationErrors[error.path as keyof FormData] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      }
    }
  };

  return (
    <Modal {...rest}>
      <S.Container>
        <S.Title>
          <S.TitleWrapper>
            {/* <Alert /> */}
            {t("management.tracking.importacao.complaintModalTitle")}
          </S.TitleWrapper>
          <S.ModalCloseButton onClick={onModalClose}>
            <S.CloseIcon />
          </S.ModalCloseButton>
        </S.Title>
        <S.OrderList>
          <S.OrderHeader>
            <p>po</p>
            <p>nota fiscal</p>
            <p>data de recebimento</p>
          </S.OrderHeader>
          <S.ItemContainer>
            {complaintOrders.map((item) => {
              return (
                <S.Item>
                  <p>{item?.orderReference}</p>
                  <p>{item?.invoiceNumber}</p>
                  <p>
                    {item?.plant_delivery ? date(item?.plant_delivery) : "---"}
                  </p>
                </S.Item>
              );
            })}
          </S.ItemContainer>
        </S.OrderList>
        <Form
          ref={formRef}
          onSubmit={onSubmit}
          initialData={{
            regularizedAt: complaint?.ncClosingDate
              ? date(complaint?.ncClosingDate, {
                  format: "yyyy-MM-dd",
                })
              : "",
            description: complaint?.description ?? "",
          }}
          placeholder=""
        >
          <Input
            type="date"
            name="regularizedAt"
            label={"Data de encerramento da NC"}
          />
          <TextArea
            name="description"
            label={"Descrição da ocorrência"}
            placeholder={"Descrição da ocorrência"}
          />
          <Button disabled={loading}>
            {loading && <Loading />}
            Encerrar Complaint
          </Button>
        </Form>
      </S.Container>
    </Modal>
  );
};

export default FinalizeModal;

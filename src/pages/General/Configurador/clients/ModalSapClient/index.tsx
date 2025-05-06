import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Modal, ModalCloseButton } from "@/components";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { STATES } from "constants/Selects";

import * as S from "./styles";
import { useTranslation } from "react-i18next";

import { useValidation } from "@/hooks";
import { AddCodeSapValidator } from "@/validators/Clients/AddCodeSap";
import { TCodeSap } from "@/contracts";

type ModalSapClientProps = {
  data: TCodeSap | null;
  onChangeCodeSap: (value: TCodeSap) => void;
};

export type ModalSapClientHandles = {
  open: () => void;
  close: () => void;
};

const ModalSapClient: ForwardRefRenderFunction<
  ModalSapClientHandles,
  ModalSapClientProps
> = ({ data, onChangeCodeSap }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { handleFormErrors } = useValidation();
  const { t } = useTranslation();
  const formRef = useRef<FormHandles>(null);

  const onSubmit = async (formData: TCodeSap) => {
    try {
      const { schema } = new AddCodeSapValidator();
      formRef.current?.setErrors({});

      const changeData = { ...formData, codeSap: data?.codeSap! };
      await schema.validate(changeData, { abortEarly: false });
      onChangeCodeSap(changeData);
    } catch (error) {
      handleFormErrors(error, formRef);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    []
  );
  useEffect(() => {
    const seletecedState =
      STATES.filter((state) => state.value === data?.addressState) ?? [];

    formRef.current?.setData({
      ...data,
      addressState: seletecedState,
    });
  }, [data]);

  if (!data) <></>;

  return (
    <Modal isOpen={isOpen} onClickOutside={() => setIsOpen(false)}>
      <S.ModalContainer>
        <ModalCloseButton onClick={() => setIsOpen(false)} />
        <Form ref={formRef} onSubmit={onSubmit} placeholder="">
          <S.Title>
            <S.SubTitle>Código SAP: {`#${data?.codeSap ?? "---"}`}</S.SubTitle>
          </S.Title>
          <S.FormRow>
            <S.Input
              name="addressZipcode"
              label={t("general.config.clients.cep")}
            />
            <S.Input
              name="addressStreet"
              label={t("general.config.clients.logradouro")}
            />
            <S.Input
              name="addressNumber"
              label={t("general.config.clients.numero")}
            />
            <S.Input
              name="addressNeighborhood"
              label={t("general.config.clients.bairro")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Select
              name="addressState"
              label={t("general.config.clients.uf")}
              options={STATES}
            />
            <S.Input
              name="addressCity"
              label={t("general.config.clients.cidade")}
            />
          </S.FormRow>
          <S.FormRow>
            <S.Button mood="reset" onClick={() => setIsOpen(false)}>
              {t("general.config.clients.fechar")}
            </S.Button>
            <S.Button onClick={() => formRef.current?.submitForm()}>
              {t("general.config.clients.adicionar")}
            </S.Button>
          </S.FormRow>
        </Form>
      </S.ModalContainer>
    </Modal>
  );
};

export default forwardRef(ModalSapClient);

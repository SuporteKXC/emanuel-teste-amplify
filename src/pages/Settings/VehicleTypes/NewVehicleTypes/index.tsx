import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useValidation, useTranslation } from "hooks";
import { translations } from "./translations";

import {
  CreateVehicleTypeActions,
  CreateVehicleTypeState,
} from "store/ducks/settings/vehicle-types";

import * as S from "./styles";
import { MainContainer } from "components/shared";
import { Input } from "components/shared/Form";

export const NewVehicleType: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);


  const { loading } = useSelector<RootStateOrAny, CreateVehicleTypeState>(
    (state) => state.createVehicleType
  );

  const onSuccess = useCallback(() => {
    history.push("/settings/vehicle-types");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required(getTranslation('obrigatorio')),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateVehicleTypeActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, onSuccess]
  );

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('novoTipoveiculo')}</span>
        </h1>
        <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
          <S.IconArrowLeft />
          {getTranslation('voltar')}
        </S.ButtonMini>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name="name" label={getTranslation('nome')} />
            </S.FormRow>
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button
                btStyle="cancel"
                type="button"
                onClick={() => history.goBack()}
              >
                {getTranslation('cancelar')}
              </S.Button>
              <S.Button type="submit">
                {loading ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};

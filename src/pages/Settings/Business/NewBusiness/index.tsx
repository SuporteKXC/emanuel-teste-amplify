import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import {
  CreateBusinessState,
  CreateBusinessActions,
} from "store/ducks/settings/business";
import {
  ListBusinessUnitsActions,
  ListBusinessUnitsState,
} from "store/ducks/settings/business-unit";
import { useValidation,useTranslation } from "hooks";
import { translations } from './translations';
import * as S from "./styles";
import { MainContainer } from "components/shared";
import { Input, Select } from "components/shared/Form";

export const NewBusiness: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createCompany
  ) as CreateBusinessState;

  const { data: dataBusinessUnits, loading: loadingBusinessUnits } =
    useSelector<RootStateOrAny>(
      (state) => state.listBusinessUnits
    ) as ListBusinessUnitsState;

  const onSuccess = useCallback(() => {
    history.push("/settings/business");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          general_business_line_unit_id: Yup.number().required("Obrigatório"),
          activity_division: Yup.string().required("Obrigatório"),
          description: Yup.string().required("Obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateBusinessActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  const fetchBusinessUnits = useCallback(() => {
    dispatch(ListBusinessUnitsActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => {
    fetchBusinessUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')}<span>{getTranslation('novaLinha')}</span>
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle="dark" onClick={() => history.goBack()}>
            <S.IconArrowLeft />
              {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Select
                name="general_business_line_unit_id"
                label={getTranslation('unidade')}
                disabled={loadingBusinessUnits}
                isLoading={loadingBusinessUnits}
                options={dataBusinessUnits}
                placeholder={getTranslation('selecione')}

              />
            </S.FormRow>
            <S.FormRow>
              <Input
                name="activity_division"
                label={getTranslation('setor')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input name="description" label={getTranslation('descricao')}/>
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
                {loading ? (
              <S.Loading />
                ) : (
                  getTranslation('cadastrar')
                )}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};

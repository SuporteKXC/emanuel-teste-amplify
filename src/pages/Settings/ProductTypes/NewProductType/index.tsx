import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useTranslation } from 'hooks';
import { translations } from './translations';
import * as Yup from 'yup';

import {
  CreateProductTypeState,
  CreateProductTypeActions,
} from 'store/ducks/settings/product-type';

import { useValidation } from 'hooks';

import * as S from './styles';
import { MainContainer } from 'components/shared';
import { Input } from 'components/shared/Form';

export const NewProductType: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createProductType
  ) as CreateProductTypeState;

  const onSuccess = useCallback(() => {
    history.push('/settings/product-types');
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          description: Yup.string().required('Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateProductTypeActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
            {getTranslation('confirguracoes')} <span>{getTranslation('novoTipo')}</span>
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
              <Input name="description" label={getTranslation('descricao')} />
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

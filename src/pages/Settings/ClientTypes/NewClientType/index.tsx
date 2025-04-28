import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useTranslation,useValidation } from 'hooks';
import { translations } from './translations';
import * as Yup from 'yup';

import {
  CreateClientTypeState,
  CreateClientTypeActions,
} from 'store/ducks/settings/client-types';

import * as S from './styles';
import { MainContainer } from 'components/shared';
import { Input } from 'components/shared/Form';

export const NewClientType: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const dispatch = useDispatch();
  const history = useHistory();

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createClientType
  ) as CreateClientTypeState;

  const onSuccess = useCallback(() => {
    history.push('/settings/client-types');
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

        dispatch(CreateClientTypeActions.request(data, onSuccess));
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
            {getTranslation('configuracoes')}<span>{getTranslation('novoCustumer')}</span>
        </h1>
        <S.HeaderButtons>
          <S.ButtonMini btStyle='dark' onClick={() => history.goBack()}>
            <S.IconArrowLeft />
              {getTranslation('voltar')}
          </S.ButtonMini>
        </S.HeaderButtons>
      </S.PageHeader>
      <S.PageContent>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <S.BoxContainer>
            <S.FormRow>
              <Input name='name' label={getTranslation('segmentacao')} />
            </S.FormRow>
          </S.BoxContainer>
          <S.FormFooter>
            <S.FormRow>
              <S.Button
                btStyle='cancel'
                type='button'
                onClick={() => history.goBack()}
              >
                {getTranslation('cancelar')}
              </S.Button>
              <S.Button type='submit'>
                {loading ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
    </MainContainer>
  );
};

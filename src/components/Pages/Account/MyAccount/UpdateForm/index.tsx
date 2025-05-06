import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import type { RootState, AppDispatch } from 'store';
import { UpdateAccountActions as Actions } from 'store/ducks/auth';
import { useAuth, useValidation } from 'hooks';
import { Formatter } from 'utils';
import { Input } from 'components/Shared';
import * as S from './styles';

export const AccountUpdateForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { profile } = useAuth();

  const { loading, validationErrors } = useSelector(
    (state: RootState) => state.updateAccount
  );

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
  }, []);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Informe sua nova senha'),
          confirmPassword: Yup.string()
            .typeError('Repita a senha')
            .test({
              name: 'password-match',
              test: function (value) {
                try {
                  if (value !== this.parent.password) {
                    throw new Error('As senhas não são iguais');
                  }
                  return true;
                } catch (error: any) {
                  return this.createError({
                    message: error?.message,
                  });
                }
              },
            }),
        });

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(Actions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, onSuccess]
  );

  const CompanyInfo = useCallback((): JSX.Element => {
    if (!profile) return <></>;

    const { company } = profile;

    if (company) {
      return (
        <S.UserInfo>
          <S.InfoTitle>{company.tradeName}</S.InfoTitle>
          <S.InfoSubtitle>
            {Formatter.document(company.document, company.documentType)}
          </S.InfoSubtitle>
        </S.UserInfo>
      );
    }

    // if (warehouses?.length) {
    //   return (
    //     <>
    //       {warehouses.map(({ tradeName, document, documentType }) => (
    //         <S.UserInfo>
    //           <S.InfoTitle>{tradeName}</S.InfoTitle>
    //           <S.InfoSubtitle>
    //             {Formatter.document(document, documentType)}
    //           </S.InfoSubtitle>
    //         </S.UserInfo>
    //       ))}
    //     </>
    //   );
    // }

    return <></>;
  }, [profile]);

  useEffect(() => {
    return () => {
      dispatch(Actions.reset());
    };
  }, [dispatch]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  return (
    <S.Container>
      <S.UserInfo>
        <S.InfoTitle>{profile?.name}</S.InfoTitle>
        <S.InfoSubtitle>{profile?.email}</S.InfoSubtitle>
      </S.UserInfo>
      <CompanyInfo />
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input name="password" type="password" label="Nova senha" />
        <Input
          name="confirmPassword"
          type="password"
          label="Confirme a senha"
        />
        <S.FormActions>
          <S.Button type="submit">
            {loading ? <S.ActivityIndicator /> : 'Alterar senha'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};

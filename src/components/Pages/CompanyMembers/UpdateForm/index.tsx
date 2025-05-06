import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { HiddenInput, Input, Select, ToggleInput } from 'components/Shared';
import { FORM_BACK_ACTION } from 'constants/Common';
import { useCompanies, useValidation } from 'hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from 'store';
import { ListCompaniesActions } from 'store/ducks/companies';
import {
  FetchCompanyMemberActions as FetchActions,
  UpdateCompanyMemberActions as UpdateActions,
} from 'store/ducks/companyMembers';
import { UpdateMemberValidator } from 'validators/CompanyMembers';
import * as S from './styles';

interface Props {
  memberId: string | number;
  onUpdate?: () => void;
}

export const MemberUpdateForm: React.FC<Props> = ({ memberId, onUpdate }) => {
  const dispatch: AppDispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const { companyOptions, loadingCompanies, fetchCompanies } = useCompanies();

  const { data: member } = useSelector(
    (state: RootState) => state.fetchCompanyMember
  );

  const { loading: updatingMember, validationErrors } = useSelector(
    (state: RootState) => state.updateCompanyMember
  );

  const fetchmember = useCallback((): void => {
    dispatch(FetchActions.request(memberId));
  }, [dispatch, memberId]);

  const onMemberLoad = useCallback((): void => {
    if (!member) return;

    const { company, user, userId } = member;

    const companyOption = companyOptions.find((o) => o.value === company.id);

    if (companyOption) {
      formRef.current?.setFieldValue('companyId', companyOption);
    }

    formRef.current?.setFieldValue('userId', userId);
    formRef.current?.setFieldValue('user.name', user.name);
    formRef.current?.setFieldValue('user.email', user.email);
    formRef.current?.setFieldValue('user.root', user.root);
  }, [member, companyOptions]);

  const onSuccess = useCallback((): void => {
    formRef?.current?.reset();
    onUpdate && onUpdate();
  }, [onUpdate]);

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef?.current?.setErrors({});

        const { schema } = new UpdateMemberValidator();

        const validData = await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateActions.request(memberId, validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, memberId, onSuccess]
  );

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    fetchmember();
  }, [fetchmember]);

  useEffect(() => {
    onMemberLoad();
  }, [onMemberLoad]);

  useEffect(() => {
    handleApiErrors(validationErrors, formRef);
  }, [handleApiErrors, validationErrors]);

  useEffect(() => {
    return () => {
      dispatch(FetchActions.reset());
      dispatch(UpdateActions.reset());
      dispatch(ListCompaniesActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit}>
        <HiddenInput name="userId" />
        <Select
          name="companyId"
          label="Cliente"
          options={companyOptions}
          isLoading={loadingCompanies}
        />
        <Scope path="user">
          <S.FormRow>
            <Input name="name" label="Nome completo" />
            <Input name="email" label="Email" />
            <Input name="password" label="Senha" type="password" />
            <ToggleInput name="root" label="CNPJ Raíz"/>
          </S.FormRow>
        </Scope>
        <S.FormActions>
          <S.LinkButton mood="light" to="/configuracoes/clientes/usuarios">
            {FORM_BACK_ACTION}
          </S.LinkButton>
          <S.Button type="submit">
            {updatingMember ? <S.ActivityIndicator /> : 'Salvar'}
          </S.Button>
        </S.FormActions>
      </Form>
    </S.Container>
  );
};

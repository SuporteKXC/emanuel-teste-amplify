import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Form } from '@unform/web';

import { GridUserAlerts } from 'components/settings/Alerts';


import {
  ListUserAlertsActions,
  ListUserAlertsState,
  CreateUserAlertActions,
} from 'store/ducks/settings/user-alerts';
import {
  ListUsersActions,
  ListUsersState,
} from 'store/ducks/settings/users';
import { useValidation,useTranslation } from 'hooks';
import { translations } from './translations';
import { Select } from 'components/shared/Form';
import * as S from './styles';

interface IParams {
  id: string;
}

const UserAlerts: React.FC = () => {
  const { id } = useParams<IParams>();
  const subFormRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { data: options, loading: optionLoading } = useSelector<RootStateOrAny>(
    (state) => state.listUsers
  ) as ListUsersState;

  const { data: list, loading: loadingList } = useSelector<RootStateOrAny>(
    (state) => state.listUserAlerts
  ) as ListUserAlertsState;

  const handleSubmit = useCallback<SubmitHandler>(
    async (values) => {
      setLoadingUpdate(true);

      try {
        subFormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          user_id: Yup.number().required(getTranslation('obrigatorio')),
        });
        await schema.validate(values, {
          abortEarly: false,
        });

        const data = {
          general_alert_id: id,
          general_user_id: values.user_id,
        };

        dispatch(
          CreateUserAlertActions.request(
            data,
            fetchUserAlertsList
          )
        );
      } catch (error) {
        setLoadingUpdate(false);
        handleFormErrors(error, subFormRef);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch]
  );

  const fetchUserAlertsOptions = useCallback(() => {
    dispatch(ListUsersActions.request({ all: true }));
  }, [dispatch]);

  const fetchUserAlertsList = useCallback(() => {
    setLoadingUpdate(false);
    dispatch(ListUserAlertsActions.request({alert_id: id}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    fetchUserAlertsOptions();
    fetchUserAlertsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.PageContent>
      <Form ref={subFormRef} onSubmit={handleSubmit}>
        <S.BoxContainer>
          <S.FormRow>
            <Select
              name='user_id'
              label={getTranslation('usuarios')}
              isDisabled={optionLoading}
              isLoading={optionLoading}
              placeholder={getTranslation('selecione')}
              options={options}
            />
          </S.FormRow>
        </S.BoxContainer>
        <S.FormFooter>
          <S.FormRow>
            <S.Button type='submit'>
              {loadingUpdate ? (
              <S.Loading />
                ) : (
                  getTranslation('adicionar')
                )}
            </S.Button>
          </S.FormRow>
        </S.FormFooter>
      </Form>
      <GridUserAlerts
        userAlerts={list}
        loading={loadingUpdate || loadingList}
        onDelete={fetchUserAlertsList}
      />
    </S.PageContent>
  );
};

export default UserAlerts;

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation,useTranslation } from "hooks";

import { translations } from './translations';

import * as S from "./styles";

import { Modal } from "components/shared";
import { Select, Input } from "components/shared/Form";
import { ListRolesState, ListRolesActions } from "store/ducks/roles";

interface IFilterProps {
  onFilter: Function;
}

export const FilterUsers: React.FC<IFilterProps> = ({ onFilter }) => {
  const dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const { getTranslation } = useTranslation(translations);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [cleanShow, setCleanShow] = useState<boolean>(false);

  const { loading: loadingRoles, data: dataRoles } = useSelector<
    RootStateOrAny,
    ListRolesState
  >((state) => state.listRoles);

  const getListRoles = useCallback(() => {
    dispatch(
      ListRolesActions.request({
        all: true,
        general_module_id: process.env.REACT_APP_MODULE_TRACKING,
      })
    );
  }, [dispatch]);

  useEffect(() => getListRoles(), [getListRoles]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        onFilter(data);

        setCleanShow(true);
        setModalOpen(false);
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [handleFormErrors, onFilter]
  );

  const handleFilterClean = useCallback(() => {
    if (formRef.current) {
      formRef.current.setFieldValue("name", "");
      formRef.current.setFieldValue("email", "");
      formRef.current.setFieldValue("general_role_id", "");
      const clean = {
        name: "",
        email: "",
        general_role_id: "",
      };
      onFilter(clean);
    }

    setCleanShow(false);
    setModalOpen(false);
  }, [onFilter]);

  const renderButtonCleanFilter = () => {
    if (cleanShow) {
      return (
        <S.ButtonMini btStyle="dark" onClick={handleFilterClean}>
          {getTranslation('limparFiltro')}
        </S.ButtonMini>
      );
    }
  };

  return (
    <S.Container>
      <Modal isOpen={modalOpen}>
        <S.ModalContainer>
          <S.Header>
            <S.IconFilter />
            <S.Title>{getTranslation('filtrar')}</S.Title>
          </S.Header>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <S.FormRow>
              <Input name="name" label={getTranslation('nome')} />
              <Input name="email" label={getTranslation('email')}/>
              <Select
                name="general_role_id"
                label={getTranslation('tipo')}
                isLoading={loadingRoles}
                isDisabled={loadingRoles}
                options={dataRoles}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>

            <S.ButtonsWrapper>
              <S.Button
                btStyle="cancel"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                {getTranslation('cancelar')}
              </S.Button>
              <S.Button
                btStyle="danger"
                type="button"
                onClick={handleFilterClean}
              >
                {getTranslation('limparFiltro')}
              </S.Button>
              <S.Button type="submit">{getTranslation('filtrar')}</S.Button>
            </S.ButtonsWrapper>
          </Form>
        </S.ModalContainer>
      </Modal>

      {renderButtonCleanFilter()}
      <S.ButtonFilter onClick={() => setModalOpen(true)}>
        <S.IconFilter />
      </S.ButtonFilter>
    </S.Container>
  );
};

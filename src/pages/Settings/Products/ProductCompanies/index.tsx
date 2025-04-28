import React, { useRef, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";


import { useTranslation, useValidation } from "hooks";
import { translations } from "./translations";
import { SubmitHandler, FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Form } from "@unform/web";

import { GridProductCompanies } from "components/settings/Products";

import {
  ListCompaniesActions,
  ListCompaniesState,
} from "store/ducks/settings/companies";
import {
  ListBusinessState,
  ListBusinessActions,
} from "store/ducks/settings/business";
import {
  ListProductCompaniesActions,
  ListProductCompaniesState,
  CreateProductCompanyActions,
} from "store/ducks/settings/product-companies";
import { Select } from "components/shared/Form";
import * as S from "./styles";

interface IParams {
  id: string;
}

const ProductCompanies: React.FC = () => {
  const { id } = useParams<IParams>();
  const subFormRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const { data: companies, loading: companyLoading } =
    useSelector<RootStateOrAny>(
      (state) => state.listCompanies
    ) as ListCompaniesState;

  const { data: business, loading: businessLoading } =
    useSelector<RootStateOrAny>(
      (state) => state.listBusiness
    ) as ListBusinessState;

  const { data: list, loading: loadingList } = useSelector<RootStateOrAny>(
    (state) => state.listProductCompanies
  ) as ListProductCompaniesState;

  const fetchProductCompanyList = useCallback(() => {
    setLoadingUpdate(false);
    dispatch(ListProductCompaniesActions.request(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (values) => {
      setLoadingUpdate(true);

      try {
        subFormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          company_id: Yup.number().required(getTranslation('obrigatorio')),
          business_line_id: Yup.number().required(getTranslation('obrigatorio')),
        });
        await schema.validate(values, {
          abortEarly: false,
        });

        const data = {
          company_id: values.company_id,
          product_id: id,
          business_line_id: values.business_line_id,
        };

        dispatch(
          CreateProductCompanyActions.request(data, fetchProductCompanyList)
        );
      } catch (error) {
        setLoadingUpdate(false);
        handleFormErrors(error, subFormRef);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [dispatch, fetchProductCompanyList, getTranslation, handleFormErrors, id]
  );

  const fetchCompanies = useCallback(() => {
    dispatch(ListCompaniesActions.request({ all: true }));
  }, [dispatch]);



  const fetchBusiness = useCallback(() => {
    dispatch(ListBusinessActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => {
    fetchBusiness();
    fetchCompanies();
    fetchProductCompanyList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.PageContent>
      <S.Title>{getTranslation('excessao')}</S.Title>
      <Form ref={subFormRef} onSubmit={handleSubmit}>
        <S.BoxContainer>
          <S.FormRow>
            <Select
              name="company_id"
              label={getTranslation('centro')}
              isDisabled={companyLoading}
              isLoading={companyLoading}
              placeholder={getTranslation('selecione')}
              options={companies}
            />
            <Select
              name="business_line_id"
              label={getTranslation('businessLine')}
              isDisabled={businessLoading}
              isLoading={businessLoading}
              placeholder={getTranslation('selecione')}
              options={business}
            />
          </S.FormRow>
        </S.BoxContainer>
        <S.FormFooter>
          <S.FormRow>
            <S.Button type="submit">
              {loadingUpdate ? <S.Loading /> : getTranslation('adicionar')}
            </S.Button>
          </S.FormRow>
        </S.FormFooter>
      </Form>
      <GridProductCompanies
        productCompanies={list}
        loading={loadingUpdate || loadingList}
        onDelete={fetchProductCompanyList}
      />
    </S.PageContent>
  );
};

export default ProductCompanies;

import React, { useCallback, useRef, useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";

import {
  ListProductTypeActions,
  ListProductTypeState,
} from "store/ducks/settings/product-type";

import {
  ListProductExceptionActions,
  ListProductExceptionState,
  CreateProductExceptionActions,
  CreateProductExceptionState,
} from "store/ducks/settings/product-exceptions";

import { useTranslation, useValidation } from "hooks";
import { translations } from "./translations";

import * as S from "./styles";
import { GridProductExceptions } from "components/settings/ProductTypes";
import { Select } from "components/shared/Form";

interface IParams {
  id: string;
}

export const ProductExceptions: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const { data: productTypes, loading: productTypeLoading } = useSelector<RootStateOrAny>(
    (state) => state.listProductType
  ) as ListProductTypeState;

  const { data: exceptions, loading } = useSelector<RootStateOrAny>(
    (state) => state.listProductException
  ) as ListProductExceptionState;

  const { loading: loadingCreateProductException } = useSelector<RootStateOrAny>(
    (state) => state.createProductException
  ) as CreateProductExceptionState;

  const onSuccess = useCallback(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          exception_id: Yup.string().required(getTranslation('obrigatorio')),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        data.product_type_id = id;

        dispatch(CreateProductExceptionActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, id, onSuccess]
  );

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(ListProductExceptionActions.request(id));
    }
  }, [dispatch, id]);

  const fetchProductTypes = useCallback(() => {
    dispatch(ListProductTypeActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchProductTypes();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  return (
    <S.PageContent>
      <S.Title>{getTranslation('excess')}</S.Title>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <S.BoxContainer>
        <S.FormRow>
            <Select
              name="exception_id"
              label={getTranslation('excessao')}
              isDisabled={productTypeLoading}
              isLoading={productTypeLoading}
              options={productTypes}
              placeholder={getTranslation('selecione')}
            />
          </S.FormRow>
        </S.BoxContainer>
        <S.FormFooter>
          <S.FormRow>
            <S.Button type="submit">
              {loadingCreateProductException ? <S.Loading /> : getTranslation('adicionar')}
            </S.Button>
          </S.FormRow>
        </S.FormFooter>
      </Form>
      {loading ? (
        <S.Loading />
      ) : (
        <GridProductExceptions productExceptions={exceptions} onDelete={fetchData} />
      )}
    </S.PageContent>
  );
};

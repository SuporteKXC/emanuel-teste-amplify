import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { OptionTypeBase } from "react-select";
import * as Yup from "yup";
import { packingGroups } from "utils/data/packing-groups";
import { riskNumbers } from "utils/data/risk-numbers";
import { useTranslation, useValidation } from "hooks";
import { translations } from "./translations";

import {
  CreateProductState,
  CreateProductActions,
} from "store/ducks/settings/products";
import {
  ListBusinessState,
  ListBusinessActions,
} from "store/ducks/settings/business";
import {
  ListProductRisksActions,
  ListProductRisksState,
} from "store/ducks/settings/product-risks";
import {
  ListProductTypeState,
  ListProductTypeActions
} from "store/ducks/settings/product-type";
import {
  ListPalletTypeState,
  ListPalletTypeActions
} from "store/ducks/settings/pallet-type";
import { ProduckRiskOption } from "interfaces/product-risk";

import * as S from "./styles";
import { MainContainer } from "components/shared";
import { Input, Select } from "components/shared/Form";

export const NewProduct: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [typeBlock, setTypeBlock] = useState(false);
  const { getTranslation } = useTranslation(translations);

  const { loading } = useSelector<RootStateOrAny>(
    (state) => state.createProduct
  ) as CreateProductState;

  const { data: business, loading: businessLoading } =
    useSelector<RootStateOrAny>(
      (state) => state.listBusiness
    ) as ListBusinessState;

  const { data: productType, loading: productTypeLoading } =
  useSelector<RootStateOrAny>(
    (state) => state.listProductType
  ) as ListProductTypeState;

  const { data: palletType, loading: palletTypeLoading } =
  useSelector<RootStateOrAny>(
    (state) => state.listPalletType
  ) as ListPalletTypeState;

  const { data: risksTypes, loading: risksTypesLoading } =
  useSelector<RootStateOrAny, ListProductRisksState>(
    (state) => state.listProductRisks
  );

  const onSuccess = useCallback(() => {
    history.push("/settings/products");
  }, [history]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data) => {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        code: Yup.number().typeError(getTranslation('obrigatorio')).required(getTranslation('obrigatorio')),
        description: Yup.string().required(getTranslation('obrigatorio')),
        business_line_id: Yup.string().required(getTranslation('obrigatorio')),
        product_type_id: Yup.string().required(getTranslation('obrigatorio')),
        id_pallet_type: Yup.string().required(getTranslation('obrigatorio')),
        pallet_quantity: Yup.string().required(getTranslation('obrigatorio')),
        uno_sap: Yup
          .number()
          .positive("O número deve ser positivo")
          .integer("O número deve ser inteiro")
          .nullable(true)
          .transform((_, val) => val ? Number(val) : null),
        risk_number: Yup
          .string()
          .test('risk_number', 
          'O número do risco deve estar de acordo com a Classe de Risco',
          (value) => {
            if(value) {
              const classRisk = risksTypes.find(
                (op: ProduckRiskOption) => 
                  op.value === Number(data.general_product_risk_id)
              );

              if(classRisk) {
                const riskValues = riskNumbers.find(
                  risk => risk.classes === Math.trunc(classRisk.classes)
                );
                
                if(!riskValues) return false;
                return riskValues.values.some(risk => risk === value);
              }
              return false;
            }
            return true;
        }),
      });

      try {
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(CreateProductActions.request(data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, onSuccess, risksTypes]
  );

  const fetchBusiness = useCallback(() => {
    dispatch(ListBusinessActions.request({ all: true }));
  }, [dispatch]);

  const fetchProductType = useCallback(() => {
    dispatch(ListProductTypeActions.request({ all: true }));
  }, [dispatch]);

  const fetchPalletType = useCallback(() => {
    dispatch(ListPalletTypeActions.request({ all: true }));
  }, [dispatch]);

  const fetchProductRisks = useCallback(() => {
    dispatch(ListProductRisksActions.request({ all: true }));
  }, [dispatch]);

  useEffect(() => {
    fetchBusiness();
    fetchProductType();
    fetchPalletType();
    fetchProductRisks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCodeChange = useCallback(() => {
    const code = Number(formRef.current?.getFieldValue("code"));

    if(code >= 20000001 && code <= 39999999) {
      const type = productType.find(
        (product: OptionTypeBase) => product.value === 13
      );
      formRef.current?.setFieldValue("product_type_id", type);
      setTypeBlock(true);
    } else if(code >= 4240000001 && code <= 4949999999) {
      const type = productType.find(
        (product: OptionTypeBase) => product.value === 12
      );
      formRef.current?.setFieldValue("product_type_id", type);
      setTypeBlock(true);
    } else if(code >= 91011000 && code <= 91013999) {
      const type = productType.find(
        (product: OptionTypeBase) => product.value === 14
      );
      formRef.current?.setFieldValue("product_type_id", type);
      setTypeBlock(true);
    } else {
      setTypeBlock(false);
    }
    

  }, [productType]);

  return (
    <MainContainer>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('novoProduto')}</span>
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
              <Input 
                name="code" 
                label={getTranslation('codigo')}
                type="number" 
                onChange={handleCodeChange}
              />
            </S.FormRow>
            <S.FormRow>
              <Input name="description" label={getTranslation('descricao')} />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="business_line_id"
                label={getTranslation('businessLine')}
                isDisabled={businessLoading}
                isLoading={businessLoading}
                options={business}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="product_type_id"
                label={getTranslation('tipoProduto')}
                isDisabled={productTypeLoading || typeBlock}
                isLoading={productTypeLoading}
                options={productType}
                disabled={typeBlock}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="general_product_risk_id"
                label={getTranslation('classe')}
                isDisabled={risksTypesLoading}
                isLoading={risksTypesLoading}
                options={risksTypes}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input 
                name="risk_number"
                label={getTranslation('numero')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input 
                type="number" 
                name="subsidiary_risk"
                step="0.1"
                label={getTranslation('riscoSub')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input 
                type="number" 
                min="1"
                name="uno_sap"
                label={getTranslation('numeroOnuSAP')}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="packing_group"
                label={getTranslation('grupo')}
                options={packingGroups}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="id_pallet_type"
                label={getTranslation('tipoPalete')}
                isDisabled={palletTypeLoading}
                isLoading={palletTypeLoading}
                options={palletType}
                placeholder={getTranslation('selecione')}
              />
            </S.FormRow>
            <S.FormRow>
              <Input 
                type="number" 
                min="1" 
                name="pallet_quantity" 
                label={getTranslation('quantidadePalete')} 
              />
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

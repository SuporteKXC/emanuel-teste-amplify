import React, { useCallback, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { OptionTypeBase } from "react-select";
import * as Yup from "yup";
import { riskClass } from "utils";
import { packingGroups } from "utils/data/packing-groups";
import { riskNumbers } from "utils/data/risk-numbers";
import { useTranslation, useValidation } from "hooks";
import { translations } from "./translations";
import {
  FetchProductState,
  FetchProductActions,
  UpdateProductActions,
  UpdateProductState,
  DeleteProductActions,
  DeleteProductState,
} from "store/ducks/settings/products";
import {
  ListBusinessState,
  ListBusinessActions,
} from "store/ducks/settings/business";
import {
  ListProductTypeState,
  ListProductTypeActions
} from "store/ducks/settings/product-type";
import {
  ListProductRisksActions,
  ListProductRisksState,
} from "store/ducks/settings/product-risks";
import {
  ListPalletTypeState,
  ListPalletTypeActions
} from "store/ducks/settings/pallet-type";
import { MainContainer, Modal, Alert } from "components/shared";
import { Input, Select } from "components/shared/Form";
import { ProductRisk, ProduckRiskOption } from "interfaces/product-risk";

import ProductCompanies from "../ProductCompanies";

import * as S from "./styles";
interface IParams {
  id: string;
}

interface FormData {
  code: number;
  description: string;
  business_line_id?: number;
  product_type_id?: string;
  id_pallet_type?: string;
  general_product_risk_id?: string;
  risk_number?: string;
  subsidiary_risk?: number;
  uno_sap?: number;
  packing_group?: string;
  pallet_quantity?: number;
}

export const EditProduct: React.FC = () => {
  const { id } = useParams<IParams>();
  const formRef = useRef<FormHandles>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [typeBlock, setTypeBlock] = useState(false);
  const { handleFormErrors } = useValidation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { getTranslation } = useTranslation(translations);

  const { data: dataFetchProduct, loading } = useSelector<RootStateOrAny>(
    (state) => state.fetchProduct
  ) as FetchProductState;

  const { loading: loadingDeleteProduct } = useSelector<RootStateOrAny>(
    (state) => state.deleteProduct
  ) as DeleteProductState;

  const { loading: loadingUpdateProduct } = useSelector<RootStateOrAny>(
    (state) => state.updateProduct
  ) as UpdateProductState;

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

  const onFetchSuccess = useCallback((data) => {
    if (formRef.current) {
      if (data.business_line) {
        data.business_line_id = {
          label: `${data.business_line.activity_division} - ${data.business_line.description}`,
          value: data.business_line.id,
        };
      }
      if (data.product_type) {
          data.product_type_id = {
            label: data.product_type.description,
            value: data.product_type.id,
        };
      }
      if(data.pallet_type) {
        data.id_pallet_type = {
          label: data.pallet_type.description,
          value: data.pallet_type.id,
        };
      }
      if(data.risk) {
        const { classes, name, id } = data.risk as ProductRisk;
        data.general_product_risk_id = {
          label: `${riskClass(classes)} - ${name}`,
          value: id,
        };
      }
      if(data.packing_group) {
        const { packing_group } = data;
        data.packing_group = {
          label: packing_group,
          value: packing_group,
        };
      }
      formRef.current.setData(data);
    }
  }, []);

  const fetchBusiness = useCallback(() => {
    dispatch(ListBusinessActions.request({ all: true }));
  }, [dispatch]);

  const fetchProductType = useCallback(() => {
    dispatch(ListProductTypeActions.request({ all: true }));
  }, [dispatch]);

  const fetchProductRisks = useCallback(() => {
    dispatch(ListProductRisksActions.request({ all: true }));
  }, [dispatch]);

  const fetchPalletType = useCallback(() => {
    dispatch(ListPalletTypeActions.request({ all: true }));
  }, [dispatch]);

  const fetchData = useCallback(() => {
    if (id) {
      dispatch(FetchProductActions.request(id, onFetchSuccess));
    }
  }, [dispatch, id, onFetchSuccess]);

  const onDeleteSuccess = useCallback(() => {
    history.goBack();
  }, [history]);

  const deleteData = useCallback(() => {
    dispatch(DeleteProductActions.request(id, onDeleteSuccess));
  }, [dispatch, id, onDeleteSuccess]);

  useEffect(() => {
    fetchBusiness();
    fetchProductType();
    fetchPalletType();
    fetchData();
    fetchProductRisks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData]);

  const handleSubmit = useCallback<SubmitHandler>(
    async (data: FormData) => {

      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        code: Yup.number().typeError(getTranslation('obrigatorio')).required(getTranslation('obrigatorio')),
        description: Yup.string().required(getTranslation('obrigatorio')),
        business_line_id: Yup.string().required(getTranslation('obrigatorio')),
        product_type_id: Yup.string().required(getTranslation('obrigatorio')),
        id_pallet_type: Yup.string().required(getTranslation('obrigatorio')),
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
        pallet_quantity: Yup.string().required(getTranslation('obrigatorio'))
      });
      try {
        
        await schema.validate(data, {
          abortEarly: false,
        });

        dispatch(UpdateProductActions.request(id, data, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, getTranslation, handleFormErrors, id, onSuccess, risksTypes]
  );

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
      <Modal isOpen={modalOpen}>
        <Alert
          title={`Remover Produto ${dataFetchProduct?.code}`}
          text="Deseja realmente remover esse produto?"
          close={() => setModalOpen(false)}
          action={deleteData}
          labelAction="Remover"
          isLoading={loadingDeleteProduct}
        />
      </Modal>
      <S.PageHeader>
        <h1>
          <S.IconSetting />
          {getTranslation('configuracoes')} <span>{getTranslation('editarProduto')}</span>
          {loading && <S.LoadingPage />}
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
              <Input name="description" label={getTranslation('descricao')}/>
            </S.FormRow>
            <S.FormRow>
              <Select
                name="business_line_id"
                label={getTranslation('businessLine')}
                isDisabled={businessLoading}
                isLoading={businessLoading}
                placeholder={getTranslation('selecione')}
                options={business}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="product_type_id"
                label={getTranslation('tipoProduto')}
                isDisabled={productTypeLoading || typeBlock}
                isLoading={productTypeLoading}
                options={productType}
                placeholder={getTranslation('selecione')}
                disabled={typeBlock}
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="general_product_risk_id"
                label={getTranslation('classe')}
                isDisabled={risksTypesLoading}
                isLoading={risksTypesLoading}
                placeholder={getTranslation('selecione')}
                options={risksTypes}
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
                placeholder={getTranslation('selecione')}
                options={packingGroups}
                
              />
            </S.FormRow>
            <S.FormRow>
              <Select
                name="id_pallet_type"
                label={getTranslation('tipoPalete')}
                isDisabled={palletTypeLoading}
                isLoading={palletTypeLoading}
                placeholder={getTranslation('selecione')}
                options={palletType}
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
              <S.Button
                btStyle="danger"
                type="button"
                onClick={() => setModalOpen(true)}
              >
                {getTranslation('remover')}
              </S.Button>
              <S.Button type="submit">
                {loadingUpdateProduct ? <S.Loading /> : getTranslation('cadastrar')}
              </S.Button>
            </S.FormRow>
          </S.FormFooter>
        </Form>
      </S.PageContent>
      <ProductCompanies />
    </MainContainer>
  );
};

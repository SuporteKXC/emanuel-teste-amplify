import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles, Scope, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  UpdateRelatedProductActions,
  FetchProductActions,
  ResponsibleActions,
  CompanyActions,
} from "store/ducks";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import {
  Input,
  CheckboxInput,
  Select,
  CheckboxBySelect,
} from "components/shared/Forms";
import { api, notify } from "services";
import { niceDate } from "utils";
import { ResponsibleData } from "contracts";

interface Groups {
  id: string;
  label: string;
  value: string;
}

export const UpdateProduct: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors, handleApiErrors } = useValidation();
  const [checkDefault, setCheckDefault] = useState([{ id: "", value: "" }]);
  const [companyId, setCompanyId] = useState(null);

  const { data: productData, loading: productLoading } = useSelector(
    (state: RootState) => state.productFetch
  );

  const { data: responsibleData, loading: responsibleLoading } = useSelector(
    (state: RootState) => state.responsibles
  );

  const { data: companyData, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );

  const fetchProduct = useCallback(() => {
    dispatch(FetchProductActions.request(id));
  }, [dispatch]);

  const fetchResponsible = useCallback(() => {
    dispatch(ResponsibleActions.request());
  }, [dispatch]);

  const fetchCompany = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchProduct();
    fetchResponsible();
    fetchCompany();
  }, []);

  const productResponsible = productData?.product_responsible?.map((item) => ({
    id: `${item.responsible?.id}`,
    label: item.responsible?.name,
    value: `${item.responsible?.id}`,
    company: `${item.company_id}`,
  }));

  const companySelected = useCallback(
    (data: any) => {
      setCompanyId(data.value);
    },
    [dispatch]
  );

  useEffect(() => {
    const filterProductResponsible = productResponsible?.filter(
      (element: any) => {
        return element.company == companyId;
      }
    );
    if (filterProductResponsible && filterProductResponsible.length) {
      setCheckDefault(filterProductResponsible);
    } else {
      setCheckDefault([]);
    }
  }, [companyId]);


  const responsibleValid = responsibleData?.map((item: ResponsibleData) => ({
    id: `${item.id}`,
    value: `${item.id}`,
    label: item.name,
  })) ?? [];


  const companyValid = companyData?.map((item: any) => ({
    value: `${item.id}`,
    label: item.name_fantasy,
  })) ?? [];

  const onSubmit = useCallback<SubmitHandler>(
    async ({
      description,
      code,
      deadline_days,
      company,
      responsiblesArray,
      bu,
      business_unit,
      origem
    }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          description: Yup.string().required(t("comex.message.fieldMandatory")),
          code: Yup.string().required(t("comex.message.fieldMandatory")),
          company: Yup.string().required(t("comex.message.fieldMandatory")),
          deadline_days: Yup.number().required(
            t("comex.message.fieldMandatory")
          ),
          responsibles: Yup.array().of(
            Yup.object().shape({
              responsible_id: Yup.string(),
            })
          ),
          bu: Yup.string().optional(),
          business_unit: Yup.string().optional(),
          origem: Yup.string().optional()
        });

        await schema.validate(
          {
            description,
            code,
            company,
            deadline_days,
            responsibles: responsiblesArray.map((i: string) => ({
              company_id: i,
            })),
          },
          {
            abortEarly: false,
          }
        );

        const responsibles = responsiblesArray?.map((element: any) => {
          return { responsible_id: element };
        });

        const data = {
          data: {
            description: description ? description : null,
            code: code ? code : null,
            deadline_days: deadline_days ? deadline_days : null,
            bu: bu ? bu : null,
            business_unit: business_unit ? business_unit : null,
            origem: origem ? origem : null
          },
          company,
          responsibles,
        };
      
        dispatch(UpdateRelatedProductActions.request(productData?.id, data));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  useEffect(() => {
    return () => {
      dispatch(UpdateRelatedProductActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        {productLoading ? (
          <S.ActivityIndicator />
        ) : (
          <div className="w-full">
            <div className="w-full grid grid-cols-2 gap-2">
              <Input
                defaultValue={productData?.description}
                name="description"
                label={t("comex.settings.product.description")}
              />
              <Input
                defaultValue={productData?.code}
                name="code"
                label={t("comex.settings.product.code")}
              />
              <Input
                defaultValue={productData?.origem ?? ""}
                name="origem"
                label={t("comex.settings.product.origem")}
              />
              <Input
                defaultValue={productData?.business_unit ?? ""}
                name="business_unit"
                label={t("comex.settings.product.businessUnit")}
              />
              <Input
                defaultValue={productData?.bu ?? ""}
                name="bu"
                label={t("comex.settings.product.bu")}
              />

              <Select
                name="company"
                options={companyValid}
                label={t("comex.settings.product.company")}
                placeholder={t("comex.filterandButton.selectPlaceholder")}
                isLoading={companyLoading}
                onChange={companySelected}
              />
            </div>
            <Input
              defaultValue={productData?.deadline_days}
              name="deadline_days"
              label={t("comex.settings.product.deadlineDays")}
            />
            <S.CheckContainer>
              <CheckboxBySelect
                isLoading={responsibleLoading}
                options={responsibleValid}
                defaultOptions={checkDefault}
                name="responsiblesArray"
                label={t("comex.settings.product.responsibles")}
              />
            </S.CheckContainer>

            <S.FormActionsNew>
              <S.Button mood="primary" type="submit">
                {productLoading ? (
                  <S.ActivityIndicator />
                ) : (
                  t("comex.filterandButton.update")
                )}
              </S.Button>
              <S.Button onClick={() => navigate(-1)} type="reset">
                {t("comex.filterandButton.cancel")}
              </S.Button>
            </S.FormActionsNew>
          </div>
        )}
      </Form>
    </S.Container>
  );
};

export default UpdateProduct;

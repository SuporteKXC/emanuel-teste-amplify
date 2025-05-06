import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { Input, CheckboxInput } from "components/shared/Forms";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  CompanyActions,
  CountryActions,
  ResponsibleActions,
  SupplierListActions,
} from "store/ducks";
import { NewUserActions as MainActions, RolesActions } from "store/ducks";
import * as Yup from "yup";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoleData, CompanyData } from "contracts";
import { api, notify } from "services";
import { ResponsibleData } from "contracts";
import UserAvatar from "@/components/UserAvatar";
import useUserUploadImage from "@/queries/Users/useUserUploadImage";

interface Groups {
  id: string;
  label: string;
  value: string;
}

export const NewUserForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const {  t } = useTranslation();
  const { handleFormErrors } = useValidation();
  const [imageKey, setImageKey] = useState<string | null>(null);

  const { mutate: uploadUserImageMutate, isPending } = useUserUploadImage()

  const { data: companyData, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );

  const { data: rolesData, loading: rolesLoading } = useSelector(
    (state: RootState) => state.roles
  );

  const { countries, loading: countriesLoading } = useSelector((state: RootState) => state.country);

  const { data: responsibleData, loading: responsibleLoading } = useSelector(
    (state: RootState) => state.responsibles
  );

  const fetchCountries = useCallback(() => {
    dispatch(CountryActions.request());
  }, [dispatch]);

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request());
  }, [dispatch]);

  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  const fetchResponsible = useCallback(() => {
    dispatch(ResponsibleActions.request());
  }, [dispatch]);

  const fetchSupplier = useCallback(() => {
    dispatch(SupplierListActions.request({}));
  }, [dispatch]);

  const fetchUploadImageLink = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.currentTarget?.files![0]
        if (!file) return;

        const fileSizeLimit = 5242880; // 5MB

        if (file.size > fileSizeLimit) {
          formRef.current?.setFieldValue("image", null);
          throw new Error("Limite máximo de tamanho de imagem (5MB) excedido");
        }

        uploadUserImageMutate(file, {
          onSuccess: (key) => {
            setImageKey(key);
          },
          onError: (err) => {
            notify("error", err.message);
          }
        })
      } catch (err) {
        if (err instanceof Error) {
          notify("error", err.message);
        }
      }
    },
    []
  );

  useEffect(() => {
    fetchRoles();
    fetchCompanies();
    fetchResponsible();
    fetchSupplier();
    fetchCountries()
  }, [dispatch]);


  const countriesValid: Groups[] = countries?.map(country => 
    ( { id: country.id , value: country.id, label: country.description } )
  ) ?? []

  const rolesValid: Groups[] = [];

  rolesData?.forEach((item: RoleData) => {
    const groupAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name,
    };
    rolesValid.push(groupAdapt);
  });

  const companyValid: Groups[] = [];

  companyData?.forEach((item: CompanyData) => {
    const companyAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name_fantasy,
    };
    companyValid.push(companyAdapt);
  });

  const responsibleValid: Groups[] = [];

  responsibleData?.forEach((item: ResponsibleData) => {
    const groupAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.name,
    };
    responsibleValid.push(groupAdapt);
  });

  const { loading } = useSelector((state: RootState) => state.newuser);

  const onSubmit = useCallback(
    async ({
      name,
      email,
      fone,
      roles,
      company,
      responsibles,
      code_sap,
      countries
    }: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

      

        const schema = Yup.object().shape({
          email: Yup.string()
            .email(t("general.messages.emailInvalid"))
            .required(t("general.messages.emailMandatory")),

          name: Yup.string().required(t("general.messages.nameMandatory")),
          code_sap: Yup.string().optional(),
          fone: Yup.string(),
          image_key: Yup.string().nullable(),
          roles: Yup.array().of(
            Yup.object().shape({
              role_id: Yup.string().required(t("general.messages.fieldMandatory")),
            })
          ).min(1, t("general.messages.fieldMandatory")),
          countries: Yup.array().of(Yup.string().required(t("general.messages.fieldMandatory"))).min(1, t("general.messages.fieldMandatory")),
          company: Yup.array().of(
            Yup.object().shape({
              company_id: Yup.string(),
            })
          ),
          responsibles: Yup.array().of(
            Yup.object().shape({
              responsible_id: Yup.string(),
            })
          ),
        });

        const validData = await schema.validate(
          {
            name,
            email,
            code_sap,
            fone,
            image_key: imageKey,
            roles: roles.map((id: string) => ({ role_id: id })),
            countries,
            company: company.map((id: string) => ({ company_id: id })),
            responsibles: responsibles.map((id: string) => ({
              responsible_id: id,
            })),
          },
          {
            abortEarly: false,
          }
        );


        dispatch(MainActions.request(validData, onSuccess));
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors, imageKey]
  );

  const onSuccess = (id: string) => {
    navigate(`/config/users/update/${id}`);
  };

  useEffect(() => {
    if (import.meta.env.VITE_NODE_ENV === "development") {
      formRef.current?.setFieldValue("email", "teste@gmail.com");
      formRef.current?.setFieldValue("password", "123");
    }
  });

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        <div className="flex flex-col gap-6">
          
          <div className="bg-white p-4 rounded-md grid grid-cols-2">
              <div className="w-full flex justify-center items-center">
                <UserAvatar imageKey={imageKey ?? ""} alt='user' className="w-96 h-96">
                      <UserAvatar.Input  name="image"  accept="image/*" onChange={fetchUploadImageLink} label="Adicionar" isLoading={isPending} />
                </UserAvatar>
              </div>
              <div className="input-container">
                <Input name="name" label={t("general.config.users.name")} />
                <Input name="fone" label={t("general.config.users.telephone")} />
                <Input name="email" label={t("general.config.users.email")} />
                <Input name="code_sap" label={t("general.config.users.codeSap")} />
              </div>
          </div>
        
          <S.Ghost />
          <S.CheckContainer>
          <CheckboxInput
              isLoading={countriesLoading}
              options={countriesValid}
              name="countries"
              label={t("general.config.users.countries")}
            />
            <CheckboxInput
              isLoading={rolesLoading}
              options={rolesValid}
              name="roles"
              label={t("general.config.users.profile")}
            />
            <CheckboxInput
              isLoading={companyLoading}
              options={companyValid}
              name="company"
              label={t("general.config.users.companies")}
            />
            <CheckboxInput
              isLoading={responsibleLoading}
              options={responsibleValid}
              name="responsibles"
              label={t("general.config.users.responsibles")}
            />
          </S.CheckContainer>
          <S.FormActions>
            <S.Button mood="primary" type="submit">
              {loading ? (
                <S.ActivityIndicator />
              ) : (
                t("comex.filterandButton.register")
              )}
            </S.Button>
            <S.Button onClick={() => navigate(-1)} type="reset">
              {t("comex.filterandButton.cancel")}
            </S.Button>
          </S.FormActions>
        </div>
      </Form>
    </S.Container>
  );
};

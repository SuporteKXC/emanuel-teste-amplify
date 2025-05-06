import React, { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles, SubmitHandler } from "@unform/core";
import { Form } from "@unform/web";
import { useValidation } from "hooks";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import {
  UpdateUserActions as MainActions,
  RolesActions,
  CompanyActions,
  FetchUserActions,
  ResponsibleActions,
  SupplierListActions,
  UserSecondaryEmailActions,
  UserSecondaryEmailDeleteActions,
  CarrierActions,
  ClientActions,
  CountryActions,
  client,
  LogoutActions,
} from "store/ducks";

import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import * as S from "./styles";
import { useTranslation } from "react-i18next";
import { UpdateClientFilterActions, UpdateClientFilter } from "store/ducks";
import { RoleData, CompanyData } from "contracts";
import { Input, CheckboxInput } from "components/shared/Forms";
import { notify } from "services";
import { niceDate } from "utils";
import { ResponsibleData } from "contracts";
import { DatePickerUnform } from "components/shared/Forms/DatePickerUnform";
import moment from "moment";
import "moment/locale/pt-br";
import { format } from "date-fns";
import UserAvatar from "@/components/UserAvatar";
import useUserUploadImage from "@/queries/Users/useUserUploadImage";
import { CheckboxNew } from "@/components/shared/Forms/CheckboxNew";
import { ClientFilter } from "@/pages/General/Configurador/clients/filterClient";

interface Groups {
  id: string;
  label: string;
  value: string;
}

export const UpdateUserForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const formRef = useRef<FormHandles>(null);
  const formSecondaryRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const [clientFilter, setClientFilter] = useState<null | string>("");

  const { mutate: uploadUserImageMutate, isPending } = useUserUploadImage();

  const defaultDate = moment().locale("pt-br").format("YYYY-MM-DD");

  const [expiryDate, setExpiryDate] = useState<Date>(
    new Date(defaultDate + " 00:00")
  );

  const [imageKey, setImageKey] = useState();

  const { data: userData, loading: userLoading } = useSelector(
    (state: RootState) => state.user
  );

  const { data: companyData, loading: companyLoading } = useSelector(
    (state: RootState) => state.company
  );

  const { data: carrierData, loading: carrierLoading } = useSelector(
    (state: RootState) => state.carrier
  );

  const { data: clientData, loading: clientLoading } = useSelector(
    (state: RootState) => state.client
  );

  const { countries, loading: countriesLoading } = useSelector(
    (state: RootState) => state.country
  );

  const { data: rolesData, loading: rolesLoading } = useSelector(
    (state: RootState) => state.roles
  );

  const { loading } = useSelector((state: RootState) => state.updateUser);

  const { data: responsibleData, loading: responsibleLoading } = useSelector(
    (state: RootState) => state.responsibles
  );

  const { data: supplierData, loading: supplierLoading } = useSelector(
    (state: RootState) => state.supplierList
  );

  const fetchUser = useCallback(() => {
    dispatch(FetchUserActions.request(id));
  }, [dispatch]);

  const fetchCompanies = useCallback(() => {
    dispatch(CompanyActions.request());
  }, [dispatch]);

  const fetchCarriers = useCallback(() => {
    dispatch(CarrierActions.request());
  }, [dispatch]);

  const fetchClients = useCallback(() => {
    dispatch(ClientActions.request());
  }, [dispatch]);

  const handleFilterSubmit: SubmitHandler = (data) => {
    dispatch(UpdateClientFilterActions.request(clientFilter));
  };

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request());
  }, [dispatch]);

  const fetchResponsible = useCallback(() => {
    dispatch(ResponsibleActions.request());
  }, [dispatch]);

  const fetchSupplier = useCallback(() => {
    dispatch(SupplierListActions.request({}));
  }, [dispatch]);

  const changeDate = useCallback((date: any) => {
    setExpiryDate(date);
  }, []);

  const fetchCountries = useCallback(() => {
    dispatch(CountryActions.request());
  }, [dispatch]);

  const fetchUploadImageLink = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target?.files![0];

    if (!file) return;

    const fileSizeLimit = 5242880; // 5MB

    if (file.size > fileSizeLimit) {
      formRef.current?.setFieldValue("image", null);
      throw new Error("Limite máximo de tamanho de imagem (5MB) excedido");
    }

    uploadUserImageMutate(file, {
      onSuccess: (key) => {
        if (userData) {
          dispatch(FetchUserActions.success({ ...userData, image_key: key }));
        }
      },
      onError: (err) => {
        notify("error", err.message);
      },
    });
  };

  const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientFilter(e.target.value);
  };

  useEffect(() => {
    fetchUser();
    fetchRoles();
    fetchCompanies();
    fetchResponsible();
    fetchSupplier();
    fetchCarriers();
    fetchClients();
    fetchCountries();
  }, []);

  const userRoles =
    userData?.user_roles.map((item) => ({
      id: `${item.role?.id}`,
      label: item.role?.name,
      value: `${item.role?.id}`,
    })) ?? [];

  const userCountries =
    userData?.countries.map((item) => ({
      id: item?.id,
      label: item?.description,
      value: item?.id,
    })) ?? [];

  const countriesValid: Groups[] =
    countries?.map((country) => ({
      id: country.id,
      value: country.id,
      label: country.description,
    })) ?? [];

  const userCompanies =
    userData?.user_company.map((item) => ({
      id: `${item.company?.id}`,
      label: item.company?.name_fantasy,
      value: `${item.company?.id}`,
    })) ?? [];

  const userCarriers =
    userData?.user_carrier.map((item) => ({
      id: `${item.carrier?.id}`,
      label: item.carrier?.trade_name,
      value: `${item.carrier?.id}`,
    })) ?? [];

  const userClients =
    userData?.user_client.map((item) => ({
      id: `${item.client?.id}`,
      label: item.client?.trade_name,
      value: `${item.client?.id}`,
    })) ?? [];

  const productResponsible =
    userData?.user_responsibles?.map((item) => ({
      id: `${item.responsible?.id}`,
      label: item.responsible?.name,
      value: `${item.responsible?.id}`,
    })) ?? [];

  const userSupplierResponsible = userData?.user_suppliers?.map((item) => ({
    id: `${item.supplier?.id}`,
    label: item.supplier?.description,
    value: `${item.supplier?.id}`,
  }));

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

  const carrierValid: Groups[] = [];

  carrierData?.forEach((item: any) => {
    const carrierAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.trade_name,
    };
    carrierValid.push(carrierAdapt);
  });

  const carrierGroupeds: any = {};
  carrierData?.forEach((client) => {
    const cnpjMatriz = client?.document_number.substring(0, 8);

    if (!carrierGroupeds.hasOwnProperty(`${cnpjMatriz}`)) {
      Object.assign(carrierGroupeds, { [`${cnpjMatriz}`]: [] });
    }

    carrierGroupeds[cnpjMatriz].push({
      id: `${client?.id}`,
      label: client?.trade_name,
      value: `${client?.id}`,
      module: client.trade_name,
    });
  });

  const clientGroupeds: any = {};
  clientData?.forEach((client) => {
    const cnpjMatriz = client?.document_number.substring(0, 8);

    if (!clientGroupeds.hasOwnProperty(`${cnpjMatriz}`)) {
      Object.assign(clientGroupeds, { [`${cnpjMatriz}`]: [] });
    }

    clientGroupeds[cnpjMatriz].push({
      id: `${client?.id}`,
      label: client?.trade_name,
      value: `${client?.id}`,
      module: client.trade_name,
    });
  });

  const clientValid: Groups[] = [];

  clientData?.forEach((item: any) => {
    const clientAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.trade_name,
    };
    clientValid.push(clientAdapt);
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

  const supplierValid: Groups[] = [];

  supplierData?.forEach((item: any) => {
    const groupAdapt = {
      id: `${item.id}`,
      value: `${item.id}`,
      label: item.description,
    };
    supplierValid.push(groupAdapt);
  });

  const formatGroupedItemToSave = (data: any, include: string[] | string) => {
    const result: any = {};

    Object.entries(data).forEach(([key, value]) => {
      if (typeof include === "object") {
        include.forEach((i) => {
          if (key.includes(i)) {
            if (!result.hasOwnProperty(`${i}`)) {
              Object.assign(result, { [`${i}`]: [] });
            }
            result[i].push(value);
          }
        });
      } else {
        if (key.includes(include)) {
          if (!result.hasOwnProperty(`${include}`)) {
            Object.assign(result, { [`${include}`]: [] });
          }
          result[include].push(value);
        }
      }
    });

    Object.entries(result).forEach(([key, value]: any[]) => {
      result[key] = value.flat();
    });

    return result;
  };

  const onSubmit = useCallback<SubmitHandler>(
    async (data: any): Promise<void> => {
      try {
        const {
          name,
          email,
          fone,
          roles,
          company,
          responsibles,
          code_sap,
          supplier,
          countries,
        } = data;
        formRef.current?.setErrors({});

        const { client, carrier } = formatGroupedItemToSave(data, [
          "client",
          "carrier",
        ]);

        const schema = Yup.object().shape({
          email: Yup.string()
            .email(t("general.messages.emailInvalid"))
            .required(t("general.messages.emailMandatory")),
          name: Yup.string().required(t("general.messages.fieldMandatory")),
          code_sap: Yup.string(),
          fone: Yup.string(),
          image_key: Yup.string(),
          roles: Yup.array()
            .of(
              Yup.object()
                .shape({
                  role_id: Yup.string(),
                })
                .required(t("general.messages.fieldMandatory"))
            )
            .min(1, t("general.messages.fieldMandatory")),
          countries: Yup.array()
            .of(Yup.string().required(t("general.messages.fieldMandatory")))
            .min(1, t("general.messages.fieldMandatory")),
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
          // supplier: Yup.array().of(Yup.object().shape({
          //   supplier_id: Yup.string()
          // }))
        });

        const validData = await schema.validate(
          {
            name,
            email,
            code_sap,
            fone,
            image_key: userData?.image_key ?? "",
            roles: roles.map((id: string) => ({ role_id: id })),
            countries,
            company: company.map((id: string) => ({ company_id: id })),
            responsibles: responsibles.map((id: string) => ({
              responsible_id: id,
            })),
            client: client.map((id: string) => ({ client_id: id })),
            carrier: carrier.map((id: string) => ({ carrier_id: id })),
            // supplier: supplier.map((id: string) => ({supplier_id: id})),
          },
          {
            abortEarly: false,
          }
        );

        dispatch(MainActions.request(userData?.id, validData, logoutAfterUpdate));
      } catch (error) {
        console.log(error);
        handleFormErrors(error, formRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const logoutAfterUpdate = () => {
    dispatch(LogoutActions.request())
  }

  const secondaryOnSubmit = useCallback<SubmitHandler>(
    async ({ email, expiry_date }: any): Promise<void> => {
      try {
        formSecondaryRef.current?.setErrors({});

        if (!userData) {
          return;
        }

        const { id } = userData;

        expiry_date = format(expiry_date, "yyyy-MM-dd");

        const schema = Yup.object().shape({
          user_id: Yup.number().required("Usuario não encontrado"),
          email: Yup.string().email(t("general.messages.emailInvalid")),
          expiry_date: Yup.string(),
        });

        const validData = await schema.validate(
          {
            user_id: id,
            email,
            expiry_date,
          },
          {
            abortEarly: false,
          }
        );

        dispatch(UserSecondaryEmailActions.request(validData, fetchUser));

        if (formSecondaryRef.current) {
          formSecondaryRef.current.setFieldValue("email", "");
        }
      } catch (error) {
        handleFormErrors(error, formSecondaryRef);
      }
    },
    [dispatch, handleFormErrors]
  );

  const secondaryEmailDelete = useCallback(
    (id: number) => {
      dispatch(UserSecondaryEmailDeleteActions.request(id, fetchUser));
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      dispatch(MainActions.reset());
    };
  }, [dispatch]);

  return (
    <S.Container>
      {/* @ts-ignore */}
      <Form ref={formRef} onSubmit={onSubmit} placeholder="">
        {userLoading ? (
          <S.ActivityIndicator />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-md grid grid-cols-2">
              <div className="w-full flex justify-center items-center">
                <UserAvatar
                  imageKey={userData?.image_key}
                  alt="user"
                  className="w-52 h-52 lg:w-96 lg:h-96"
                >
                  <UserAvatar.Input
                    name="image"
                    accept="image/*"
                    onChange={fetchUploadImageLink}
                    isLoading={isPending}
                    label="Editar"
                  />
                </UserAvatar>
              </div>
              <div className="w-ful input-container">
                <Input
                  defaultValue={userData?.name}
                  name="name"
                  label={t("general.config.users.name")}
                />
                <Input
                  name="fone"
                  label={t("general.config.users.telephone")}
                />
                <Input
                  defaultValue={userData?.email}
                  name="email"
                  label={t("general.config.users.email")}
                />
                <Input
                  defaultValue={userData?.code_sap}
                  name="code_sap"
                  label={t("general.config.users.codeSap")}
                />
                <Input
                  name="last_access"
                  label={t(`general.config.users.lastAccess`)}
                  value={
                    userData?.last_access
                      ? niceDate({
                          dateString: userData.last_access,
                          language: i18n.language,
                        })
                      : "--/--/----"
                  }
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <CheckboxInput
                isLoading={countriesLoading}
                options={countriesValid}
                defaultOptions={userCountries}
                name="countries"
                label={t("general.config.users.countries")}
              />
              <CheckboxInput
                isLoading={rolesLoading}
                options={rolesValid}
                defaultOptions={userRoles}
                name="roles"
                label={t("general.config.users.profile")}
              />
              <CheckboxInput
                isLoading={companyLoading}
                options={companyValid}
                defaultOptions={userCompanies}
                name="company"
                label={t("general.config.users.companies")}
              />
              <CheckboxInput
                isLoading={responsibleLoading}
                options={responsibleValid}
                defaultOptions={productResponsible}
                name="responsibles"
                label={t("general.config.users.responsibles")}
              />
              {/* <CheckboxInput
                  isLoading={carrierLoading}
                  options={carrierValid}
                  defaultOptions={userCarriers}
                  name='carrier'
                  label={'Transportadora'} /> */}
              <S.Title>
                <h1>Transportadoras</h1>
              </S.Title>
              <S.CheckBoxGroupContainerN>
                {Object.entries(carrierGroupeds).map(
                  ([group, actionsGroup]: any[], i) => {
                    const label: string = actionsGroup[0].label as string;
                    return (
                      <CheckboxNew
                        // hideInList={!(selectedModule?.value && actionsGroup[0].module === selectedModule.value)}
                        direction="column"
                        defaultOptions={userCarriers}
                        key={group}
                        options={actionsGroup as any[]}
                        name={`carrier-${group}`}
                      />
                    );
                  }
                )}
              </S.CheckBoxGroupContainerN>
              <S.Title>
                <h1>Clientes</h1>
              </S.Title>
              <S.CheckBoxGroupContainerN>
                {/* @ts-ignore */}
                <Form ref={formRef}>
                  <S.InputFilter
                    name="client"
                    placeholder="Filtrar Cliente"
                    onChange={handleInputFilter}
                  />
                </Form>
                {Object.entries(clientGroupeds)
                  .filter(([, actionsGroup]: any[]) =>
                    actionsGroup.some(({ label }: any) =>
                      label.toUpperCase().includes(clientFilter?.toUpperCase())
                    )
                  )
                  .map(([group, actionsGroup]: any[], i) => {
                    const label: string = actionsGroup[0].label as string;
                    return (
                      <CheckboxNew
                        // hideInList={!(selectedModule?.value && actionsGroup[0].module === selectedModule.value)}
                        direction="column"
                        defaultOptions={userClients}
                        key={group}
                        options={actionsGroup as any[]}
                        name={`client-${group}`}
                      />
                    );
                  })}
              </S.CheckBoxGroupContainerN>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <S.Button mood="primary" type="submit">
                  {loading ? (
                    <S.ActivityIndicator />
                  ) : (
                    t("comex.filterandButton.update")
                  )}
                </S.Button>
                <S.Button onClick={() => navigate(-1)} type="reset">
                  {t("comex.filterandButton.cancel")}
                </S.Button>
              </div>

              {/* <CheckboxInput
                  isLoading={clientLoading}
                  options={clientValid}
                  defaultOptions={userClients}
                  name='client'
                  label={'Clientes'} /> */}
              {/* <CheckboxInput
                  isLoading={supplierLoading}
                  options={supplierValid}
                  defaultOptions={userSupplierResponsible}
                  name='supplier'
                  label={t('general.config.users.supplier')} /> */}
            </div>
          </div>
        )}
      </Form>

      <S.DivContainerSecond>
      <>
     {/* @ts-ignore */}
          <Form
            ref={formSecondaryRef}
            onSubmit={secondaryOnSubmit}
            placeholder=""
          >
            <S.FieldLabel>{t("general.config.users.secondEmail")}</S.FieldLabel>
            <S.ContainerEmail>
              <S.ContainerInput>
                <Input name="email" label="E-mail" />
              </S.ContainerInput>
              <S.ContainerInput>
                <div className="datePicker">
                  <DatePickerUnform
                    selected={expiryDate}
                    dateFormat="dd/MM/yyyy"
                    name="expiry_date"
                    onChange={changeDate}
                  />
                </div>
              </S.ContainerInput>
              <S.ContainerInput>
                <S.Button mood="secondary" type="submit">
                  {loading ? (
                    <S.ActivityIndicator />
                  ) : (
                    t("comex.filterandButton.register")
                  )}
                </S.Button>
              </S.ContainerInput>
            </S.ContainerEmail>
          </Form>


          {userData?.secondary_emails.length ? (
            <S.GridHeader>
              <S.HeaderEmail>{t("general.config.users.email")}</S.HeaderEmail>
              <S.HeaderEmail>
                {t("general.config.users.expiryDate")}
              </S.HeaderEmail>
              <S.Ghost></S.Ghost>
            </S.GridHeader>
          ) : (
            ""
          )}

          {userLoading ? (
            <S.ActivityIndicator />
          ) : (
            userData?.secondary_emails.map((element, index) => {
              return (
                <S.ContainerSecondaryEmail key={index}>
                  <S.TextEmail>{element.email}</S.TextEmail>
                  <S.TextEmail>
                    {format(new Date(element.expiry_date), "dd/MM/yyyy")}
                  </S.TextEmail>
                  <S.IconButton
                    tag="delete"
                    onClick={() => {
                      secondaryEmailDelete(element.id);
                    }}
                  >
                    <S.TrashIcon />
                  </S.IconButton>
                </S.ContainerSecondaryEmail>
              );
            })
          )}
        </>
      </S.DivContainerSecond>
    </S.Container>
  );
};
export default UpdateUserForm;
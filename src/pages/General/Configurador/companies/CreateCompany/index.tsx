import React, { useEffect } from "react";
import * as S from "./styles";
import { CompaniesTopPanel } from "layouts";

import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { useCountries } from "hooks/useCountries";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCompanyActions,
  FetchAccountsActions,
  FetchCompaniesActions,
  UpdateCompanyActions,
} from "store/ducks";
import { RootState } from "store";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { parseSelectOptionsGs } from "@/utils/parseSelectOptions";
import { CheckboxGs, InputGs, SelectGs } from "@/components/ui/Forms";
import { Button } from "@/components/ui/ButtonGs";
import Company from "@/contracts/general/Company";
import { Checkbox } from "@/components/ui/checkbox";
import { Loading } from "@/components/shared/Forms/Input/styles";
import CompaniesLayout from "@/layouts/Companies/CompaniesLayout";

type FormValues = {
  cnpj: string;
  nameFantasy: string;
  country: string;
  plantCode: string;
  accountId: number | string;
  isShow: number;
  consignee: string;
};

export const CreateCompany = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      cnpj: "",
      nameFantasy: "",
      country: "",
      plantCode: "",
      accountId: "",
      isShow: 1,
      consignee: "",
    },
  });

  const { loading: loadingCreateCompany } = useSelector(
    (state: RootState) => state.createCompany
  );

  const { loading: loadingUpdateCompany } = useSelector(
    (state: RootState) => state.updateCompany
  );

  const { data: accounts } = useSelector(
    (state: RootState) => state.fetchAccounts
  );
  const { t } = useTranslation();
  const { listCountries, countriesOptions: countries } = useCountries();

  const accountOptions = parseSelectOptionsGs(accounts, "username", "id");
  const countriesOptions = parseSelectOptionsGs(countries, "label", "value");

  const listAccounts = React.useCallback(() => {
    dispatch(FetchAccountsActions.request());
  }, [dispatch]);

  const onFetchCompanySuccess = (data: Company) => {
    form.setValue("cnpj", data.cnpj ?? "");
    form.setValue("nameFantasy", data.nameFantasy ?? "");
    form.setValue("country", data.country ?? "");
    form.setValue("plantCode", data.plantCode ?? "");
    form.setValue("accountId", data.accountId.toString() ?? "");
    form.setValue("consignee", data.consignee ?? "");
    form.setValue("isShow", data.isShow ?? 0);
  };

  const fetchCompany = () => {
    dispatch(FetchCompaniesActions.request(id, onFetchCompanySuccess));
  };

  React.useEffect(() => {
    listCountries();
    listAccounts();
  }, []);

  useEffect(() => {
    if (id) {
      fetchCompany();
    }

    return () => {
      form.reset();
    };
  }, [id]);

  const onSubmitSuccess = () => {
    navigate("/config/companies");
  };

  const handleSubmit = (data: FormValues) => {
    const storeData: FormValues = {
      ...data,
      cnpj: data.cnpj.replace(/[^\d]/g, ""),
    };

    if (!id) {
      dispatch(CreateCompanyActions.request(storeData, onSubmitSuccess));
    } else {
      dispatch(UpdateCompanyActions.request(id, storeData));
    }
  };

  function applyMask(input: string) {
    const cleanedInput = input.replace(/[^\d]/g, "");
    const formattedCNPJ = cleanedInput.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
    return formattedCNPJ;
  }

  return (
    <CompaniesLayout>
      <section className="w-full h-screen items-center justify-center">
        <div className="w-full mx-auto bg-white rounded-md p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t("general.config.companies.cnpj")}
                      placeholder={t("general.config.companies.cnpj")}
                      disabled={false}
                      required
                      value={applyMask(field.value)}
                      maxLength={18}
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="nameFantasy"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t("general.config.carriers.nomeFantasia")}
                      placeholder={t("general.config.carriers.nomeFantasia")}
                      disabled={false}
                      required
                    />
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <SelectGs
                      {...field}
                      label={t("general.config.companies.country")}
                      content={countriesOptions ?? []}
                      value={field.value}
                      onValueChange={(value) => form.setValue("country", value)}
                      required
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="consignee"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t("general.config.companies.consignee")}
                      placeholder={t("general.config.companies.consignee")}
                      disabled={false}
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="plantCode"
                  render={({ field }) => (
                    <InputGs
                      {...field}
                      label={t("general.config.companies.plantCode")}
                      placeholder={t("general.config.companies.plantCode")}
                      disabled={false}
                      required
                    />
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountId"
                  render={({ field }) => (
                    <SelectGs
                      {...field}
                      label={t("general.config.companies.account")}
                      content={accountOptions ?? []}
                      value={field.value}
                      onValueChange={(value) =>
                        form.setValue("accountId", value)
                      }
                      required
                    />
                  )}
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="isShow"
                  render={({ field }) => (
                    <div className="flex align-items-center gap-2 ml-2">
                      <label>{t("general.config.companies.isShow")}</label>
                      <CheckboxGs
                        {...field}
                        value={field.value}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button.Root
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/config/companies")}
                  type="button"
                  disabled={loadingCreateCompany || loadingUpdateCompany}
                >
                  {t("general.config.companies.cancelBtn")}
                </Button.Root>
                <Button.Root
                  variant="primary"
                  size="sm"
                  onClick={() => {}}
                  type="submit"
                  disabled={loadingCreateCompany || loadingUpdateCompany}
                >
                  {(loadingCreateCompany || loadingUpdateCompany) && (
                    <Loading />
                  )}
                  {t("general.config.companies.saveBtn")}
                </Button.Root>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </CompaniesLayout>
  );
};

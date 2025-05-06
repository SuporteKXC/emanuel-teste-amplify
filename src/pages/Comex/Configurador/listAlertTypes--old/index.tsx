import React, { useCallback, useEffect, useState } from "react";
import { Scaffold } from "layouts";
import { useDispatch, useSelector } from "react-redux";
import { AlertTypeModuleFilterActions, AlertTypesActions, DeleteAlertTypeActions, ModulesListActions } from "store/ducks";
import * as S from "./styles";
import type { AppDispatch, RootState } from "store";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
// import { ConfirmModal, Select } from "components";
import { ConfirmModal } from "components";
// import { Form } from "@unform/web";

// import Select from "react-select";

interface IOption {
  label: string;
  value: number;
}

export const ListAlertTypes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number>();
  const { i18n, t } = useTranslation();
  const [selected, setSelected] = useState<any[]>([]);
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const { hasPermissionTo } = usePermission();
  // const [selectedModule, setSelectedModule] = useState<IOption>();
  const [alertModeloShow, setAlertModeloShow] = useState<any>();

  const { data: alertTypesData, loading } = useSelector(
    (state: RootState) => state.alertTypes
  );
  
  const { data: alertTypeModuleIdData } = useSelector(
    (state: RootState) => state.alertTypeModuleId
  );

  const {data: modulesData, loading: modulesLoading } = useSelector(
    (state:RootState) => state.modules
  );

  const fetchAlertTypes = useCallback(() => {
    dispatch(AlertTypesActions.request("", onSuccess));
  }, [dispatch]);

  const onSuccess = useCallback(() => {
    setIsUpdatingSet(new Set());
  }, []);

  const fetchModules = useCallback(()=>{
    dispatch(ModulesListActions.request())
  },[dispatch]);

  useEffect(() => {
    fetchAlertTypes();
    fetchModules();
  }, [fetchAlertTypes]);

  const moduleOptions = modulesData?.map(module => ({
    value: module.id,
    label: module.name
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    setSelected([...selected, id]);
    if (!checked) {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const handleModalAction = () => {
    setIsUpdatingSet((prev) => new Set([...prev, toDelete]));
    dispatch(DeleteAlertTypeActions.request(toDelete, () => fetchAlertTypes()));
    setIsModalOpen(false);
  };
  
  const handleModalShow = useCallback ((value: IOption) => {
    if(value){
      dispatch(AlertTypeModuleFilterActions.setFilterData(value))
      const filteredData = alertTypesData?.filter((item: any) => {
        return item.module_id == value.value as number;
      });
      setAlertModeloShow(filteredData);
    }

  }, [setAlertModeloShow, alertTypesData, dispatch]);


  useEffect(() => {
    if(alertTypeModuleIdData){
      handleModalShow(alertTypeModuleIdData);
    }
  }, [alertTypesData, alertTypeModuleIdData]);

  const canEdit = hasPermissionTo("UPDATEALERTTYPE", "LISTROLE");
  const canDelete = hasPermissionTo("DELETEALERTTYPE");
  const permissionsQty =
    canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;
  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.ExclamationTriangleFillIcon height="24px" />
          {t("comex.settings.alertType.title")}
        </div>

        <S.SelectContainer>
          <S.SelectInput
            className="basic-single"
            classNamePrefix="select"
            styles={S.customStyles["primary"]}
            defaultValue={alertTypeModuleIdData ? alertTypeModuleIdData: ""}
            placeholder={t("general.config.profile.selectModulePlaceHolder")}
            // isDisabled={isDisabled}
            isLoading={modulesLoading}
            // isClearable={isClearable}
            // isRtl={isRtl}
            // isSearchable={isSearchable}
            name="module"
            options={moduleOptions}
            onChange={(value: any) => handleModalShow(value)}
          />
        
          {hasPermissionTo("CREATEALERTTYPE") ? (
            <S.ButtonWrapper>
              <Link to={"novo"}>
                <S.Buttons>
                  {t("comex.settings.alertType.addAlertType")}
                </S.Buttons>
              </Link>
            </S.ButtonWrapper>
          ) :  <S.Ghost />}
        </S.SelectContainer>

      </S.PageHeader>
      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("comex.settings.alertType.dateRegistration")}</div>
        <div>{t("comex.settings.alertType.description")}</div>
      </S.GridHeader>
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {alertTypesData && alertModeloShow &&
            Array.isArray(alertModeloShow) &&
            alertModeloShow.map((item, index) => (
              <S.ItemWrapper key={item.id} buttonsQty={permissionsQty}>
                <div>
                  {item?.created_at
                    ? format(new Date(item?.created_at), "dd-MM-yyyy")
                    : "--/--/----"}
                </div>
                <div>{item?.description}</div>
                <S.Ghost />
                {canEdit && (
                  <Link to={`update/${item.id}`} state={item}>
                    <S.IconButton>
                      <S.EditIcon />
                    </S.IconButton>
                  </Link>
                )}
                {canDelete && (
                  <S.IconButton
                    tag="delete"
                    onClick={() => {
                      setToDelete(item?.id);
                      setIsModalOpen(true);
                    }}
                  >
                    {isUpdatingSet.has(index) ? (
                      <S.ActivityIndicator />
                    ) : (
                      <S.TrashIcon />
                    )}
                  </S.IconButton>
                )}
                {/* <input id={item?.id} type="checkbox" onChange={handleChange} /> */}
              </S.ItemWrapper>
            ))}
          <ConfirmModal
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            action={handleModalAction}
          />
        </S.GridContainer>
      )}
    </>
  );
};

export default ListAlertTypes;

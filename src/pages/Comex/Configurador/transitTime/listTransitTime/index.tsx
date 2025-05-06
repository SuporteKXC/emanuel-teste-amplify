import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { exportToCSV } from "utils";
import ExportExcel from "components/shared/ExportExcel";
import { DeleteTransitTimeActions, ListTransitTimeActions } from "store/ducks";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "store";
import { ITransitTime } from "contracts";

import * as S from "./styles";
import { usePermission } from "hooks";
import { ConfirmModal } from "components";

export const ListTransitTime: React.FC = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number>();
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const { hasPermissionTo } = usePermission();

  const { data, loading } = useSelector(
    (state: RootState) => state.transitTime
  );

  const { loading: loadingDelete } = useSelector(
    (state: RootState) => state.deleteTransitTime
  );

  const fetchTransitTimes = useCallback(() => {
    dispatch(ListTransitTimeActions.request("", onSuccess));
  }, []);

  const fetchExportTransitTimes = useCallback(() => {
    dispatch(ListTransitTimeActions.request("", generateFile));
  }, []);

  const onSuccess = useCallback((): void => {}, []);

  const generateFile = useCallback((exportItems: ITransitTime[]) => {
    if (!exportItems) return;

    const fileName = `Transit-time ${new Date().toLocaleDateString(
      i18n.language,
      {
        day: "2-digit",
        month: "2-digit",
      }
    )}`;

    const exportFile = exportItems?.map((item) => {
      return {
        [t(`settings.transitTime.cnpj`)]: item?.cnpj,
        [t(`settings.transitTime.modal`)]: item?.modal,
        [t(`settings.transitTime.critical`)]: item?.critical
          ? t("comex.filterandButton.yes")
          : t("comex.filterandButton.no"),
        [t(`settings.transitTime.portEntryDate`)]: item?.port_entry_date,
        [t(`settings.transitTime.postImportLicenseReleaseDate`)]:
          item?.post_import_license_release_date,
        [t(`settings.transitTime.protocolMapaIn26Date`)]:
          item?.protocol_mapa_in26_date,
        [t(`settings.transitTime.registroDateDi`)]:
          item?.data_do_registro_da_di,
        [t(`settings.transitTime.customsClearanceDate`)]:
          item?.customs_clearance_date,
        [t(`settings.transitTime.nfDate`)]: item?.nf_date,
        [t(`settings.transitTime.transportDocDeliveryDate`)]:
          item?.transport_doc_delivery_date,
        [t(`settings.transitTime.loadingTerminal`)]:
          item?.loading_at_the_terminal,
        [t(`settings.transitTime.entregaPlanta`)]: item?.entrega_na_planta,
        [t(`settings.transitTime.grEfetivo`)]: item?.gr_efetivo,
      };
    });

    exportToCSV(exportFile, fileName);
  }, []);

  useEffect(() => {
    fetchTransitTimes();
  }, []);

  const handleModalAction = () => {
    setIsUpdatingSet((prev) => new Set([...prev, toDelete]));
    dispatch(
      DeleteTransitTimeActions.request(toDelete, () => fetchTransitTimes())
    );
    setIsModalOpen(false);
  };

  const canEdit = hasPermissionTo("UPDATETRANSITTIME");
  const canDelete = hasPermissionTo("DELETETRANSITTIME");
  const permissionsQty =
    canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;

  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.ExclamationTriangleFillIcon height="24px" />
          {t("comex.settings.transitTime.title")}
        </div>
        <S.ButtonWrapper>
          <S.ButtonItem>
            <ExportExcel
              loading={loading}
              onExport={() => fetchExportTransitTimes()}
            />
          </S.ButtonItem>
          {hasPermissionTo("CREATETRANSITTIME") && (
            <S.ButtonItem>
              <Link to={"novo"}>
                <S.Buttons>{t("comex.settings.transitTime.addBtn")}</S.Buttons>
              </Link>
            </S.ButtonItem>
          )}
        </S.ButtonWrapper>
      </S.PageHeader>

      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("comex.settings.transitTime.cnpj")}</div>
        <div>{t("comex.settings.transitTime.modal")}</div>
        <div>{t("comex.settings.transitTime.critical")}</div>
        <div>{t("comex.settings.transitTime.created")}</div>
      </S.GridHeader>
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {data &&
            Array.isArray(data) &&
            data.map((item, index) => (
              <S.ItemWrapper key={item.id} buttonsQty={permissionsQty}>
                <div>{item?.cnpj}</div>
                <div>{item?.modal}</div>
                <div>
                  {item?.critical
                    ? t("comex.filterandButton.yes")
                    : t("comex.filterandButton.no")}
                </div>
                <div>
                  {item?.created_at
                    ? format(new Date(item?.created_at), "dd-MM-yyyy")
                    : "--/--/----"}
                </div>
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
                    {isUpdatingSet.has(index) && loadingDelete ? (
                      <S.ActivityIndicator />
                    ) : (
                      <S.TrashIcon />
                    )}
                  </S.IconButton>
                )}
              </S.ItemWrapper>
            ))}
        </S.GridContainer>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        action={handleModalAction}
      />
    </>
  );
};
import { Scaffold } from "layouts";
import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { ResponsibleActions, DeleteResponsibleActions } from "store/ducks";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { niceDate } from "utils";
import { usePermission } from "hooks";
import { ConfirmModal } from "components";

export const ListResponsible: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number>();
  const [selected, setSelected] = useState<any[]>([]);
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const { i18n, t } = useTranslation();
  const { hasPermissionTo } = usePermission();

  const { data: responsibles, loading } = useSelector(
    (state: RootState) => state.responsibles
  );

  const fetchResponsibles = useCallback(() => {
    dispatch(ResponsibleActions.request("", onSuccess));
  }, []);

  const onSuccess = useCallback((data: any[]): void => {
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchResponsibles();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    setSelected([...selected, id]);
    if (!checked) {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const handleModalAction = () => {
    setIsUpdatingSet((prev) => new Set([...prev, toDelete]));
    dispatch(
      DeleteResponsibleActions.request(toDelete, () => fetchResponsibles())
    );
    setIsModalOpen(false);
  };

  const canEdit = hasPermissionTo("UPDATERESPONSIBLE");
  const canDelete = hasPermissionTo("DELETERESPONSIBLE");
  const permissionsQty =
    canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;

  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.UserRectangleIcon />
          {t("comex.settings.responsible.title")}
        </div>
        {hasPermissionTo("CREATERESPONSIBLE") && (
          <S.ButtonWrapper>
            <Link to={"novo"}>
              <S.Buttons>{t("comex.filterandButton.addResponsible")}</S.Buttons>
            </Link>
          </S.ButtonWrapper>
        )}
      </S.PageHeader>
      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("comex.settings.responsible.registration")}</div>
        <div>{t("comex.settings.responsible.name")}</div>
        <div>{t("comex.settings.responsible.importSlug")}</div>
      </S.GridHeader>
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {responsibles &&
            Array.isArray(responsibles) &&
            responsibles?.map((item, index) => (
              <S.ItemWrapper key={item.id} buttonsQty={permissionsQty}>
                <div>
                  {item?.created_at
                    ? format(new Date(item?.created_at), "dd/MM/yyyy HH:mm")
                    : "--/--/----"}
                </div>
                <div>{item?.name}</div>
                <div>{item?.import_slug}</div>
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

export default ListResponsible;

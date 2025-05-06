import React, { useCallback, useEffect, useState } from "react";
import { Scaffold } from "layouts";
import { useDispatch, useSelector } from "react-redux";
import {
  JustificationTypeListActions,
  DeleteJustificationTypeActions,
} from "store/ducks";
// import { JustificationTypeListActions } from 'store/ducks/comex/operational'
import * as S from "./styles";
import type { AppDispatch, RootState } from "store";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
import { ConfirmModal } from "components";

export const ListJustificationType: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number>();
  const [selected, setSelected] = useState<any[]>([]);
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const { hasPermissionTo } = usePermission();

  const { data: justificationTypesData, loading: loadingJustificationType } =
    useSelector((state: RootState) => state.justificationTypes);

  const fetchJustificationTypes = useCallback(() => {
    dispatch(JustificationTypeListActions.request());
  }, [dispatch]);

  useEffect(() => {
    fetchJustificationTypes();
  }, [fetchJustificationTypes]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { checked, id } = e.target;
  //   setSelected([...selected, id]);
  //   if (!checked) {
  //     setSelected(selected.filter((item) => item !== id));
  //   }
  // };

  const handleModalAction = () => {
    setIsUpdatingSet((prev) => new Set([...prev, toDelete]));
    dispatch(
      DeleteJustificationTypeActions.request(toDelete, () =>
        fetchJustificationTypes()
      )
    );
    setIsModalOpen(false);
  };

  const canEdit = hasPermissionTo("UPDATEJUSTIFICATIONTYPE");
  const canDelete = hasPermissionTo("DELETEJUSTIFICATIONTYPE");
  const permissionsQty =
    canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;
  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.ExclamationTriangleFillIcon height="24px" />
          {t("comex.settings.justificationType.title")}
        </div>
        {hasPermissionTo("CREATEJUSTIFICATIONTYPE") && (
          <S.ButtonWrapper>
            <Link to={"novo"}>
              <S.Buttons>
                {t("comex.settings.justificationType.addjustificationType")}
              </S.Buttons>
            </Link>
          </S.ButtonWrapper>
        )}
      </S.PageHeader>
      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("comex.settings.justificationType.dateRegistration")}</div>
        <div>{t("comex.settings.justificationType.description")}</div>
      </S.GridHeader>
      {loadingJustificationType ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {justificationTypesData &&
            Array.isArray(justificationTypesData) &&
            justificationTypesData.map((item, index) => (
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
                {/* <input id={item?.id as unknown as string} type="checkbox" onChange={handleChange} /> */}
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

export default ListJustificationType;

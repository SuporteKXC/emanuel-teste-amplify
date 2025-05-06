// import { Scaffold } from "layouts";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteRoleActions, RolesActions } from "store/ducks";
import * as S from "./styles";
import type { AppDispatch, RootState } from "store";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { usePermission } from "hooks";
// import { ConfirmModal } from "components";

export const ListRoles: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { i18n, t } = useTranslation();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [toDelete, setToDelete] = useState<number>();
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const [selected, setSelected] = useState<any[]>([]);
  const { hasPermissionTo } = usePermission();

  const { data: rolesData, loading } = useSelector(
    (state: RootState) => state.roles
  );

  const fetchRoles = useCallback(() => {
    dispatch(RolesActions.request("", onSuccess, onFailure));
  }, [dispatch]);

  const onSuccess = useCallback(() => {
    setIsUpdatingSet(new Set());
  }, []);

  const onFailure = useCallback((message: string) => {
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    setSelected([...selected, id]);
    if (!checked) {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  // const handleModalAction = () => {
  //   setIsUpdatingSet((prev) => new Set([...prev, toDelete]));
  //   dispatch(DeleteRoleActions.request(toDelete, () => fetchRoles()));
  //   setIsModalOpen(false);
  // };

  const canEdit = hasPermissionTo("UPDATEROLE", "LISTACTION");
  // const canDelete = hasPermissionTo("DELETEROLE");
  // const permissionsQty = canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;
  const permissionsQty = canEdit ? 1 : 0;
  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.PeopleCommunityIcon height="24px" />
          {t("general.config.users.profile")}
        </div>
        {hasPermissionTo("CREATEROLE", "LISTACTION") && (
          <S.ButtonWrapper>
            <Link to={"novo"}>
              <S.Buttons>{t("comex.filterandButton.addprofile")}</S.Buttons>
            </Link>
          </S.ButtonWrapper>
        )}
      </S.PageHeader>
      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("general.config.profile.dateRegistration")}</div>
        <div>{t("general.config.profile.type")}</div>
      </S.GridHeader>
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {rolesData &&
            Array.isArray(rolesData) &&
            rolesData?.map((item, index) => (
              <S.ItemWrapper key={item.id} buttonsQty={permissionsQty}>
                <div>
                  {item?.created_at
                    ? format(new Date(item?.created_at), "dd-MM-yyyy")
                    : "--/--/----"}
                </div>
                <div>{item?.name}</div>
                <S.Ghost />
                {canEdit && (
                  <Link to={`update/${item.id}`} state={item}>
                    <S.IconButton>
                      <S.EditIcon />
                    </S.IconButton>
                  </Link>
                )}
                {/* {canDelete && (
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
                )} */}
                {/* <input id={item?.id} type="checkbox" onChange={handleChange} /> */}
              </S.ItemWrapper>
            ))}
        </S.GridContainer>
      )}
      {/* <ConfirmModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        action={handleModalAction}
      /> */}
    </>
  );
};

export default ListRoles;

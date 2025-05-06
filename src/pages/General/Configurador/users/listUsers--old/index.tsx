import { Scaffold } from "layouts";
import React, { useCallback, useEffect, useState } from "react";
import * as S from "./styles";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "store";
import { DeleteUserActions, UserActions, UserState } from "store/ducks";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { niceDate } from "utils";
import { usePermission } from "hooks";
import { ConfirmModal } from "components";

export const Users: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState<number>();
  const [selected, setSelected] = useState<any[]>([]);
  const [isUpdatingSet, setIsUpdatingSet] = useState(new Set());
  const { i18n, t } = useTranslation();
  const { hasPermissionTo } = usePermission();

  const { data: users, loading } = useSelector(
    (state: RootState) => state.users
  );

  const fetchUsers = useCallback(() => {
    dispatch(UserActions.request("", onSuccess));
  }, []);

  const onSuccess = useCallback((data: any[]): void => {
    setIsUpdatingSet(new Set());
  }, []);

  useEffect(() => {
    fetchUsers();
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
    dispatch(DeleteUserActions.request(toDelete, () => fetchUsers()));
    setIsModalOpen(false);
  };

  const canEdit = hasPermissionTo(
    "UPDATEUSER",
    "LISTROLE",
    "LISTCOMPANY",
    "LISTRESPONSIBLE"
  );
  const canDelete = hasPermissionTo("DELETEUSER");
  const permissionsQty =
    canEdit && canDelete ? 2 : canEdit || canDelete ? 1 : 0;
  return (
    <>
      <S.PageHeader>
        <div className="wrapper">
          <S.UserRectangleIcon />
          {t("general.config.users.title")}
        </div>
        {hasPermissionTo(
          "CREATEUSER",
          "LISTROLE",
          "LISTCOMPANY",
          "LISTRESPONSIBLE"
        ) && (
          <S.ButtonWrapper>
            <Link to={"novo"}>
              <S.Buttons>{t("comex.filterandButton.addUser")}</S.Buttons>
            </Link>
          </S.ButtonWrapper>
        )}
      </S.PageHeader>
      <S.GridHeader buttonsQty={permissionsQty}>
        <div>{t("general.config.users.registration")}</div>
        <div>{t("general.config.users.name")}</div>
        <div>{t("general.config.users.email")}</div>
        <div>{t("general.config.users.lastAccess")}</div>
      </S.GridHeader>
      {loading ? (
        <S.ActivityIndicator />
      ) : (
        <S.GridContainer>
          {users &&
            Array.isArray(users) &&
            users?.map((item, index) => (
              <S.ItemWrapper key={item.id} buttonsQty={permissionsQty}>
                <div>
                  {item?.created_at
                    ? format(new Date(item?.created_at), "dd/MM/yyyy HH:mm")
                    : "--/--/----"}
                </div>
                <div>{item?.name}</div>
                <div>{item?.email}</div>
                {/* <div>{`item?.last_access`}</div> */}
                <div>
                  {item?.last_access
                    ? niceDate({
                        dateString: item?.last_access,
                        language: i18n.language,
                      })
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
                    {isUpdatingSet.has(item?.id) ? (
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

export default Users;

import { ConfirmationDialog, ConfirmationDialogRef } from 'components/Shared';
import { useAuth, useStockRelatedWarehouses } from 'hooks';
import React from 'react';
import { useDispatch } from 'react-redux';
import { LogoutActions } from 'store/ducks/auth';
import * as S from './styles';
import { WarehousesModal } from 'components/Pages/WarehouseMembers/Modal';

const TopPanel: React.FC = () => {
  const { profile, userBelongsToAnyOf } = useAuth();
  const { warehouses, fetchWarehouses, loadingWarehouses } =
    useStockRelatedWarehouses();

  const dispatch = useDispatch();
  const dialogRef = React.useRef<ConfirmationDialogRef>(null);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleModal = React.useCallback(() => setOpen((prev) => !prev), []);

  const isWarehouseMember = React.useMemo(
    () => userBelongsToAnyOf('warehouseMember'),
    [userBelongsToAnyOf]
  );

  const chosenWarehouses = React.useMemo(
    () =>
      profile?.warehouses?.length && warehouses?.length
        ? profile?.warehouses?.map((warehouse) => {
            return {
              ...warehouse,
              hasStock: warehouses.map(({ id }) => id).includes(warehouse.id),
            };
          })
        : [],
    [warehouses, profile]
  );

  const handleLogout = React.useCallback(async (): Promise<void> => {
    const confirmed = await dialogRef.current?.openDialog({
      title: 'Deseja sair?',
    });
    if (confirmed) {
      dispatch(LogoutActions.request());
    }
  }, [dispatch]);

  const Domain = React.useCallback((): JSX.Element => {
    switch (profile?.type) {
      case 'admin':
        return (
          <S.Domain>
            <S.AdminIcon /> Administrador
          </S.Domain>
        );
      case 'companyMember':
        return (
          <S.Domain>
            <S.CompanyIcon /> {profile?.company?.tradeName}
          </S.Domain>
        );
      case 'warehouseMember':
        return (
          <S.Domain onClick={handleModal} isHover title="Ver armazéns">
            <S.WarehouseIcon />
          </S.Domain>
        );
      default:
        return <></>;
    }
  }, [profile]);

  React.useEffect(() => {
    open && fetchWarehouses({ havingStock: true });
  }, [open]);

  if (!profile) return <React.Fragment />;

  return (
    <S.TopPanel>
      {isWarehouseMember && (
        <WarehousesModal
          isOpen={open}
          onClose={handleModal}
          warehouses={chosenWarehouses}
          isLoading={loadingWarehouses}
          isTopPanel
        />
      )}
      <ConfirmationDialog ref={dialogRef} />
      <Domain />
      <S.Version>Versão BETA v.0.0.2</S.Version>
      <S.Actions>
        <S.User>{profile?.name}</S.User>
        <S.LogoutButton onClick={handleLogout}>
          <S.LogoutIcon />
        </S.LogoutButton>
      </S.Actions>
    </S.TopPanel>
  );
};

export default TopPanel;

import React from "react";
import {useDispatch} from "react-redux";
import * as S from "./styles";
import { UserAlert } from "interfaces/user-alert";
import { useTranslation } from 'hooks';
import { translations } from './translations';

import { 
  DeleteUserAlertActions, 
} from "store/ducks/settings/user-alerts";

interface IGridUserAlertsProps {
  userAlerts: UserAlert[] | Record<string, any>[];
  loading: boolean;
  onDelete: any;
}

interface IUserAlertProps {
  userAlert: UserAlert | Record<string, any>;
  onDelete: any;
}

const Item: React.FC<IUserAlertProps> = ({ userAlert, onDelete }) => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const handleDelete = async (userAlert:any) => {
    dispatch(DeleteUserAlertActions.request(userAlert.id, onDelete));
  }

  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{userAlert.user.name || "--"}</S.ItemValue>
        <S.ItemValue>{userAlert.user.email || "--"}</S.ItemValue>
        <S.Button
          btStyle="danger"
          type="button"
          onClick={() => handleDelete(userAlert)}
          >
          {getTranslation('deletar')}
        </S.Button>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridUserAlerts: React.FC<IGridUserAlertsProps> = ({
  userAlerts = [],
  loading = false,
  onDelete,
}) => {
  const { getTranslation } = useTranslation(translations);
  
  return (
    <S.Container>
      { loading ? (
          <S.Loading/>
        ) : (
          <>
            {userAlerts.length > 0 && (
              <>
                <S.Header>
                  <S.Label>{getTranslation('nome')}</S.Label>
                  <S.Label>{getTranslation('email')}</S.Label>
                </S.Header>
                {userAlerts.map((userAlert) => <Item userAlert={userAlert} key={userAlert.id} onDelete={onDelete}/>)}
              </>
            )}
          </>
        )
      }
    </S.Container>
  );
};

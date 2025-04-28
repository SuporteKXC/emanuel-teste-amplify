import React from "react";
import { useHistory } from "react-router-dom";
import * as S from "./styles";
import { Client } from "interfaces/client";
import { cnpj } from "utils";
import { useTranslation } from 'hooks';
import { translations } from './translations';

interface IGridClientsProps {
  clients: Client[] | Record<string, any>[];
}

interface IClientProps {
  client: Client | Record<string, any>;
}

const Item: React.FC<IClientProps> = ({ client }) => {
  const history = useHistory();
  return (
    <S.ItemContainer
      onClick={() => history.push(`/settings/client/${client.id}`)}
    >
      <S.ItemContent>
        <S.ItemValue>{client.client_code || "--"}</S.ItemValue>
        <S.ItemValue>{client.cnpj ? cnpj(client.cnpj) : "--"}</S.ItemValue>
        <S.ItemValue>
          {client.clientType ? client.clientType.name : "--"}
        </S.ItemValue>
        <S.ItemValue>{client.company_name || "--"}</S.ItemValue>
        <S.ButtonDetail>
          <S.IconDetail />
        </S.ButtonDetail>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridClients: React.FC<IGridClientsProps> = ({ clients = [] }) => {
  const { getTranslation } = useTranslation(translations);
  
  return (
    <S.Container>
      <S.Header>
        <S.Label>{getTranslation('codigoSAP')}</S.Label>
        <S.Label>{getTranslation('cnpjRaiz')}</S.Label>
        <S.Label>{getTranslation('customizacao')}</S.Label>
        <S.Label>{getTranslation('razaoSocial')}</S.Label>
      </S.Header>
      {clients.length > 0 &&
        clients.map((client) => <Item client={client} key={client.id} />)}
    </S.Container>
  );
};

import { call, put } from "redux-saga/effects";
import { apiGeneral, notify, queryBuilder } from "services";
import { IListRequest } from "interfaces/list-duck";
import { requestErrorHandler } from "utils";
import { ListClientsActions } from "store/ducks/settings/clients";

import { Client } from "interfaces/client";

export function* listClientsRequest(action: any) {
  try {
    const { query = {}, onSuccess } = action as IListRequest;
    const queryString = queryBuilder(query);
    const { data } = yield call(apiGeneral.get, `/clients?${queryString}`);
    const uniqueData: Client[] = [];
    
    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const sameRootCnpj = (i: any) => {
        if(i.cnpj && item.cnpj) {
          return i.cnpj.slice(0, 8) === item.cnpj.slice(0, 8);
        }
      };

      if (!uniqueData.some(sameRootCnpj)) {
        uniqueData.push(item);
      }
    }

    const comboOptions = uniqueData.map((client: Client) => ({
      value: client.id,
      label: `${client.company_name || "---"} - ${client.cnpj}`,
    }));
    // const comboOptions = data.map((client: Client) => ({
    //   value: client.id,
    //   label: client.company_name,
    // }));

    yield put(ListClientsActions.success(comboOptions));
    if (onSuccess) onSuccess(comboOptions);
  } catch (error) {
    const { errorMessage } = requestErrorHandler(error);
    notify("error", errorMessage);
    yield put(ListClientsActions.failure(errorMessage));
  }
}

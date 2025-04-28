import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import {
  InputDate,
  Select,
} from "components/shared/Form";
  import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import * as S from "./styles";
import { ButtonMini } from "styles/styled-components";
import { Filter } from "lucide-react";
import { ListStockProductsActions, ListStockProductsState } from "store/ducks/settings/products";
import { ListClientsActions, ListClientsState } from "store/ducks/settings/clients";
import ReactLoading from "react-loading";
import { useTranslation } from 'hooks';
import { translations } from './translations';
import { format } from "date-fns";

interface Props {
  onSubmit: (data: any) => void;
  fileLoading: boolean;
  onExport: () => void;
  lastUpdate?: Date
}

export const FilterStockMovement: React.FC<Props> = ({ onSubmit, onExport, fileLoading, lastUpdate }) => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const clearFilter =()=>{
    if(formRef.current){
      formRef.current.setFieldValue('clientId', '');
      formRef.current.setFieldValue('entranceDateStart', '');
      formRef.current.setFieldValue('entranceDateEnd', '');
      formRef.current.setFieldValue('movementType', '');
      formRef.current.setFieldValue('productId', '');
      const clear = {
        clientId:'',
        entranceDateStart: '',
        entranceDateEnd: '',
        movementType:'',
        productId: ''
      }
      onSubmit(clear)
    }
  }

  const { data: products } = useSelector<RootState>(
    (state) => state.listStockProducts
  ) as ListStockProductsState;
  const { data: client } = useSelector<RootState>(
    (state) => state.listClients
  ) as ListClientsState;

  const movementType = [
    { value: "E", label: "ENTRADA"},
    { value: "S", label: "SAIDA"}
  ];

  useEffect(() => {
    dispatch<any>(ListStockProductsActions.request({ all: true }));
    dispatch<any>(ListClientsActions.request({ all: true }));
  }, [dispatch]);
  return (
    <>
    <Form ref={formRef} onSubmit={onSubmit}>
      <S.Container>
        <S.Update>
          <S.ContentUpdate>
            {getTranslation('lastUpdate')}:
            <p>
              {lastUpdate ? format(new Date(lastUpdate), "dd/MM/yyyy HH:mm") : "--/--/-- --:--"}
            </p>
          </S.ContentUpdate>
        </S.Update>
        <S.FormContainer>
          <Select
            placeholder={getTranslation('client')}
            options={client}
            name={"clientId"}
            containerStyle={{ margin: "0px" }}
            />
          <Select
            placeholder={getTranslation('product')}
            options={products}
            name={"productId"}
            containerStyle={{ margin: "0px" }}
            />
          <Select
            containerStyle={{ margin: "0px" }}
            placeholder={getTranslation('type')}
            options={movementType}
            name="movementType"
            />
          <InputDate name="entranceDateStart" label={getTranslation('startDate')} />
          <InputDate name="entranceDateEnd" label={getTranslation('endDate')} />
          <ButtonMini style={{height: "44px"}} type="reset" onClick={clearFilter}>{getTranslation('limpar')}</ButtonMini>
          <ButtonMini style={{height: "44px"}}  type="submit">
            {getTranslation('filtrar')} <Filter />
          </ButtonMini>
          <ButtonMini style={{height: "44px"}} onClick={onExport} disabled={fileLoading}>
            {fileLoading ? (
              <ReactLoading type="spin" color="#fff" height={20} width={20} />
            ) : (
              getTranslation('exportFile')
            )}
          </ButtonMini>  
        </S.FormContainer>
      </S.Container>
    </Form>
    </>
  );
};

export default FilterStockMovement;

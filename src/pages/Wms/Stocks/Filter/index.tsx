import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import {
  Input,
  InputDate,
  Select,
} from "components/shared/Form";
import React, { useEffect, useRef, useState } from "react";
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
  onCheck: (data: any) => void;
  fileLoading: boolean;
  onExport: () => void;
  lastUpdate?: Date;
}
export const FilterStocks: React.FC<Props> = ({ onSubmit, onCheck, onExport, fileLoading, lastUpdate }) => {
  const formRef = useRef<FormHandles>(null);
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);

  const [selectedOptions, setSelectedOptions] = useState({
    todos: false, // Select All
    ag: false,
    cd: false,
  });

  const handleChange = (event: any) => {
    const { name, checked } = event.target;

    if (name === "todos") {
      setSelectedOptions({
        todos: checked,
        ag: checked,
        cd: checked,
      });
    } else {
      setSelectedOptions((prev: any) => ({
        ...prev,
        [name]: checked,
        todos: prev.ag && prev.cd ? true : false,
      }));
    }
  };

  const clearFilter =()=>{
    if(formRef.current){
      formRef.current.setFieldValue('companyId', '');
      formRef.current.setFieldValue('dueDateStart', '');
      formRef.current.setFieldValue('invoiceNumber', '');
      formRef.current.setFieldValue('productId', '');
      const clear = {
        companyId:'',
        dueDateStart: '',
        invoiceNumber:'',
        productId: ''
      }
      onSubmit(clear)
    }
  }

  useEffect(()=>{
    onCheck(selectedOptions)

  },[selectedOptions])

  const { data: products } = useSelector<RootState>(
    (state) => state.listStockProducts
  ) as ListStockProductsState;
  const { data: company } = useSelector<RootState>(
    (state) => state.listClients
  ) as ListClientsState;

  useEffect(() => {
    dispatch<any>(ListStockProductsActions.request({ all: true }));
    dispatch<any>(ListClientsActions.request({ all: true }));
  }, [dispatch]);
  return (
    <>
    <S.Checks>
      <input
        type="checkbox"
        name="todos"
        checked={selectedOptions.ag && selectedOptions.cd}
        onChange={handleChange}
        id="1"
        />{" "}
      <label>Todos</label>
      <input
        type="checkbox"
        checked={selectedOptions.ag}
        onChange={handleChange}
        name="ag"
        />{" "}
      <label> AG</label>
      <input
        type="checkbox"
        checked={selectedOptions.cd}
        onChange={handleChange}
        name="cd"
        />{" "}
      <label> CD</label>
    </S.Checks>
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
            options={company}
            name={"companyId"}
            containerStyle={{ margin: "0px" }}
            />
          <Select
            placeholder={getTranslation('product')}
            options={products}
            name={"productId"}
            containerStyle={{ margin: "0px" }}
            />
          <Input
            containerStyle={{ margin: "0px" }}
            placeholder="NF"
            name="invoiceNumber"
            />
          <InputDate name="dueDateStart" label={getTranslation('expirationDate')} />
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

export default FilterStocks;

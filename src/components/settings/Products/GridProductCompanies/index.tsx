import React from "react";
import {useDispatch} from "react-redux";
import * as S from "./styles";
import { ProductCompany } from "interfaces/product-companies";
import { useTranslation } from 'hooks';
import { translations } from './translations';
import { 
  DeleteProductCompanyActions, 
} from "store/ducks/settings/product-companies";

interface IGridProductCompaniesProps {
  productCompanies: ProductCompany[] | Record<string, any>[];
  loading: boolean;
  onDelete: any;
}

interface IProductCompanyProps {
  productCompany: ProductCompany | Record<string, any>;
  onDelete: any;
}

const Item: React.FC<IProductCompanyProps> = ({ productCompany, onDelete }) => {
  const dispatch = useDispatch();
  const { getTranslation } = useTranslation(translations);
  const handleDelete = async (productCompany:any) => {
    dispatch(DeleteProductCompanyActions.request(productCompany.id, onDelete));
  }
  
  return (
    <S.ItemContainer>
      <S.ItemContent>
        <S.ItemValue>{productCompany.company.code || "--"}</S.ItemValue>
        <S.ItemValue>{productCompany.company.trade_name || "--"}</S.ItemValue>
        <S.ItemValue>{productCompany.business_line.activity_division || "--"}</S.ItemValue>
        <S.Button
          btStyle="danger"
          type="button"
          onClick={() => handleDelete(productCompany)}
          >
          {getTranslation('deletar')}
        </S.Button>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export const GridProductCompanies: React.FC<IGridProductCompaniesProps> = ({
  productCompanies = [],
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
            {productCompanies.length > 0 && (
              <>
                <S.Header>
                  <S.Label>{getTranslation('codCentro')}</S.Label>
                  <S.Label>{getTranslation('desCentro')}</S.Label>
                  <S.Label>{getTranslation('businessLine')}</S.Label>
                </S.Header>
                {productCompanies.map((productCompany) => <Item productCompany={productCompany} key={productCompany.id} onDelete={onDelete}/>)}
              </>
            )}
          </>
        )
      }
    </S.Container>
  );
};
 
import { Pagination } from "interfaces/pagination";
import React, { ComponentProps } from "react";
import { useTranslation } from 'hooks';
import { translations } from './translations';
import * as S from "./styles";

interface PaginatorProps extends ComponentProps<any> {
  pagination: Pagination | null;
  onPageChange: Function;
  neighbors?: number;
  loading?: boolean;
}

type Props = PaginatorProps;

export const Paginator: React.FC<Props> = ({
  pagination,
  onPageChange,
  neighbors = 4,
  loading = false,
}) => {
  const { getTranslation } = useTranslation(translations);

  function handleClick(page: number) {
    if (onPageChange) onPageChange(page);
  }

  const Buttons = () => {
    if (pagination === null) return <></>;

    const { page, lastPage } = pagination;

    const pages = lastPage;

    const targetSize = neighbors * 2;
    const middle = Math.floor(targetSize / 2);
    const paginatorArray = [];

    if (pages > 1) {
      let inicio = page > middle ? page - middle : 1;
      inicio = inicio > pages - targetSize ? pages - targetSize : inicio;
      inicio = inicio < 1 ? 1 : inicio;
      let t = inicio + targetSize;
      t = pages < t ? pages : t;
      for (let i = inicio; i <= t; i++) paginatorArray.push(i);
    }

    return (
      <S.Container>
        <S.Content>
          {page > 5 && lastPage > 9 && (
            <S.Button 
              onClick={() => handleClick(1)} 
              active={false}
              className="aux-page"
            >
              {getTranslation("primeira")}
            </S.Button>
          )}
          {paginatorArray.map((index) => (
            <S.Button
              active={page === index}
              key={index}
              onClick={() => handleClick(index)}
            >
              {index}
            </S.Button>
          ))}
          {page <= (lastPage - 5) && lastPage > 9 && (
            <S.Button 
              onClick={() => handleClick(lastPage)} 
              active={false}
              className="aux-page"
            >
              {getTranslation("ultima")}
            </S.Button>
          )}
          {loading && <S.PageLoading />}
        </S.Content>
        <S.Description>
        {getTranslation("exibindopagina")} {pagination.page}/{pagination.lastPage} {getTranslation("deUmTotalDe")}{" "}
          {pagination.total} {getTranslation("registros")}
        </S.Description>
      </S.Container>
    );
  };
  return <Buttons />;
};

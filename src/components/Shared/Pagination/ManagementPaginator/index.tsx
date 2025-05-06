import React, { useCallback } from "react";
import { CamelPagination } from "contracts";
import * as S from "./styles";
import { useTranslation } from "react-i18next";

interface Props {
  pagination?: CamelPagination | undefined;
  onPageChange?: (page: number) => void;
  neighbors?: number;
}

export const ManagementPaginator: React.FC<Props> = ({
  pagination,
  onPageChange,
  neighbors = 2,
}) => {
  const handleClick = useCallback(
    (page: number): void => {
      onPageChange && onPageChange(page);
    },
    [onPageChange]
  );

  const ButtonsPresenter = useCallback((): JSX.Element => {
    if (!pagination) return <></>;
    const { t } = useTranslation();

    const { currentPage, lastPage } = pagination;

    const targetSize = neighbors * 2;
    const middle = Math.floor(targetSize / 2);
    const paginatorArray = [];

    let start = currentPage > middle ? currentPage - middle : 1;
    start = start > lastPage - targetSize ? lastPage - targetSize : start;
    start = start < 1 ? 1 : start;
    let p = start + targetSize;
    p = lastPage < p ? lastPage : p;
    for (let i = start; i <= p; i++) {
      paginatorArray.push(i);
    }

    return (
      <S.Container>
        <>
          <S.AltButton
            key="first"
            disabled={currentPage === 1}
            onClick={() => handleClick(1)}
          >
            {t("general.page.first")}
          </S.AltButton>
          {paginatorArray.map((i) => (
            <S.Button
              key={i}
              active={currentPage === i}
              onClick={() => handleClick(i)}
            >
              {i}
            </S.Button>
          ))}
          <S.AltButton
            key="last"
            disabled={currentPage === lastPage}
            onClick={() => handleClick(lastPage)}
          >
            {t("general.page.last")}
          </S.AltButton>
        </>
      </S.Container>
    );
  }, [handleClick, neighbors, pagination]);

  return <ButtonsPresenter />;
};

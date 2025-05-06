import { memo, useCallback, useContext, useEffect, useState } from "react";
import * as S from "./styles";
import { CheckboxRadix } from "components/shared/Forms/CheckboxRadix";
import { DivergenceContext } from "contexts/DivergenceContext";
import { useTranslation } from "react-i18next";
import TooltipItem from "components/management/Snapshot/Snapshot/SnapshotList/TooltipItem";

// export const DivergenceItem = memo((data): JSX.Element => {
export const DivergenceItem = ({ data, setOpen, setElementDivergent }: any) => {
  const { t } = useTranslation();
  const {
    onRemoveSelecteds,
    onToggleSelected,
    onSelectInvoices,
    selectedList,
  } = useContext(DivergenceContext);

  const allSelected = data?.snapshotDivergent?.every((item: any) => {
    return selectedList.includes(String(item.id));
  });

  const handleToggleAllInvoices = () => {
    const idsList = data?.snapshotDivergent?.map((item: any) => {
      return String(item.id);
    });

    if (allSelected) {
      onRemoveSelecteds(idsList);
    } else {
      onSelectInvoices(idsList);
    }
  };

  const handleModal = useCallback(
    (item: any) => {
      setOpen((prev: boolean) => !prev);
      setElementDivergent(item);
    },
    [setOpen, setElementDivergent]
  );

  const Item = useCallback(
    ({ item }: any): JSX.Element => {
      const { id } = item;
      const isChecked = selectedList.some((check) => check === String(id));
      return (
        <S.Item status={item.status}>
          {!item?.justification[0] ? (
            <CheckboxRadix
              id={item.id}
              handleCheck={onToggleSelected}
              isChecked={isChecked}
            />
          ) : (
            <div></div>
          )}
          <p className="batch">{item?.batch ?? "---"}</p>
          <p>{item?.plant_code ?? "---"}</p>
          <p>
            {Number(item?.company_total_qty).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <TooltipItem
              items={[
                `Disponível: ${Number(item?.company_qty).toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}`,
                `Bloqueado: ${Number(item?.company_blocked_qty).toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}`,
                `Qualidade: ${Number(
                  item?.company_quality_insp_qty
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
                `Restrito: ${Number(
                  item?.company_restricted_qty
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              ]}
            />
          </p>
          <p>
            {Number(item?.warehouse_total_qty).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <TooltipItem
              items={[
                `Disponível: ${Number(item?.warehouse_qty).toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}`,
                `Bloqueado: ${Number(
                  item?.warehouse_blocked_qty
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              ]}
            />
          </p>
          <p>
            {Number(item?.company_total_blocked_qty).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <TooltipItem
              items={[
                `Bloqueado: ${Number(item?.company_blocked_qty).toLocaleString(
                  "pt-BR",
                  { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                )}`,
                `Qualidade: ${Number(
                  item?.company_quality_insp_qty
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
                `Restrito: ${Number(
                  item?.company_restricted_qty
                ).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              ]}
            />
          </p>
          <p>
            {Number(item?.warehouse_blocked_qty).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>
            {Number(item.diff_qty).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          <p>{item?.justification[0]?.name}</p>
          {/* <S.MessageButton isCheck={isChecked} onClick={() => handleModal(item)} disabled={true}> */}
          <S.MessageButton
            isCheck={isChecked}
            onClick={() => handleModal(item)}
          >
            <S.MessageIcon />
          </S.MessageButton>
        </S.Item>
      );
    },
    [selectedList]
  );

  const total =
    Math.abs(Number(data.totalDiffQty)) +
    Math.abs(Number(data.totalCompanyQty)) +
    Math.abs(Number(data.totalWarehouseQty));
  // total esta NaN se for 0
  return (
    <S.Container>
      <S.Product>
        <S.Title>
          <p>
            {data?.productCode} - {data?.productDescription}
          </p>
        </S.Title>
        <S.IndicatorContainer>
          <S.IndicatorContent>
            <p>
              {Number(data.totalDiffQty).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>SAP/WMS</p>
            <S.Indicator
              className="diff"
              width={Math.round(
                (Math.abs(Number(data.totalDiffQty)) * 100) / total
              )}
            />
          </S.IndicatorContent>
          <S.IndicatorContent>
            <p>
              {Number(data.totalCompanyQty).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>SAP</p>
            <S.Indicator
              className="company"
              width={Math.round(
                (Math.abs(Number(data.totalCompanyQty)) * 100) / total
              )}
            />
          </S.IndicatorContent>
          <S.IndicatorContent>
            <p>
              {Number(data.totalWarehouseQty).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <p>WMS</p>
            <S.Indicator
              className="warehouse"
              width={Math.round(
                (Math.abs(Number(data.totalWarehouseQty)) * 100) / total
              )}
            />
          </S.IndicatorContent>
        </S.IndicatorContainer>
      </S.Product>
      <S.Content>
        <S.Header>
          <CheckboxRadix
            id={99}
            handleCheck={handleToggleAllInvoices}
            isChecked={allSelected}
          />
          <p>{t("management.snapshot.divergencias.lote")}</p>
          <p>{t("management.snapshot.divergencias.planta")}</p>
          <p>{t("management.snapshot.divergencias.qtdSap")}</p>
          <p>{t("management.snapshot.divergencias.qtdWms")}</p>
          <p>{t("management.snapshot.divergencias.qtdBloqSap")}</p>
          <p>{t("management.snapshot.divergencias.qtdBloqWms")}</p>
          <p>{t("management.snapshot.divergencias.divergencia")}</p>
          <p>{t("management.snapshot.divergencias.justificativa")}</p>
        </S.Header>
        <S.ItemContainer>
          {data?.snapshotDivergent?.length
            ? data?.snapshotDivergent?.map((item: any, index: number) => (
                <Item item={item} key={index} />
              ))
            : ""}
        </S.ItemContainer>
      </S.Content>
    </S.Container>
  );
};

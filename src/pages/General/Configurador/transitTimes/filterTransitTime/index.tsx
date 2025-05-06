import React from "react";
import * as S from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useTranslation } from "react-i18next";
import { Carrier, SelectOption } from "contracts";
import { useDispatch } from "react-redux";
import { PaginateCarriersActions } from "store/ducks";
import { ModalFilter, ModalFilterRef } from "./modalFilter";

interface FilterProps {
  onFilter: (data: any) => void;
}

export const TransitTimeFilter = ({ onFilter }: FilterProps) => {
  const formRef = React.useRef<FormHandles>(null);
  const modalRef = React.useRef<ModalFilterRef>(null);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState<boolean>(false);
  const [filters, setFilters] = React.useState<any>(null);
  const [carrierOptions, setCarrierOptions] = React.useState<SelectOption[]>(
    []
  );

  const { t } = useTranslation();

  const handleModal = React.useCallback(() => setOpen((prev) => !prev), []);

  const onClear = React.useCallback(() => {
    formRef.current?.reset();
    modalRef.current?.resetFilterModal();
    setFilters(null);
    setOpen(false);
    onFilter({});
  }, []);

  const onChangeFilter = React.useCallback(
    (data: any) => {

      if (Object.entries(data).some(([_, value]) => value)) {
        const newFilter = {...filters, ...data };
      
        setFilters(newFilter);
        onFilter(newFilter);
        setOpen(false);
      }
    },
    [filters]
  );

  const getCarriers = React.useCallback(() => {
    dispatch(
      PaginateCarriersActions.request(
        { asList: true },
        (carriers: Carrier[]) => {
          setCarrierOptions(
            carriers.map(({ id, tradeName }) => ({
              label: tradeName,
              value: id,
            }))
          );
        }
      )
    );
  }, []);

  React.useEffect(() => {
    getCarriers();
  }, []);

  return (
    <>
      <S.Container>
        <Form
          ref={formRef}
          onSubmit={onChangeFilter}
          onReset={onClear}
          placeholder=""
        >
          <S.Select
            name="carrierId"
            placeholder={
              t("general.config.transitTimes.transportadora") + "..."
            }
            options={carrierOptions}
          />
          {filters && (
            <S.ButtonClear type="reset">
              <S.ClearIcon />
            </S.ButtonClear>
          )}
          <S.ButonsWrapper>
            <S.ButtonFilter type="button" onClick={handleModal} title="Filtrar">
              <S.FilterIcon />
            </S.ButtonFilter>
            <S.Button type="submit">
              <S.SearchIcon /> {t("general.config.transitTimes.buscar")}
            </S.Button>
          </S.ButonsWrapper>
        </Form>
      </S.Container>
      <ModalFilter
        ref={modalRef}
        isOpen={open}
        onClickOutside={handleModal}
        onModalFilter={onChangeFilter}
        onModalClear={onClear}
      />
    </>
  );
};

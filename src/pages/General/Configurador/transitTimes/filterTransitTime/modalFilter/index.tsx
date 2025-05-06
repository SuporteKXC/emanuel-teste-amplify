import React from "react";
import * as S from "./styles";
import { Modal, ModalProps } from "components";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { City, SelectOption } from "contracts";
import { STATES } from "constants/Selects";
import { useDispatch } from "react-redux";
import { ListCitiesActions } from "store/ducks";
import { typesOptions } from "../../updateTransitTime";
import { useTranslation } from "react-i18next";

interface ModalFilter extends ModalProps {
  onModalFilter: (data: any) => void;
  onModalClear: () => void;
}

export interface ModalFilterRef {
  resetFilterModal: () => void;
}

export const ModalFilter = React.forwardRef<ModalFilterRef, ModalFilter>(
  ({ onModalFilter, onSelectChange, onModalClear, isOpen, ...props }, ref) => {
    const modalRef = React.useRef<FormHandles>(null);
    const dispatch = useDispatch();

    const [citiesOrigin, setCitiesOrigin] = React.useState<SelectOption[]>([]);
    const [citiesDestiny, setCitiesDestiny] = React.useState<SelectOption[]>(
      []
    );

    const { t } = useTranslation();

    const getCities = React.useCallback((state: string, setState: any) => {
      dispatch(
        ListCitiesActions.request({ state, asList: true }, (cities: City[]) => {
          setState(
            cities.map(({ ibge, name }) => ({
              label: name,
              value: ibge,
            }))
          );
        })
      );
    }, []);

    const handleState = React.useCallback((newValue: any, meta: any) => {
      if (newValue && meta) {
        const selects: any = {
          stateOrigin: setCitiesOrigin,
          stateDestiny: setCitiesDestiny,
        };
        getCities(newValue.value, selects[meta.name]);
      }
    }, []);

    React.useImperativeHandle(ref, () => ({
      resetFilterModal: () => modalRef.current?.reset(),
    }));

    return (
      <Modal isOpen={isOpen}{...props}>
        <S.ModalContent style={{ maxWidth: "960px" }}>
          <S.ModalContainer>
            <S.ModalHeader>
              <S.FilterIcon /> {t("general.config.transitTimes.filtrarTransit")}
            </S.ModalHeader>
            <Form
              ref={modalRef}
              onSubmit={onModalFilter}
              onReset={onModalClear}
              placeholder=""
            >
              <S.FormRow>
                <S.Select
                  label={t("general.config.transitTimes.ufOrigem")}
                  name="stateOrigin"
                  options={STATES}
                  onChange={handleState}
                />
                <S.Select
                  label={t("general.config.transitTimes.cidadeOrigem")}
                  name="ibgeOrigin"
                  options={citiesOrigin}
                />
              </S.FormRow>
              <S.FormRow>
                <S.Select
                  label={t("general.config.transitTimes.ufDestino")}
                  name="stateDestiny"
                  options={STATES}
                  onChange={handleState}
                />
                <S.Select
                  label={t("general.config.transitTimes.cidadeDestino")}
                  name="ibgeDestiny"
                  options={citiesDestiny}
                />
              </S.FormRow>
              <S.FormRow>
                <S.Input
                  label={t("general.config.transitTimes.peso")}
                  name="weight"
                  type="number"
                  min="0"
                />
                <S.Select
                  label={t("general.config.transitTimes.tipo")}
                  name="type"
                  options={typesOptions}
                />
              </S.FormRow>
              <S.FormRow>
                <S.Input
                  label={t("general.config.transitTimes.prazoFracionado")}
                  name="deadlineFractional"
                  type="number"
                  min="0"
                />
                <S.Input
                  label={t("general.config.transitTimes.prazoLotacao")}
                  name="deadlineDedicated"
                  type="number"
                  min="0"
                />
              </S.FormRow>
              <S.ButtonsWrapper>
                <S.Button
                  type="button"
                  mood="light"
                  onClick={props.onClickOutside}
                >
                  {t("general.config.transitTimes.cancelar")}
                </S.Button>
                <S.Button type="reset" mood="danger">
                  {t("general.config.transitTimes.limparFiltro")}
                </S.Button>
                <S.Button type="submit">
                  {t("general.config.transitTimes.filtrar")}
                </S.Button>
              </S.ButtonsWrapper>
            </Form>
          </S.ModalContainer>
        </S.ModalContent>
      </Modal>
    );
  }
);

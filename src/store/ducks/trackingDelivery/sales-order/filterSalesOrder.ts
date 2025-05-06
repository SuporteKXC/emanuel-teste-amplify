import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { addDays, format, parseISO } from "date-fns";

const checkboxOptions = [
  { id: 'todas', label: 'Todas' },
  { id: 'pendente', label: 'Pendente' },
  { id: 'faturado', label: 'Faturado' },
  { id: 'em_transito', label: 'Em trânsito' },
  { id: 'entregue', label: 'Entregue' }
];

const serializeDate = (date: Date | undefined): string | undefined => {
  return date ? format(date, "yyyy-MM-dd") : undefined;
};

const { Types, Creators } = createActions(
    {
      setFilterData: ['data'],
      reset: [],
    },
    {
      prefix: 'SALES_ORDER_FILTER_',
    }
  );

export interface IFormFilter {
  orderReference: string;
  documentNumber: string;
  deliveryDocumentNumber: string;
  plantCode: string;
  sellType: string;
  justification: boolean;
  emissionDateStart: string | undefined;
  emissionDateEnd: string | undefined;
  deadlineDateStart: string | undefined;
  deadlineDateEnd: string | undefined;
  deliveryDateStart: string | undefined;
  deliveryDateEnd: string | undefined;
  carrierId: string;
  clientId: string;
  filterCount: number;
  [key: string]: string | Date | undefined | number | boolean;
}

export interface ISalesOrderFilter {
  statusFilter: Array<string>;
  formFilter: IFormFilter;
}

export const SalesOrderFilterTypes = Types;
export const SalesOrderFilterActions = Creators;

interface SalesOrderFilterState {
  data: ISalesOrderFilter;
}

interface SetFilterData {
  data: ISalesOrderFilter;
}

const INITIAL_STATE: SalesOrderFilterState = {
  data: {
    statusFilter: checkboxOptions.map((option) => option.id),
    formFilter: {
      carrierId: '',
      clientId: '',
      deadlineDateStart: serializeDate(addDays(new Date(), -31)),
      deadlineDateEnd: serializeDate(new Date()),
      deliveryDateStart: undefined,
      deliveryDateEnd: undefined,
      orderReference: '',
      justification: false,
      emissionDateStart: undefined,
      emissionDateEnd: undefined,
      filterCount: 0,
      documentNumber: '',
      deliveryDocumentNumber: '',
      plantCode: '',
      sellType: '',
    }
  }
};

const setFilterData = (state: SalesOrderFilterState, action: SetFilterData) => {
  const updatedState = update(state, {
    data: { $set: action.data },
  });

  // Atualiza filterCount com a contagem de filtros não padrão
  const excludePropertiesFromCount = [
    'emissionDateStart',
    'deliveryDateStart',
    'deadlineDateStart',
    'filterCount'
  ];

  const { formFilter } = action.data;

  const filterCount = Object.keys(formFilter).reduce((count, key) => {
    const initialValue = INITIAL_STATE.data.formFilter[key];
    const formFilterValue = formFilter[key];

    // Exclui propriedades específicas da contagem
    if (!excludePropertiesFromCount.includes(key) && initialValue !== formFilterValue) {
      // Verifica se a propriedade é do tipo Date e formata antes de comparar
      if (initialValue instanceof Date && formFilterValue instanceof Date) {
        const formattedInitialValue = format(initialValue, 'yyyy-MM-dd');
        const formattedFormFilterValue = format(formFilterValue, 'yyyy-MM-dd');
        if (formattedInitialValue !== formattedFormFilterValue) {
          return count + 1;
        }
      } else if (initialValue !== formFilterValue) {
        // Comparação padrão para outros tipos
        return count + 1;
      }
    }

    return count;
  }, 0);

  return update(updatedState, {
    data: {
      formFilter: {
        filterCount: { $set: filterCount },
      },
    },
  });
};

const reset = () => INITIAL_STATE;

export const salesOrderFilter = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});
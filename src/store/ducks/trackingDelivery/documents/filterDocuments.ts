import { createReducer, createActions } from "reduxsauce";
import update from "immutability-helper";
import { addDays, format, parseISO } from "date-fns";

const checkboxOptions = [
  { id: 'todas', label: 'Todas' },
  { id: 'sem_status', label: 'Sem Status' },
  { id: 'transito', label: 'Em trânsito' },
  { id: 'transito_atraso', label: 'Trânsito com atraso' },
  { id: 'entregue', label: 'Entregue' },
  { id: 'cancelado', label: 'Canceladas' },
  { id: 'devolucao', label: 'Devolução' },
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
      prefix: 'DOCUMENTS_FILTER_',
    }
  );

export interface IFormFilter {
  documentNumber: string;
  emissionDateStart: string | undefined;
  emissionDateEnd: string | undefined;
  deadlineDateStart: string | undefined;
  deadlineDateEnd: string | undefined;
  deliveryDateStart: string | undefined;
  deliveryDateEnd: string | undefined;
  originCity: string;
  destinationCity: string;
  carrierId: string;
  clientId: string;
  filterCount: number;
  [key: string]: string | Date | undefined | number;
}

export interface IDocumentsFilter {
  statusFilter: Array<string>;
  formFilter: IFormFilter;
}

export const DocumentsFilterTypes = Types;
export const DocumentsFilterActions = Creators;

interface DocumentsFilterState {
  data: IDocumentsFilter;
}

interface SetFilterData {
  data: IDocumentsFilter;
}

const INITIAL_STATE: DocumentsFilterState = {
  data: {
    statusFilter: checkboxOptions.map((option) => option.id),
    formFilter: {
      carrierId: '',
      clientId: '',
      deadlineDateStart: undefined,
      deadlineDateEnd: undefined,
      deliveryDateStart: undefined,
      deliveryDateEnd: undefined,
      originCity: '',
      destinationCity: '',
      documentNumber: '',
      emissionDateStart: serializeDate(addDays(new Date(), -31)),
      emissionDateEnd: serializeDate(new Date()),
      filterCount: 0,
    }
  }
};

const setFilterData = (state: DocumentsFilterState, action: SetFilterData) => {
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

export const documentsFilter = createReducer(INITIAL_STATE, {
    [Types.SET_FILTER_DATA]: setFilterData,
    [Types.RESET]: reset,
});
import type { SelectOption } from 'contracts/Common';

const DOCUMENT_TYPES: SelectOption[] = [
  {
    value: 'cnpj',
    label: 'Pessoa Jurídica',
  },
  {
    value: 'cpf',
    label: 'Pessoa Física',
  },
  {
    value: 'other',
    label: 'Estrangeiro',
  },
];

const STATUS: SelectOption[] = [
  {
    value: 'pendente',
    label: 'Pendente',
  },
  {
    value: 'contagem',
    label: 'Contagem',
  },
  {
    value: 'separacao',
    label: 'Separação',
  },
  {
    value: 'finalizado',
    label: 'Finalizado',
  },
  {
    value: 'cancelado',
    label: 'Cancelado',
  },
];

export const SelectOptions = {
  DOCUMENT_TYPES,
  STATUS,
};

export const FORM_BACK_ACTION = 'Voltar';
export const MODAL_DISMISS_ACTION = 'Fechar';
export const EMPTY_COLUMN_VALUE = '---';

import type { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FormPageHeader, Input } from 'components/Shared';
import { useValidation } from 'hooks';
import {
  forwardRef,
  ForwardRefExoticComponent,
  RefAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { CreateOrderEmailValidator } from 'validators/StockOrderEmails';

import * as S from './styles';

export interface Ref {
  getEmails: () => Array<string>;
  addEmail: (email: string) => void;
}

interface Props {}

interface IOrderEmails
  extends ForwardRefExoticComponent<Props & RefAttributes<Ref>> {}

const OrderEmails: IOrderEmails = forwardRef<Ref, Props>((props, ref) => {
  const [listEmails, setListEmails] = useState<Array<string>>([]);
  const formRef = useRef<FormHandles>(null);
  const { handleFormErrors } = useValidation();
  const [createMode, setCreateMode] = useState<boolean>(false);

  const onAddEmail = useCallback(
    (email: string) => {
      setListEmails((oldEmails) => {
        const exist = oldEmails.some((old)=> old === email);
        return exist ? oldEmails : [...oldEmails, email];
      });
    },
    [setListEmails, listEmails]
  );

  const onRemoveEmail = useCallback(
    (email: string) => {
      setListEmails((old) => {
        const newList = old.filter((el) => el !== email);
        return newList;
      });
    },
    [setListEmails, listEmails]
  );

  const onSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const { schema } = new CreateOrderEmailValidator();

        await schema.validate(data, {
          abortEarly: false,
        });

        onAddEmail(data.email);
        setCreateMode(() => false);
        return formRef.current?.reset();
      } catch (error) {
        handleFormErrors(error, formRef);
      }
    },
    [handleFormErrors, onAddEmail]
  );

  useImperativeHandle(
    ref,
    () => ({
      getEmails: () => {
        return listEmails;
      },
      addEmail: onAddEmail,
    }),
    [listEmails, onAddEmail]
  );

  return (
    <S.Panel>
      <S.Container>
        <FormPageHeader title="Enviar Para:" />
      </S.Container>

      {!!listEmails.length &&
        listEmails.map((email: string) => {
          return (
            <S.ListContainer>
              <p>{email}</p>
              <S.ActionButton
                mood="danger"
                onClick={() => onRemoveEmail(email)}
              >
                <S.TrashIcon />
              </S.ActionButton>
            </S.ListContainer>
          );
        })}

      {createMode && (
        <S.Container>
          <Form ref={formRef} onSubmit={onSubmit}>
            <S.FormRow>
              <Input name="email" label="E-mail" />
              <S.Button type="submit">Salvar</S.Button>
              <S.Button
                onClick={() => {
                  setCreateMode(() => false);
                }}
                mood="light"
              >
                Cancelar
              </S.Button>
            </S.FormRow>
          </Form>
        </S.Container>
      )}

      {!createMode && (
        <S.Container>
          <S.AddBtnContainer>
            <S.Button
              onClick={() => {
                setCreateMode(() => true);
              }}
            >
              Adicionar
            </S.Button>
          </S.AddBtnContainer>
        </S.Container>
      )}
    </S.Panel>
  );
});

export default OrderEmails;

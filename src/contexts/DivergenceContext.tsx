import { ReactNode, createContext, useCallback, useState } from "react";

export type ModalTypes = "justificativas";

interface DivergenceContextType {
  selectedList: string[];
  openedModal: ModalTypes | null;
  onSelectInvoices: (props: string[]) => void;
  onRemoveSelecteds: (props: string[]) => void;
  onToggleSelected: (props: string) => void;
  changeOpenModal: (type?: ModalTypes) => void;
  onClear: (type?: ModalTypes) => void;
}

interface DivergenceProps {
  children: ReactNode;
}

export const DivergenceContext = createContext({} as DivergenceContextType);

export const DivergenceContextProvider = ({ children }: DivergenceProps) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<ModalTypes | null>(null);
  const onClear = useCallback(() => setSelectedList([]), []);
  const onRemoveSelecteds = useCallback((ids: string[]) => {
    setSelectedList((prev) => prev.filter((item) => !ids.includes(item)));
  }, []);

  const onSelectInvoices = useCallback((items: string[]) => {
    setSelectedList((prev) => {
      return [...prev, ...items.filter((item) => !prev.includes(item))];
    });
  }, []);

  const onToggleSelected = useCallback(
    (select: any) => {
      const { value } = select.target;
      setSelectedList((prev) => {
        const hasOnList = prev.find((item) => item === value);

        if (hasOnList) {
          return prev.filter((item) => item !== value);
        }

        return [...prev, value];
      });
    },
    [selectedList]
  );

  const changeOpenModal = useCallback(
    (type?: ModalTypes) => setShowModal(type ? type : null),
    []
  );

  return (
    <DivergenceContext.Provider
      value={{
        onSelectInvoices,
        onRemoveSelecteds,
        onToggleSelected,
        changeOpenModal,
        openedModal: showModal,
        selectedList,
        onClear
      }}
    >
      {children}
    </DivergenceContext.Provider>
  );
};

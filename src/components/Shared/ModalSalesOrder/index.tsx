import {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch } from "react-redux";
import { SalesOrderShowActions } from "@/store/ducks/trackingDelivery/sales-order";

import { RootState } from "store";
import { useSelector } from "react-redux";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import HeaderCards from "./HeaderCards";
import { DetailsTab, JustificationsTab, DeliveryTab, ProductTab } from "./Tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

type ModalShowSalesOrderProps = {
  salesOrder: any;
  onClose: any;
  updateList: () => void;
};

export type ModalShowSalesOrderHandles = {
  open: () => void;
  close: () => void;
};

const ModalShowSalesOrder: ForwardRefRenderFunction<
  ModalShowSalesOrderHandles,
  ModalShowSalesOrderProps
> = ({ salesOrder, onClose,updateList }, ref) => {
  const id = salesOrder?.id;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const base = "salesOrder.drawer.tabs";

  const dispatch = useDispatch();

  const { data, loading } = useSelector(
    (state: RootState) => state.salesOrderShow
  );

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close: () => {
        setIsOpen(false)}
    }),
    []
  );

  const closeModal = () => {
    updateList() 
    onClose(false);
  };

  const showSalesOrderHandle = () => {
    dispatch(SalesOrderShowActions.request(id));
  };

  useEffect(() => {
    showSalesOrderHandle();
  }, [id]);

  return (
    <Drawer
      open={isOpen}
      onClose={closeModal}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DrawerContent className="flex w-screen h-4/5 items-center px-[5%] z-50 flex-col">
        <ScrollArea>
          {loading && !data ? (
            <div>Carregando...</div>
          ) : (
            <>
              <HeaderCards salesOrder={data} />
              <Tabs
                defaultValue="details"
                className="w-[100%] mt-5 h-[70%] flex flex-col justify-center"
              >
                <TabsList className="w-[100%] p-0 px-1 flex justify-start">
                  <TabsTrigger value="details" className="text-base px-10">
                    {t(`${base}.detalhes`)}
                  </TabsTrigger>
                  <TabsTrigger
                    value="justification"
                    className="text-base px-10"
                  >
                    {t(`${base}.justificativa`)}
                  </TabsTrigger>
                  <TabsTrigger value="delivery" className="text-base px-10">
                    {t(`${base}.entrega`)}
                  </TabsTrigger>
                  {
                  data?.document_id ? 
                  <TabsTrigger value="product" className="text-base px-10">
                    {t(`${base}.produto`)}
                  </TabsTrigger>
                  : <></>
                  }
                </TabsList>

                <TabsContent value="details">
                  <DetailsTab salesOrder={data} />
                </TabsContent>

                <TabsContent value="justification">
                  <JustificationsTab salesOrder={data} />
                </TabsContent>

                <TabsContent value="delivery">
                  <DeliveryTab salesOrder={data} />
                </TabsContent>

                <TabsContent value="product">
                  <ProductTab salesOrder={data} />
                </TabsContent>
              </Tabs>
            </>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};

export default forwardRef(ModalShowSalesOrder);

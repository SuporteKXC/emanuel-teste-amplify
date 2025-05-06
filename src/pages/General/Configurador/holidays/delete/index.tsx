import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/ButtonGs";
import { DeleteUserActions } from "store/ducks";
import type { AppDispatch } from "store";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { HolidayApi } from "@/queries/Holidays";

const Delete: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {mutate, isPending} = useMutation({
    mutationFn: ()=>HolidayApi.deleteHoliday(parseInt(id!)),
    mutationKey: ["delete-holiday"],
  })
  const goBack = () => {
    navigate("/config/holidays");
  };

  return (
    <section className="w-full h-screen items-center justify-center">
      <Dialog open={!!id} onOpenChange={() => goBack()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3 tracking-wide">
              Você tem absoluta certeza dessa exclusão?
            </DialogTitle>
            <DialogDescription className="font-sans !mb-4">
              Está é uma ação irreversível, caso você tenha certeza que deseja
              excluir o feriado, clique no botão{" "}
              <span className="font-bold">confirmar</span>. Caso contrário,
              clique no botão <span className="font-bold">cancelar</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button.Root size="sm" variant="secondary" onClick={() => goBack()}>
              Cancelar
            </Button.Root>
            <Button.Root
              size="sm"
              variant="danger"
              disabled={isPending}
              onClick={() => (mutate())}
            >
              Confirmar
            </Button.Root>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Delete;
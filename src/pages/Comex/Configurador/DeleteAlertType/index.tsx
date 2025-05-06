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
import { DeleteAlertTypeActions } from "store/ducks";
import type { AppDispatch } from "store";
import { useDispatch } from "react-redux";

export const DeleteAlertType: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCancel = () => {
    navigate("/config/alert-types");
  };

  const handleConfirm = useCallback(() => {
    dispatch(
      DeleteAlertTypeActions.request(id, () => navigate("/config/alert-types"))
    );
  }, []);

  return (
    <section className="w-full h-screen items-center justify-center">
      <Dialog open={!!id} onOpenChange={() => handleCancel()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3 tracking-wide">
              Você tem absoluta certeza dessa exclusão?
            </DialogTitle>
            <DialogDescription className="font-sans !mb-4">
              Está é uma ação irreversível, caso você tenha certeza que deseja
              excluir, clique no botão{" "}
              <span className="font-bold">confirmar</span>. Caso contrário,
              clique no botão <span className="font-bold">cancelar</span>.
            </DialogDescription>
            <DialogFooter>
              <Button.Root
                size="sm"
                variant="secondary"
                onClick={() => handleCancel()}
              >
                Cancelar
              </Button.Root>
              <Button.Root
                size="sm"
                variant="danger"
                onClick={() => handleConfirm()}
              >
                Confirmar
              </Button.Root>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  );
};

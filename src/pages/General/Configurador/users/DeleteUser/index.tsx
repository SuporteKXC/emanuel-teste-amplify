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

export const DeleteUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const goBack = () => {
    navigate("/config/users");
  };

  const handleConfirm = useCallback(() => {
    dispatch(DeleteUserActions.request(id, () => goBack()));
  }, [dispatch, id, navigate]);

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
              excluir o usuário, clique no botão{" "}
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
              onClick={() => handleConfirm()}
            >
              Confirmar
            </Button.Root>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

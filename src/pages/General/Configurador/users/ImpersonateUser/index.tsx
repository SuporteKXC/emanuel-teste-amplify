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
import { ImpersonateActions } from "store/ducks";
import type { AppDispatch, RootState } from "store";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "@/styles/components";

export const ImpersonateUser: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {loading} = useSelector((state: RootState) => {
    return state.impersonate
  })

  const goBack = () => {
    navigate("/");
  };

  const onSuccess = useCallback(() => {
    dispatch(ImpersonateActions.reset());
    navigate("/");
  }, [history, dispatch]);

  const handleConfirm = useCallback(() => {
    console.log(id);
    dispatch(ImpersonateActions.request({ id }, () => goBack(),()=>{}));
  }, [dispatch, id, navigate]);

  return (
    <section className="w-full h-screen items-center justify-center">
      <Dialog open={!!id} onOpenChange={() => goBack()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3 tracking-wide">
              Logar como outro usuário?
            </DialogTitle>
            <DialogDescription className="font-sans !mb-4">
              Caso você tenha certeza que deseja logar como outro usuário,
              clique no botão <span className="font-bold">confirmar</span>. Caso
              contrário, clique no botão{" "}
              <span className="font-bold">cancelar</span>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button.Root size="sm" variant="secondary" onClick={() => goBack()}>
              Cancelar
            </Button.Root>
            <Button.Root
              size="sm"
              disabled={loading}
              variant="primary"
              onClick={() => handleConfirm()}
            >
              {loading ? <ActivityIndicator/> : "Confirmar"}
            </Button.Root>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

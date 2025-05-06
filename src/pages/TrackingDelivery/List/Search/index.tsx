import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import InvoiceSearchForm from "./Form/form";

export const SearchNF: React.FC = () => {

  return (
    <div className="flex items-center justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <span className="absolute px-2 py-1 m-0 text-xs rounded-lg cursor-pointer right-6 bg-primary w-fit text-primary-foreground">
            Pesquisar Nota Fiscal
          </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-lg font-GilroySemibold">
            Pesquise pelo número e série da Nota Fiscal
          </DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <InvoiceSearchForm />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { ExportTopPanel } from "@/layouts/TopPanels/ExportTopPainel";

type Props = {
  children: React.ReactNode;
};

export const ExportLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <ExportTopPanel />
      <section className="py-6 flex flex-col gap-6">{children}</section>
    </>
  );
};

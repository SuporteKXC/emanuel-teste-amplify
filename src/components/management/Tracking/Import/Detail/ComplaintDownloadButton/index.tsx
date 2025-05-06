import React, { useState } from "react";
import * as S from "./styles";
import { apiStocks, notify } from "services";

type ComplaintDownloadButtonProps = {
  label: string;
  complaintId: number | string;
  loadingText?: string;
};

export const ComplaintDownloadButton = ({
  label,
  complaintId,
  loadingText,
}: ComplaintDownloadButtonProps): JSX.Element => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      const res = await apiStocks.get(
        `/complaint/pdf-download?complaint=${complaintId}`,
        {
          responseType: "blob",
        }
      );

      const data = res.data;

      const blob = new Blob([data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `Relatório não conformidade - ${new Date().toLocaleDateString()}.pdf`;
      a.click();
      a.remove();
      setTimeout(() => window.URL.revokeObjectURL(url), 100);
    } catch (error) {
      notify("error", "Oops! não foi possível fazer o download do pdf.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PDFButton disabled={loading} onClick={handleClick}>
      {loading ? loadingText || "Aguarde..." : label}
    </S.PDFButton>
  );
};

import React, { useState } from "react";
import { Skeleton } from "./Skeleton";
type RenderVoucherProps = {
  fileName: string | undefined;
  fileData: string | null;
  isLoading: boolean;
};
export const RenderVoucher: React.FC<RenderVoucherProps> = ({
  fileName,
  fileData,
  isLoading,
}) => {
  const [zoom, setZoom] = useState(100);

  if (isLoading) return <Skeleton />;
  if (!fileName) {
    return (
      <div>
        <p>Erro ao fazer o download do arquivo</p>
      </div>
    );
  }
  if (!fileData) {
    return (
      <div>
        <p>Erro ao fazer o download do arquivo</p>
      </div>
    );
  }

  const fileExtension = fileName.split(".").pop();
  if (
    fileExtension === "png" ||
    fileExtension === "jpg" ||
    fileExtension === "jpeg"
  ) {
    return (
      <div className="w-full">
        <div className="w-full h-[500px] overflow-auto bg-slate-100">
          <img
            src={fileData}
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
              display: "block",
              objectFit: "contain",
            }}
          />
        </div>
        <div className="w-full flex justify-end">
          <span className="mr-2">{`Zoom: ${zoom}`}%</span>
          <input
            type="range"
            min="100"
            max="200"
            value={zoom}
            onChange={(e) => {
              setZoom(parseInt(e.target.value));
            }}
            className="w-36"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] overflow-y-auto bg-slate-100">
      <embed
        src={fileData}
        type="application/pdf"
        width="100%"
        height="500px"
      />
    </div>
  );
};

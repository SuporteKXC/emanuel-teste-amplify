import React, { useEffect, useState } from "react";

import * as S from "./styles";
import { apiStocks } from "@/services";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadCloud } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";

type ComplaintImageProps = {
  image: any;
  removeImage: (image: any) => void;
};

const ComplaintImage = ({ removeImage, image }: ComplaintImageProps) => {
  const [uri, setUri] = useState<string>("");
  const checkTypeImage = new RegExp(/^(jpg|jpeg|png)$/i);
  const getSignedImage = async () => {
 
    const { data } = await apiStocks.get(
      `complaint/signed-download?fileKey=${image.fileKey}`
    );

    if ("urlSigned" in data) {
      setUri(data.urlSigned);
    }
  };

  useEffect(() => {
    if (image) {
      getSignedImage();
    }
  }, [image]);

  function shortNameFile (name: string) {
    if(name && name.length > 15) {
     return `${name.substring(0, 10)}...`
    }
    return name
  }

  async function downloadFile() {
    const response = await fetch(uri)

    if(!response.ok) {
      throw new Error(`Erro ao baixar arquivo: ${response.statusText}`)
    }

    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = blobUrl
    a.download = image.name
    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    window.URL.revokeObjectURL(blobUrl)
    
  }

  if(!checkTypeImage.test(image.type)) {
    return (
      <S.ImageItem>
        <S.ImageRemove onClick={() => removeImage(image)} />
          <div className="bg-gray-200 p-4 rounded-md flex justify-center items-center">
            <div className="flex flex-row gap-2 items-center justify-center">
              <DownloadCloud size={21} className="hover:opacity-80 cursor-pointer text-blue-500" onClick={downloadFile}/>
              <span className="text-sm">{`${shortNameFile(image.name)}.${image.type}`}</span>
          
            </div>
          </div>
    </S.ImageItem>
    )
  }

  return (
    <>
      {uri && (
        <S.ImageItem>
          <S.ImageRemove onClick={() => removeImage(image)} />
          <img src={uri} width={100} height={100} />
        </S.ImageItem>
      )}
      {!uri && (
        <S.ImageItem>
          <Skeleton>
            <S.SkeletonImg />
          </Skeleton>
        </S.ImageItem>
      )}
    </>
  );
};

export default ComplaintImage;

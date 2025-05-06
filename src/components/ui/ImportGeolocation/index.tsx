import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Button } from "../button";
import { Sheet, Upload, File } from "lucide-react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useCallback, useRef } from "react";
import { notify } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  GeolocationCreateActions,
  GeolocationCreateState,
} from "@/store/ducks/trackingDelivery/geolocation/geolocation-create";
import { useTranslation } from "react-i18next";
import { Loading } from "@/components/shared/Forms/Input/styles";
import { Link } from "react-router-dom";


const PUBLIC_GEOLOCATION_FILE_URL = "https://docs.google.com/spreadsheets/d/1CgrNVpEeo2VAJYTtciUsjB7mBcWiyyqJ/export?format=xlsx";

const dropzoneConfig: DropzoneOptions = {
  accept: {
    "application/vnd.ms-excel": [".xls", ".xlsx"],
  },
  multiple: false,
  maxFiles: 1,
  maxSize: 5e7,
};

type ImportGeolocationProps = {
  refetchData: () => void
}

const ImportGeolocation = ({refetchData}: ImportGeolocationProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
    useDropzone(dropzoneConfig);


  const { loading, data } = useSelector<RootState, GeolocationCreateState>(
    (state) => state.geolocationCreate
  );

  const renderAcceptedFiles = () => {
    if (acceptedFiles.length === 0) return <></>;
    return acceptedFiles.map((file: any, index: number) => {
      return (
        <div
          className="w-full flex items-center justify-between"
          key={index.toString()}
        >
          <div className="name flex items-center gap-2 text-sm">
            <File size={16} />
            {file.name}
          </div>

          <div className="size text-sm">{`${file.size} bytes`}</div>
        </div>
      );
    });
  };

  const renderRejectedFiles = () => {
    if (fileRejections.length === 0) return <></>;
    return fileRejections.map((fileRejected: any, index: number) => {
      return (
        <div className="w-full flex flex-col gap-2" key={index.toString()}>
          <div
            key={fileRejected.file.name}
            className="w-full flex items-center justify-between"
          >
            <File size={16} />
            <p className="text-sm">{fileRejected.file.name}</p>
          </div>
          <div className="text-sm text-red-600">
            {fileRejected.errors[0].message}
          </div>
        </div>
      );
    });
  };

  const renderResponseLength = useCallback(() => {
    if (data) {
      return (
        <div className="w-full flex flex-col gap-2">
          <span className="text-sm text-green-500">{`${t(
            "trackingDelivery.geolocation.sucess"
          )} (${data.items_success ?? 0})`}</span>
          <span className="text-sm text-red-500">{`${t(
            "trackingDelivery.geolocation.error"
          )} (${data.erros?.length})`}</span>
        </div>
      );
    }
  }, [data]);

  const renderResponseError = useCallback(() => {
    if (data) {
      return data?.erros?.map((item: any, index: number) => {
        return (
          <div className="flex flex-col" key={index.toString()}>
            <div className="flex items-center gap-2">
              <File size={16} />
              <p className="text-sm">{item?.geolocation?.chave_nf}</p>
            </div>
            <div className="text-sm text-red-600">{item?.error}</div>
          </div>
        );
      });
    }
  }, [data]);

  const popItems = useCallback(() => {
    const acceptedFilesLength = acceptedFiles.length;
    const fileRejectionsLength = fileRejections.length;
    for (let index = 0; index < acceptedFilesLength; index++) {
      acceptedFiles.pop();
    }
    for (let index = 0; index < fileRejectionsLength; index++) {
      fileRejections.pop();
    }
  }, [acceptedFiles, fileRejections]);

  const onCloseModal = (open: boolean) => {
    if(!open) {
      popItems();
      dispatch(GeolocationCreateActions.reset());
      refetchData()
    }
   
  };

  const onSuccess = () => {
    popItems();
  };

  const onFailure = () => {
    notify('error', t("trackingDelivery.geolocation.importError"))
  }

  const handleSubmit = useCallback(async () => {
    if (acceptedFiles.length === 0) {
      return notify("error", "Nenhum arquivo foi selecionado");
    }

    const totalSize = acceptedFiles.reduce((acc: number, file: any) => {
      return acc + file.size;
    }, 0);

    if (totalSize > 5e7) {
      return notify("error", "O tamanho total dos arquivos é maior que 50MB");
    }

    const convertFileToBase64 = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const postData = {
      provider: "iff_comex",
      base64: "",
    };

    const processFiles = async () => {
      const base64File = (await convertFileToBase64(
        acceptedFiles[0]
      )) as string;
      const base64FileFinal = base64File.split("base64,");
      base64FileFinal.shift();
      base64FileFinal.join();
      postData.base64 = base64FileFinal[0];
    };
    await processFiles();

    dispatch(GeolocationCreateActions.request(postData, onSuccess, onFailure));
  }, [acceptedFiles, dispatch, onSuccess, onFailure]);


  return (
    <Dialog onOpenChange={onCloseModal}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-full md:max-w-max h-8 font-GilroySemibold lg:flex bg-green-600 text-white hover:bg-green-500 hover:text-white duration-300"
          size="sm"
        >
          <Sheet className="mr-2 h-4 w-4" />
          {t("trackingDelivery.geolocation.adicionarGeolocation")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("trackingDelivery.geolocation.adicionarGeolocation")}
          </DialogTitle>
          <Link className="w-max btn btn-primary" to={PUBLIC_GEOLOCATION_FILE_URL} target="_blank" rel="nofollow" download>
            <Button className="w-max" size='sm'>
            {t("trackingDelivery.geolocation.baixarModelo")}
            </Button>
          </Link>
        </DialogHeader>
        <div
          className="flex justify-center items-center h-20 gap-4 p-4 border border-dashed rounded-sm border-gray-500 cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-muted-foreground text-sm">
            {t("trackingDelivery.geolocation.placeholder")}
          </p>
        </div>
        <div className="w-full">
          {renderRejectedFiles()}
          {renderAcceptedFiles()}
          {renderResponseLength()}
          {renderResponseError()}
        </div>

        <DialogFooter>
          <div className="w-full flex flex-row justify-between items-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="geolocation-close"
            
              >
                {t("trackingDelivery.geolocation.fechar")}
              </Button>
            </DialogClose>
            {acceptedFiles.length > 0 && (
              <Button
                type="button"
                className="gap-2"
                size="sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loading />}
                <Upload size={16} />
                {t("trackingDelivery.geolocation.importar")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportGeolocation;
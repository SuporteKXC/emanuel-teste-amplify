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
import { Sheet, Upload, File, FileCode, Check, X, ShieldX, FileMinus2 } from "lucide-react";
import { useDropzone, DropzoneOptions, FileRejection } from "react-dropzone";
import { useCallback, useEffect, useRef, useState } from "react";
import { notify } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  InvoiceCreateActions,
  InvoiceCreateState,
} from "@/store/ducks/trackingDelivery/invoice/invoice-create";
import { useTranslation } from "react-i18next";
import { Loading } from "@/components/shared/Forms/Input/styles";

const dropzoneConfig: DropzoneOptions = {
  accept: {
    "text/xml": [".xml"],
  },
  multiple: true,
  maxFiles: 25
};

const ImportInvoice = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const closeBtnModalRef = useRef<HTMLButtonElement | null>(null);

  const { loading, data } = useSelector<RootState, InvoiceCreateState>(
    (state) => state.invoiceCreate
  );


  const [files, setFiles] = useState<File[]>([])
  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {

    if(fileRejections.length > 0) return 

    const filterFile = acceptedFiles.filter(af => {
     const check = files.findIndex(f => f.name === af.name)
      if(check === -1) return af

    })

    setFiles([...files,  ...filterFile])
  }, [files])



  const { acceptedFiles, getRootProps, getInputProps, fileRejections  } =
    useDropzone({
      ...dropzoneConfig,
      onDrop: onDrop
    });

    const onRemoveFile = (file: File) => {
      const index = files.findIndex(f => f === file)

      const copyFile = [...files]
      copyFile.splice(index, 1)
      setFiles(copyFile)

    }

  const renderAcceptedFiles = () => {
    if (files.length === 0) return <></>;

    return files.map((file: any, index: number) => {
      return (
        <div
          className="w-full flex items-center justify-between"
          key={index.toString()}
        >
          {}
          <div className="name flex items-center gap-2 text-sm">
            <File size={16} />
            {!file.name ? '' : file.name.length > 20 ? `${file.name.substring(0, 10)}[...]${file.name.substring(file.name.length - 4, file.name.length)}` : file.name }
            <FileMinus2 size={16} className="text-red-600 cursor-pointer hover:scale-150 transition-all" onClick={() => onRemoveFile(file)}/>
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
            className="w-full flex items-center gap-2 text-red-600"
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


  const onCloseModal = useCallback(() => {
    const acceptedFilesLength = files.length;
    const fileRejectionsLength = fileRejections.length;
    for (let index = 0; index < acceptedFilesLength; index++) {
      setFiles([])
      acceptedFiles.pop()
    }
    for (let index = 0; index < fileRejectionsLength; index++) {
      fileRejections.pop();
    }
    dispatch(InvoiceCreateActions.reset());
  }, [acceptedFiles, files, fileRejections]);

  const onSuccess = (response: any) => {

    if(response) {
      const hasCreated = Object.values(response).every(item => item !== 0)

      if(hasCreated) {
        notify("success", "Nota importada com sucesso!")
      }
    }

  };

  const onFailure = () => {
    notify("error", "Não foi possível importar nota!")
    closeBtnModalRef.current?.click();
  };

  const handleSubmit = useCallback(async () => {
    if (files.length === 0) {
      return notify("error", "Nenhum arquivo foi selecionado");
    }

    const formData = new FormData()

    for(const file in files) {
      formData.append("xml[]",  files[file])
    }

  
    dispatch(InvoiceCreateActions.request(formData, onSuccess, onFailure));
    
  }, [files, dispatch, onSuccess]);


  
  return (
    <Dialog onOpenChange={(open) => {
     if(!open) {
      onCloseModal()
     }
    }}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full max-w-full md:max-w-max h-8 font-GilroySemibold lg:flex bg-green-600 text-white hover:bg-green-500 hover:text-white duration-300"
          size="sm"
        >
          <FileCode className="mr-2 h-4 w-4" />
          {t("trackingDelivery.nfsImport.adicionarNota")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
         
            {t("trackingDelivery.nfsImport.adicionarNota")}
          </DialogTitle>
        </DialogHeader>
        <div
          className="flex justify-center items-center h-20 gap-4 p-4 border border-dashed rounded-sm border-gray-500 cursor-pointer"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p className="text-muted-foreground text-sm">
          {t("trackingDelivery.nfsImport.placeholder")}
          </p>
        </div>
        <div className="w-full">
          {renderRejectedFiles()}
          {renderAcceptedFiles()}
          {data && 
          <div className="flex flex-col mt-2  font-bold text-xs">
            <div className="flex gap-1 items-center">
              <span>Transportadora:</span>
              <span> {data.xmlNfesWithCarrier > 0 ? <Check size={16}  className="text-green-600" /> : <X size={16} className="text-red-600"/> } </span>
            </div>
            <div className="flex  gap-1 items-center">
              <span>Empresa:</span>
              <span> {data.xmlNfesWithCompany > 0 ? <Check size={16}  className="text-green-600" /> : <X size={16} className="text-red-600"/> } </span>
            </div>
            <div className="flex gap-1 items-center">
              <span>Cliente:</span>
              <span> {data.xmlNfesWithClient > 0 ? <Check size={16}  className="text-green-600" /> : <X size={16} className="text-red-600"/> } </span>
            </div>
            <div className="flex  gap-1 items-center">
              <span>Nota criada:</span>
              <span> {data.xmlNfescreated > 0 ? <Check size={16}  className="text-green-600" /> : <X size={16} className="text-red-600"/> } </span>
            </div>
          </div>}
          
        </div>

        <DialogFooter>
          <div className="w-full flex flex-row justify-between items-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                className="geolocation-close"
                ref={closeBtnModalRef}
        
              >
                {t("trackingDelivery.nfsImport.fechar")}
              </Button>
            </DialogClose>
            {files.length > 0 && !data && (
              <Button
                type="button"
                className="gap-2"
                size="sm"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading && <Loading />}
                <Upload size={16} />
                {t("trackingDelivery.nfsImport.importar")}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportInvoice;
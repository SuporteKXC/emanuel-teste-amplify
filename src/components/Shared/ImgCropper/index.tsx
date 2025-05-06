import { Modal, CloseButton } from 'components/Shared/Modal';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import { Area, Point } from 'react-easy-crop/types';
import { notify } from 'services';
import { EasyCropperHelper, FileHelper } from 'utils';
import * as S from './styles';

interface Props {
  preview?: string | null;
  label?: string;
  helpText?: string;
  onChange?: (file: File) => void;
}

const MIN_WIDTH = 320;
const MIN_HEIGHT = 320;

export const ImgCropper: React.FC<Props> = ({
  preview = null,
  label,
  helpText,
  onChange,
}) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(preview);
  const [imageSrc, setImageSrc] = useState<string>();
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const [zoom, setZoom] = useState(2);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'preview' | 'crop'>('crop');

  const onModalOpen = useCallback((): void => {
    if (!imagePreview) {
      inputFileRef?.current?.click();
    }
    if (imagePreview) {
      setModalMode('preview');
      setModalOpen(true);
    }
  }, [imagePreview]);

  const onModalClose = useCallback((): void => {
    setImageSrc(undefined);
    setModalOpen(false);
    setZoom(2);
  }, []);

  const validateImageDimensions = useCallback(
    (image: HTMLImageElement): Promise<void> => {
      return new Promise((resolve, reject) => {
        image.addEventListener('load', function () {
          if (image.width < MIN_WIDTH || image.height < MIN_HEIGHT) {
            reject(
              new Error(
                `A imagem deve ter ao menos ${MIN_WIDTH}px por ${MIN_HEIGHT}px`
              )
            );
          }
          resolve();
        });
      });
    },
    []
  );

  const onFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      try {
        const file = e.target.files?.[0];

        const isValid =
          typeof file?.type === 'string' && file.type.includes('image');

        if (!isValid) {
          throw new Error('Selecione uma imagem válida');
        }

        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);

        await validateImageDimensions(img);

        const src = await FileHelper.fileToUrl(file);
        setImageSrc(src);
        setModalMode('crop');
        setModalOpen(true);
      } catch (error: any) {
        notify('error', error?.message);
      } finally {
        const ref = inputFileRef.current;
        if (ref) {
          ref.value = '';
        }
      }
    },

    [validateImageDimensions]
  );

  const onZoomChange = useCallback((zoom: number): void => setZoom(zoom), []);

  const onCropChange = useCallback((crop: Point): void => {
    setCrop(crop);
  }, []);

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area): void => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const onGetImage = useCallback(async (): Promise<void> => {
    if (!imageSrc || !croppedAreaPixels) return;
    const base64String = await EasyCropperHelper.getCroppedImage({
      imageSrc,
      pixelCrop: croppedAreaPixels,
      width: MIN_WIDTH,
      height: MIN_HEIGHT,
      options: {
        mimeType: 'image/png',
      },
    });

    const file = await FileHelper.urlToFile(
      base64String,
      'image.png',
      'image/png'
    );

    const compressedFile = await FileHelper.compressImage(file, 0.86);

    setImagePreview(base64String);
    onChange && onChange(compressedFile);
    onModalClose();
  }, [croppedAreaPixels, imageSrc, onChange, onModalClose]);

  useEffect(() => {
    if (preview) {
      setImagePreview(preview);
    }
  }, [preview]);

  return (
    <S.Container>
      <S.SmallPreviewContainer onClick={onModalOpen}>
        {!!imagePreview && <S.SmallPreviewImage src={imagePreview} />}
      </S.SmallPreviewContainer>

      <S.Info>
        <S.Label htmlFor="article-image-cropper">{label}</S.Label>
        <S.HelpText>{helpText}</S.HelpText>
      </S.Info>

      <input
        type="file"
        id="article-image-cropper"
        placeholder="Selecione uma imagem"
        ref={inputFileRef}
        onChange={onFileChange}
      />

      <Modal isOpen={modalOpen}>
        <S.ModalContent style={{ maxWidth: '370px' }}>
          <S.ModalHeader>
            <CloseButton onClick={onModalClose} />
          </S.ModalHeader>

          {modalMode === 'crop' && (
            <S.ModalBody>
              <S.CropperContainer>
                <Cropper
                  cropShape="rect"
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  maxZoom={10}
                  minZoom={0.1}
                  restrictPosition={false}
                  zoomSpeed={0.2}
                  showGrid={true}
                  aspect={MIN_WIDTH / MIN_HEIGHT}
                  cropSize={{ width: MIN_WIDTH, height: MIN_HEIGHT }}
                  onCropChange={onCropChange}
                  onCropComplete={onCropComplete}
                  onZoomChange={onZoomChange}
                />
              </S.CropperContainer>
              <S.ModalActionButtons>
                <S.Button type="button" onClick={onModalClose} mood="light">
                  Cancelar
                </S.Button>
                <S.Button type="button" mood="primary" onClick={onGetImage}>
                  Cortar
                </S.Button>
              </S.ModalActionButtons>
            </S.ModalBody>
          )}

          {modalMode === 'preview' && imagePreview && (
            <S.ModalBody>
              <S.PreviewContainer>
                <S.PreviewImage src={imagePreview} />
              </S.PreviewContainer>
              <S.ModalActionButtons>
                <S.Button
                  type="button"
                  mood="primary"
                  onClick={() => inputFileRef?.current?.click()}
                >
                  Alterar
                </S.Button>
              </S.ModalActionButtons>
            </S.ModalBody>
          )}
        </S.ModalContent>
      </Modal>
    </S.Container>
  );
};

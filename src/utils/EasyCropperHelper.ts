import { Area } from 'react-easy-crop/types';

interface GetCroppedImageOptions {
  mimeType?:
    | 'image/jpeg'
    | 'image/png'
    | 'image/webp'
    | 'image/gif'
    | 'image/bmp';
  mode?: 'base64' | 'blob';
  quality?: number;
}

interface GetCroppedImageProps {
  imageSrc: string;
  pixelCrop: Area;
  width: number;
  height: number;
  options?: GetCroppedImageOptions;
}

export class EasyCropperHelper {
  public static createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });
  };

  public static async getCroppedImage(
    props: GetCroppedImageProps
  ): Promise<string> {
    const { imageSrc, pixelCrop, width, height } = props;

    const options: GetCroppedImageOptions = {
      mimeType: props?.options?.mimeType || 'image/jpeg',
      mode: props?.options?.mode || 'base64',
      quality: props?.options?.quality || 0.95,
    };

    const image = await this.createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    const smallImage = await this.createImage(canvas.toDataURL());
    const smallCanvas = document.createElement('canvas');
    smallCanvas.width = width;
    smallCanvas.height = height;
    const smallCtx = smallCanvas.getContext('2d');
    smallCtx?.drawImage(smallImage, 0, 0, width, height);

    if (options.mode === 'base64') {
      return smallCanvas.toDataURL(options.mimeType);
    }

    return new Promise((resolve, reject) => {
      smallCanvas.toBlob((file: Blob | null) => {
        file && resolve(URL.createObjectURL(file));
        !file && reject(new Error('Erro ao converter canvas em Blob'));
      }, options.mimeType);
    });
  }
}

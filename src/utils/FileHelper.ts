import Compressor from 'compressorjs';

type AppeptedMimeTypes = 'image/jpeg' | 'image/png' | 'image/gif';

export class FileHelper {
  public static urlToFile(
    url: string,
    filename: string,
    mimetype: AppeptedMimeTypes
  ): Promise<File> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(url);
        const buffer = await response.arrayBuffer();
        const file = new File([buffer], filename, { type: mimetype });
        resolve(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  public static fileToUrl(file: File): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result as string);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  public static async compressImage(
    file: File,
    quality: number = 0.95
  ): Promise<File> {
    return new Promise(async (resolve, reject) => {
      try {
        new Compressor(file, {
          quality,
          success: (result) => {
            if (result instanceof Blob) {
              resolve(new File([result], file.name, { type: file.type }));
            } else {
              resolve(result);
            }
          },
          error: (error) => {
            reject(error);
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}

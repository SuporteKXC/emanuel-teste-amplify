import { api } from "@/services";
import { useMutation } from "@tanstack/react-query";

async function uploadUserImage(file: File): Promise<string> {
  const { data } = await api.post<string>(
    `/links/uploadFile`,
    {
      file: file,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

return data   

}

export default function useUserUploadImage() {
    return useMutation({
        mutationFn: uploadUserImage
    })
}
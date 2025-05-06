import { api } from "@/services";
import { useQuery } from "@tanstack/react-query";

async function fetchUserImage(imageKey?: string) {
    
    const { data } = await api.get(`/links/download?fileKey=${imageKey}`)
    return data
}

export default function useAvatarImage(imageKey?: string) {
    return useQuery({
        queryKey: [imageKey ?? "imageKey"],
        queryFn: () => fetchUserImage(imageKey)
    })
}
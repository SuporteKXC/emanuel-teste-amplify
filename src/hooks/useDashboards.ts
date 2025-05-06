import { api } from "@/services"
import { useQuery } from "@tanstack/react-query"

async function getDashboard(moduleId?: number) {
  const filter = {
    module_id: moduleId
  }

  const response = await api.get('/dashboards/index', { params: filter })

  return response?.data ?? []
}

export const useDashboards = (moduleId?: number) => {

  return useQuery({
    queryKey: [`dashboard-${moduleId}`],

    queryFn: () => getDashboard(moduleId),
  })
}
import { RootState } from "@/store";
import { FiltersListActions } from "@/store/ducks";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAvailableFilters(){
  const dispatch = useDispatch()

  const {data: filters} = useSelector((state: RootState)=>{
    return state.filters
  })
  useEffect(()=>{
    dispatch(FiltersListActions.request(""))
  },[])

  const filterIsShown = useCallback((filterToCheck:string): boolean =>{
    if(!filters) return false
    return filters.some(item=> item.slug === filterToCheck)
  },[filters])

  return {
    filterIsShown,
    filters
  }
}
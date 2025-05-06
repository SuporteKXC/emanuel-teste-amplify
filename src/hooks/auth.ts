import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { UserType } from "contracts";
import type { RootState } from "store";
import { AuthActions } from 'store/ducks';
import { createSelector } from 'reselect';

const selectProfile = createSelector(
  (state: RootState) => state.auth,
  ({ data }) => data?.profile || undefined
);

export const useAuth = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.login);
  const profile = useSelector(selectProfile);
    
  useEffect(() => {
    profile && dispatch(AuthActions.request(profile.userId));
  }, []);

  return {
    isLoggedIn: profile !== undefined && !loading && !profile.first_access,
    profile: profile,
  };
};

export type AuthHook = ReturnType<typeof useAuth>;

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from 'store';
import type { UserType } from 'contracts/Auth';

export const useAuth = () => {
  const { loading } = useSelector((state: RootState) => state.login);
  const { data } = useSelector((state: RootState) => state.auth);

  /**
   * Checks if the user type belongs to any of the given UserTypes.
   */
  const userBelongsToAnyOf = useCallback(
    (...roles: UserType[]): boolean => {
      if (!data?.profile) return false;

      const { type } = data.profile;

      return roles.some((role) => role === type);
    },
    [data]
  );

  return {
    userBelongsToAnyOf,
    isLoggedIn: data !== null && !loading,
    profile: data?.profile,
  };
};

export type AuthHook = ReturnType<typeof useAuth>;

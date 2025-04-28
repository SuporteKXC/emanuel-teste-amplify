import { useSelector, RootStateOrAny } from "react-redux";
import { AuthState } from "store/ducks/auth";

export const usePermissions = () => {
  const { data: userData, loggedIn } = useSelector<RootStateOrAny>(
    (state) => state?.auth
  ) as AuthState;
  return {
    hasAnyPermission(permissions: string[] = []) {
      if (!loggedIn) return false;
    console.log(userData.roles)
      return permissions.some((p) => userData?.roles.includes(p));
    },
    hasEveryPermission(permissions: string[] = []) {
      if (!loggedIn) return false;
      return permissions.every((p) => userData?.roles.includes(p));
    },
    isAdminRoot() {
      if (!loggedIn) return false;
      return userData?.root;
    },
  };
};

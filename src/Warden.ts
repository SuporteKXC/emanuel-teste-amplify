import React, { useCallback, useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AuthActions, AuthState } from "store/ducks/auth";
import { eventBus } from "services";

const Warden: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector<RootStateOrAny, AuthState>(
    (state) => state.auth
  );

  const handleLogout = useCallback((): void => {
    if (loading) return;
    dispatch(AuthActions.logoutRequest());
  }, [dispatch, loading]);

  const handleLogoutWithId = useCallback(
    (userId: number): void => {
      if (loading) return;
      if (data?.user_id !== userId) return;
      dispatch(AuthActions.logoutRequest());
    },
    [loading, data?.user_id, dispatch]
  );

  useEffect(() => {
    const registry1 = eventBus.subscribe("logoutUser", handleLogout);
    const registry2 = eventBus.subscribe("logoutUserById", handleLogoutWithId);
    return () => {
      registry1.unsubscribe();
      registry2.unsubscribe();
    };
  }, [handleLogout, handleLogoutWithId]);

  return null;
};

export default Warden;

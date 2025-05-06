import { api } from 'services';

export const rehydrateToken = ({ payload }: Record<string, any>): void => {
  if (!payload?.auth?.data) return;
  const { token } = payload.auth.data;
  if (token && api.defaults.headers) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

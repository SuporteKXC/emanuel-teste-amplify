import type { RouterProps } from "contracts";
import { ForgotMyPasswordPage } from 'pages';
import { RouteObject } from 'react-router-dom';

export const forgotMyPasswordRoute = ({}: Partial<RouterProps>): RouteObject => ({
  path: 'esqueci-minha-senha',
  element: <ForgotMyPasswordPage />
});
import type { RouterProps } from 'contracts/Router';
import { ForgotMyPasswordPage } from 'pages/Guest';
import { Navigate, RouteObject } from 'react-router-dom';

const forgotMyPasswordRoute = ({
  isLoggedIn,
  location,
}: RouterProps): RouteObject => ({
  path: 'esqueci-minha-senha',
  element: !isLoggedIn ? (
    <ForgotMyPasswordPage />
  ) : (
    <Navigate to="/" state={{ from: location }} />
  ),
});

export default forgotMyPasswordRoute;

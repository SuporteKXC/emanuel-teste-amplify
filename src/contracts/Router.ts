import type { Location } from 'react-router-dom';
import type { AuthData, UserType } from './Auth';

export interface RouterProps {
  isLoggedIn: boolean;
  location: Location;
  profile?: AuthData['profile'];
  userBelongsToAnyOf: (...roles: UserType[]) => boolean;
}

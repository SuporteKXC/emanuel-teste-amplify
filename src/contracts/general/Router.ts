import { Location } from 'react-router-dom';
import { UserType, IProfile } from "contracts";

export interface RouterProps {
  isLoggedIn?: boolean;
  location?: Location;
  hasPermissionTo?: (action: string) => boolean;
  profile?: IProfile
}
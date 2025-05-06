import styled, { css } from 'styled-components';
import { Colors } from 'styles/constants';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import { ReactComponent as ArrowDouble } from 'assets/icons/arrow-double-left.svg';
import { ReactComponent as BarChart } from 'assets/icons/bar-chart.svg';
import { ReactComponent as Buildings } from 'assets/icons/buildings.svg';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { ReactComponent as CheckShield } from 'assets/icons/check-shield.svg';
import { ReactComponent as Cog } from 'assets/icons/cog.svg';
import { ReactComponent as Dock } from 'assets/icons/dock.svg';
import { ReactComponent as Dashboard } from "assets/icons/dashboard-icon.svg";
import { ReactComponent as Download } from "assets/icons/download-icon.svg";
import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import { ReactComponent as EyeOff } from 'assets/icons/eye-off-outline.svg';
import { ReactComponent as Eye } from 'assets/icons/eye-outline.svg';
import { ReactComponent as List } from 'assets/icons/list.svg';
import { ReactComponent as MessageSquareAdd } from 'assets/icons/message-square-add.svg';
import { ReactComponent as Filter } from 'assets/icons/filter-icon.svg';
import { ReactComponent as Login } from 'assets/icons/login.svg';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { ReactComponent as Printer } from 'assets/icons/printer.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ReactComponent as Separation } from 'assets/icons/bx-layer.svg';
import { ReactComponent as PackageSolid } from 'assets/icons/package-solid.svg';
import { ReactComponent as Pending } from 'assets/icons/bx-time.svg';
import { ReactComponent as ArrowRightCircle } from 'assets/icons/bxs-chevron-right-circle.svg';
import { ReactComponent as Truck } from 'assets/icons/truck.svg';
import { ReactComponent as UserCircle } from 'assets/icons/user-circle.svg';
import { ReactComponent as UserPin } from 'assets/icons/user-pin.svg';
import { ReactComponent as UseRectangle } from 'assets/icons/user-rectangle.svg';
import { ReactComponent as Warehouse } from 'assets/icons/warehouse.svg';
import { ReactComponent as X } from 'assets/icons/x.svg';

import { ArchiveOut } from '@styled-icons/boxicons-regular';

export {
  ArchiveOut,
  Checkbox,
  CheckboxChecked,
  LeftArrowAlt,
  LoaderCircle as Loader,
  LogOutCircle,
} from '@styled-icons/boxicons-regular';
export {
  ArrowSortedDown as SortDown,
  ArrowSortedUp as SortUp,
  ArrowUnsorted as Sort,
} from '@styled-icons/typicons';

const baseSvgStyle = css`
  path {
    fill: currentColor;
  }
`;

export const AdminIcon = styled(CheckShield)`
  ${baseSvgStyle};
`;

export const ArrowLeftIcon = styled(ArrowLeft)`
  ${baseSvgStyle}
`;

export const BarChartIcon = styled(BarChart)`
  ${baseSvgStyle}
`;

export const CalendarIcon = styled(Calendar)`
  ${baseSvgStyle}
`;

export const CompanyIcon = styled(Buildings)`
  ${baseSvgStyle};
`;

export const DockIcon = styled(Dock)`
  ${baseSvgStyle};
`;

export const DashboardIcon = styled(Dashboard)`
  ${baseSvgStyle};
`;

export const DownloadIcon = styled(Download)`
  ${baseSvgStyle};
`;

export const EditIcon = styled(Edit)`
  ${baseSvgStyle}
`;

export const EyeOffIcon = styled(EyeOff)`
  ${baseSvgStyle};
`;

export const EyeIcon = styled(Eye)`
  ${baseSvgStyle};
`;

export const FilterIcon = styled(Filter)`
  ${baseSvgStyle};
`;

export const ListIcon = styled(List)`
  ${baseSvgStyle};
`;

export const MessageAddIcon = styled(MessageSquareAdd)`
  ${baseSvgStyle};
`;

export const LoginIcon = styled(Login)`
  ${baseSvgStyle};
`;

export const PlusIcon = styled(Plus)`
  ${baseSvgStyle}
`;

export const PrinterIcon = styled(Printer)`
  ${baseSvgStyle};
`;

export const SearchIcon = styled(Search)`
  ${baseSvgStyle}
`;

export const SettingsIcon = styled(Cog)`
  ${baseSvgStyle}
`;

export const TrashIcon = styled(Trash)`
  ${baseSvgStyle}
`;

export const UserIcon = styled(UserCircle)`
  ${baseSvgStyle}
`;

export const UserPinIcon = styled(UserPin)`
  ${baseSvgStyle}
`;

export const UserRectangleIcon = styled(UseRectangle)`
  ${baseSvgStyle}
`;

export const WarehouseIcon = styled(Warehouse)`
  ${baseSvgStyle}
`;

export const XIcon = styled(X)`
  ${baseSvgStyle}
`;

export const TruckIcon = styled(Truck)`
  ${baseSvgStyle}
`;

export const ArrowRightCircleIcon = styled(ArrowRightCircle)`
  path {
    fill: ${Colors.Gray50};
  }
`;

export const RecallIcon = styled(ArrowDouble)`
  path {
    fill: ${Colors.Gray30};
  }
  background-color: ${Colors.Gray65};
  padding: 3px;
  border-radius: 50%;
  width: 28px;
  height: 28px;
`;

export const PendingIcon = styled(Pending)`
  path {
    fill: ${Colors.Blue};
  }
`;

export const PackageSolidIcon = styled(PackageSolid)`
  ${baseSvgStyle}
`;

export const SeparationIcon = styled(Separation)`
  ${baseSvgStyle}
`;

export const StockOrderIcon = styled(ArchiveOut).attrs({ size: 24 })`
  ${baseSvgStyle}
`;

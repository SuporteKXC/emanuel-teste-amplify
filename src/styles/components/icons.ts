import styled, { css } from 'styled-components';

import { ReactComponent as ArrowLeft } from 'assets/icons/arrow-left.svg';
import { ReactComponent as BarChart } from 'assets/icons/bar-chart.svg';
import { ReactComponent as Block } from 'assets/icons/block.svg';
import { ReactComponent as Buildings } from 'assets/icons/buildings.svg';
import { ReactComponent as CalendarWeek } from 'assets/icons/calendar-week.svg';
import { ReactComponent as Calendar } from 'assets/icons/calendar.svg';
import { ReactComponent as Cancelation } from 'assets/icons/cancelation.svg';
import { ReactComponent as CheckShield } from 'assets/icons/check-shield.svg';
import { ReactComponent as ChevronDown } from 'assets/icons/chevron-down.svg';
import { ReactComponent as ChevronRight } from 'assets/icons/chevron-right.svg';
import { ReactComponent as ChevronRightCircle } from 'assets/icons/chevron-right-circle.svg';
import { ReactComponent as Cog } from 'assets/icons/cog.svg';
import { ReactComponent as Dock } from 'assets/icons/dock.svg';
import { ReactComponent as Dots } from 'assets/icons/dots-vertical-rounded.svg';
import { ReactComponent as DownArrowSquare } from 'assets/icons/down-arrow-square.svg';
import { ReactComponent as Edit } from 'assets/icons/edit.svg';
import { ReactComponent as EditAlt } from 'assets/icons/edit-alt.svg';
import { ReactComponent as EndFence } from 'assets/icons/end-fence.svg';
import { ReactComponent as Eye } from 'assets/icons/eye-outline.svg';
import { ReactComponent as EyeOff } from 'assets/icons/eye-off-outline.svg';
import { ReactComponent as Filter } from 'assets/icons/filter.svg';
import { ReactComponent as List } from 'assets/icons/list.svg';
import { ReactComponent as Lock } from 'assets/icons/lock.svg';
import { ReactComponent as Login } from 'assets/icons/login.svg';
import { ReactComponent as MessageDetail } from 'assets/icons/message-detail.svg';
import { ReactComponent as Operation } from 'assets/icons/operation.svg';
import { ReactComponent as Package } from 'assets/icons/package.svg';
import { ReactComponent as Plus } from 'assets/icons/plus.svg';
import { ReactComponent as Printer } from 'assets/icons/printer.svg';
import { ReactComponent as ReservedInterval } from 'assets/icons/reserved-interval.svg';
import { ReactComponent as Search } from 'assets/icons/search.svg';
import { ReactComponent as Timer } from 'assets/icons/timer.svg';
import { ReactComponent as Trash } from 'assets/icons/trash.svg';
import { ReactComponent as Truck } from 'assets/icons/truck.svg';
import { ReactComponent as UpArrowSquare } from 'assets/icons/up-arrow-square.svg';
import { ReactComponent as UseRectangle } from 'assets/icons/user-rectangle.svg';
import { ReactComponent as UserPin } from 'assets/icons/user-pin.svg';
import { ReactComponent as Warehouse } from 'assets/icons/warehouse.svg';
import { ReactComponent as Weight } from 'assets/icons/weight.svg';
import { ReactComponent as X } from 'assets/icons/x.svg';
import { ReactComponent as Invoice } from 'assets/icons/invoice.svg';
import { ReactComponent as Operational } from 'assets/icons/operational.svg';
import { ReactComponent as TogglerOpen } from 'assets/icons/togglerIconOpen.svg';
import { ReactComponent as TogglerClose } from 'assets/icons/togglerIconClose.svg';
import { ReactComponent as PtFlag} from 'assets/icons/icon-pt.svg'
import { ReactComponent as EnFlag} from 'assets/icons/icon-en.svg'

import { ReactComponent as AlertTriangleSolid } from 'assets/icons/alert-triangle-solid.svg';
import { ReactComponent as AlertTriangle } from 'assets/icons/alert-triangle.svg';
import { ReactComponent as PopoverTriangle } from "assets/icons/popover-triangle.svg";
import { ReactComponent as Iff } from "assets/icons/iff-logo.svg";
export { ReactComponent as Webcol } from "assets/icons/logo.svg";

import { Colors, ColorScheme } from 'styles/constants';

import {
  CalendarLtr as CalendarDays 
}from '@styled-icons/fluentui-system-regular/CalendarLtr'

export {
  LoaderCircle as Loader,
  Checkbox,
  LogOutCircle,
  Cog as CogIcon,
  CheckShield
} from '@styled-icons/boxicons-regular';
export { Check } from "@styled-icons/boxicons-regular";

export {
  CheckboxChecked,
  PackageIcon as BoxIcon,
  Cog as CogFilled,
  RightArrow,
  UpArrow,
  PlaneTakeOff,
  Map as MapTracking
} from '@styled-icons/boxicons-solid';

export {
  ArrowUnsorted as Sort,
  ArrowSortedUp as SortUp,
  ArrowSortedDown as SortDown,
} from '@styled-icons/typicons';
export { CaretRightFill as ShowArrow } from '@styled-icons/bootstrap/CaretRightFill'

export { Close } from "@styled-icons/ionicons-sharp";

export { Star, StarFill } from "@styled-icons/bootstrap"

export { Dot } from "@styled-icons/bootstrap"

import { MoneyCheckDollar } from "@styled-icons/fa-solid/MoneyCheckDollar"
import { PeopleCommunity } from "@styled-icons/fluentui-system-filled/PeopleCommunity"
import { ExclamationTriangleFill } from "@styled-icons/bootstrap/ExclamationTriangleFill";
import { ListCircle } from "@styled-icons/ionicons-sharp/ListCircle";
import { Update } from "@styled-icons/material/Update";


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

export const BlockIcon = styled(Block)`
  ${baseSvgStyle}
`;

export const CalendarIcon = styled(Calendar)`
  ${baseSvgStyle}
`;

export const CalendarWeekIcon = styled(CalendarWeek)`
  ${baseSvgStyle}
`;

export const DaysIcon = styled(CalendarDays)`
  height:20px;
  width:20px;
`

export const CancelationIcon = styled(Cancelation)`
  ${baseSvgStyle}
`;

export const CompanyIcon = styled(Buildings)`
  ${baseSvgStyle};
`;

export const DockIcon = styled(Dock)`
  ${baseSvgStyle};
`;

export const DotsIcon = styled(Dots)`
  ${baseSvgStyle};
`;

export const DownArrowSquareIcon = styled(DownArrowSquare)`
  ${baseSvgStyle}
`;

export const EditIcon = styled(Edit)`
${baseSvgStyle}
`;

export const EditAltIcon = styled(EditAlt)`
  ${baseSvgStyle}
`;

export const EndFenceIcon = styled(EndFence)`
  ${baseSvgStyle}
`;

export const EyeOffIcon = styled(EyeOff)`
  ${baseSvgStyle};
`;

export const FilterIcon = styled(Filter)`
  ${baseSvgStyle};
`;

export const EyeIcon = styled(Eye)`
  ${baseSvgStyle};
`;

export const IffLogo = styled(Iff)`
  ${baseSvgStyle};
`;

export const ListIcon = styled(List)`
  ${baseSvgStyle};
`;

export const LockIcon = styled(Lock)`
  ${baseSvgStyle};
  color: ${Colors.Gray50};
  margin-top: 2px;
  margin-bottom: -2px;
`;

export const LoginIcon = styled(Login)`
  ${baseSvgStyle};
`;

export const MessageIcon = styled(MessageDetail)`
  ${baseSvgStyle};
`;

export const OperationIcon = styled(Operation)`
  ${baseSvgStyle};
`;

export const PackageIcon = styled(Package)`
  ${baseSvgStyle};
`;

export const PlusIcon = styled(Plus)`
  ${baseSvgStyle}
`;

export const PrinterIcon = styled(Printer)`
  ${baseSvgStyle};
`;

export const ReservedIntervalIcon = styled(ReservedInterval)`
  ${baseSvgStyle};
`;

export const SearchIcon = styled(Search)`
  ${baseSvgStyle}
`;

export const TimerIcon = styled(Timer)`
  ${baseSvgStyle}
`;

export const ChevronDownIcon = styled(ChevronDown)`
  ${baseSvgStyle}
`;

export const ChevronRightIcon = styled(ChevronRight)`
  ${baseSvgStyle}
`;

export const ChevronRightCircleIcon = styled(ChevronRightCircle)`
  ${baseSvgStyle}
`;

export const SettingsIcon = styled(Cog)`
  ${baseSvgStyle}
`;

export const TrashIcon = styled(Trash)`
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

export const TruckIcon = styled(Truck)`
  ${baseSvgStyle}
`;

export const UpArrowSquareIcon = styled(UpArrowSquare)`
  ${baseSvgStyle}
`;

export const WeightIcon = styled(Weight)`
  ${baseSvgStyle}
`;

export const XIcon = styled(X)`
  ${baseSvgStyle}
`;

export const InvoiceIcon = styled(Invoice)`
  ${baseSvgStyle}
`;

export const OperationalIcon = styled(Operational)`
  ${baseSvgStyle}
`;

export const TogglerOpenIcon = styled(TogglerOpen)`
  ${baseSvgStyle}
`;

export const TogglerCloseIcon = styled(TogglerClose)`
  ${baseSvgStyle}
`;

export const AlertTriangleSolidIcon = styled(AlertTriangleSolid)`
  ${baseSvgStyle}
`

export const AlertTriangleIcon = styled(AlertTriangle)`
  ${baseSvgStyle}
`

export const PopoverTriangleIcon = styled(PopoverTriangle)`
  ${baseSvgStyle}
`

export const MoneyCheckIcon = styled(MoneyCheckDollar)`
  ${baseSvgStyle}
`

export const PeopleCommunityIcon = styled(PeopleCommunity)`
  ${baseSvgStyle}
`

export const ExclamationTriangleFillIcon = styled(ExclamationTriangleFill)`
  ${baseSvgStyle}
`

export const ListCircleIcon = styled(ListCircle)`
  ${baseSvgStyle}
`

export const UpdateIcon = styled(Update)`
  ${baseSvgStyle}
`


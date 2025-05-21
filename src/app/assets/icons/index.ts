import { IconName } from "@/types/IconName.type";
import CheckCircle from "./CheckCircle";
import ChevronDown from "./ChevronDown";
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";
import ChevronUp from "./ChevronUp";
import Ellipsis from "./Ellipsis";
import Info from "./Info";
import Spinner from "./Spinner";
import Warning from "./Warning";

export const iconRegistry: Record<IconName, React.FC<{ className?: string }>> = {
  'check-circle': CheckCircle,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  ellipsis: Ellipsis,
  info: Info,
  warning: Warning,
  spinner: Spinner,
};
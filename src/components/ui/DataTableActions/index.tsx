import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, ChevronRightCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export type IDataTableAction = {
  name: string;
  route: string;
  hasPermission?: boolean;
  onPress?: () => void
  disabled?: boolean
};

export type DataTableActionsProps = {
  actions: IDataTableAction[];
};
export const DataTableActions: React.FC<DataTableActionsProps> = ({
  actions,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      {actions.length === 1 ? (
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          // onClick={() => navigate(actions[0].route)}
          onClick={() => actions[0].onPress ? actions[0].onPress() : navigate(actions[0].route)}
          title={actions[0].name}
        >
          <ChevronRightCircle className="h-5 w-5 text-slate-500" />
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="focus-visible:ring-primary-500"
          >
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-5 w-5 text-slate-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel className="font-GilroySemibold">
              Ações
            </DropdownMenuLabel>
            {actions.map((action, index) => (
              <div key={action.name}>
                <DropdownMenuItem
                  disabled={action.disabled}
                  key={action.name}
                  className={cn(
                    !action.hasPermission &&
                      "cursor-not-allowed pointer-events-none"
                  )}
                >
                  {action.hasPermission ? (
                    action.onPress ? <div className="font-sans w-full cursor-pointer" onClick={action.onPress}>{action.name}</div> : (
                    <Link to={action.route} className="font-sans w-full">
                      {action.name}
                    </Link>)
                  ) : (
                    <span className="font-sans text-slate-400">
                      {action.name}
                    </span>
                  )}
                </DropdownMenuItem>
                {index !== actions.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

import { ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { v4 as uuidv4 } from "uuid";

export interface UserOption {
  label: string;
  action: () => void;
}
export interface UserProps {
  name: string;
  avatar: string | undefined;
  options: UserOption[];
}

export function User({ name, avatar, options }: UserProps) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary-500 font-GilroyBold text-sm text-white">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
          {avatar && <AvatarImage src={avatar} alt={name} />}
        </Avatar>
        <span className="hidden font-GilroySemibold text-sm text-slate-600 md:block">
          {name}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {options.map((option, index) => (
              <div key={uuidv4()}>
                <DropdownMenuItem className="hover:bg-slate-100">
                  <button
                    onClick={() => option.action()}
                    className="flex w-full items-center justify-start text-sm  duration-300 ease-in-out hover:text-primary-500"
                  >
                    {option.label}
                  </button>
                </DropdownMenuItem>
                {index < options.length - 1 && <DropdownMenuSeparator />}
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

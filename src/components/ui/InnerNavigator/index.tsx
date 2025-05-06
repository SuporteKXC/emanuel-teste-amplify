// Pendências:
// 1. Aplicar responsividade de acordo com a quantidade de opções do menu/tamnaho disponível em tela.

import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { v4 as uuidv4 } from "uuid";
import { ComponentProps, useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SearchNF } from "@/pages/TrackingDelivery/List/Search";

export interface InnerNavigatorOption {
  title: string;
  route: string;
  hasPermission: boolean;
}

interface InnerNavigatorProps extends ComponentProps<"nav"> {
  options: InnerNavigatorOption[];
}

export function InnerNavigator({ options, className }: InnerNavigatorProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);

  const handleClick = (index: number, route: string) => {
    setSelected(index);
    navigate(route);
  };

  useEffect(() => {
    if (!pathname || !options.length) return;

    const index = options.findIndex((option) => {
      const routeParts = option.route.split("/");
      return pathname.endsWith(routeParts[routeParts.length - 1]);
    });

    if (index !== -1) {
      setSelected(index);
    }
  }, [pathname, options]);

  return (
    <nav
      className={cn(
        "flex w-full rounded-md bg-white px-6 py-4 shadow-sm shadow-slate-300",
        className
      )}
    >
      <div className="justify-between hidden md:flex md:justify-start">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={!option.hasPermission}
            onClick={() => handleClick(index, option.route)}
            className={cn(
              "relative h-full w-max items-center justify-center px-4 font-GilroySemibold text-sm duration-300 ease-in-out backdrop:flex after:absolute after:bottom-[-16px] after:block after:h-0.5 after:w-full after:rounded-sm after:bg-primary-500 after:opacity-0 after:duration-300 after:ease-in-out after:content-[''] hover:text-primary-500 hover:after:opacity-100 md:flex disabled:text-slate-300 disabled:hover:text-slate-300 disabled:after:bg-slate-300 disabled:hover:after:bg-slate-300 disabled:cursor-not-allowed",
              `${
                selected === index
                  ? "text-primary-500 after:opacity-100"
                  : "text-slate-500"
              }`
            )}
          >
            {option.title}
          </button>
        ))}
        {options[0].route === "/tracking-delivery" && <SearchNF/>}
      </div>
      <div className="flex items-center justify-between w-full md:hidden">
        <span className="text-sm font-GilroySemibold text-primary-500">
          {options[selected].title}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            <DropdownMenuSeparator />
            {options.map((option, index) => (
              <DropdownMenuItem key={uuidv4()} className="hover:bg-slate-100">
                <a
                  key={index}
                  href={option.route}
                  className={cn(
                    "flex w-full items-center justify-start text-sm duration-300 ease-in-out hover:text-primary-500 font-sans",
                    `${
                      selected === index ? "text-primary-500" : "text-slate-500"
                    }`
                  )}
                >
                  {option.title}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

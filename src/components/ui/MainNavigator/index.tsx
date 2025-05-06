import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Option } from "./Option";
import { twMerge } from "tailwind-merge";
import { useLocation, useNavigate } from "react-router-dom";
const env = import.meta.env.VITE_COMEX_CLIENT
export interface SubOptionProps {
  name: string;
  route: string;
  permission: string;
}

export interface OptionProps {
  name: string;
  module: string;
  description?: string;
  icon: ReactNode;
  subOptions: SubOptionProps[];
}

export interface MainNavigatorOptionProps {
  options: OptionProps[];
  isSuperAdmin?: boolean;
  userPermissions: string[];
  clientLogo?: string;
  modules: any[];
}

export const MainNavigator: React.FC<MainNavigatorOptionProps> = ({
  options,
  isSuperAdmin = false,
  userPermissions,
  clientLogo,
  modules,
}) => {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const [isOpenSubOptions, setIsOpenSubOptions] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const setSelectOptionByPathname = useCallback(() => {
    const index = options.findIndex((option) => {
      return option.subOptions.some((subOption) => {
        return subOption.route.split("/")[0] === pathname.split("/")[1];
      });
    });
    setSelectedOption(index);
  }, [options, pathname]);

  const handleSelectedOption = (index: number) => {
    if (selectedOption === index) {
      setIsOpenSubOptions(!isOpenSubOptions);
      return;
    }
    setSelectedOption(index);
    setIsOpenSubOptions(true);
  };

  const filteredOptions = options.filter((item) => {
      return modules.some(mod => (mod.name === item.module) || item.module === "FREE")
    });

  const handleSubOption = useCallback(
    (route: string) => {
      setIsOpenSubOptions(false);
      navigate(route);
    },
    [navigate]
  );

  useEffect(() => {
    setIsOpenSubOptions(false);
  }, []);

  const renderSubOptions = useCallback(() => {
    if (!filteredOptions[selectedOption]?.subOptions) return <></>;
    return (
      <div className="mt-6">
        {filteredOptions[selectedOption]?.subOptions.map((subOption) => {
          return (
            <button
              disabled={
                !userPermissions.includes(subOption.permission) && !isSuperAdmin
              }
              type="button"
              className="font-sans flex min-h-12 w-full items-center justify-start rounded-md px-4 py-4 text-sm text-slate-50 enabled:hover:bg-slate-900 disabled:opacity-25 disabled:cursor-not-allowed"
              key={subOption.name}
              onClick={() => handleSubOption(subOption.route)}
            >
              <span className="text-left">{subOption.name}</span>
            </button>
          );
        })}
      </div>
    );
  }, [handleSubOption, isSuperAdmin, options, selectedOption, userPermissions]);

  useEffect(() => {
    setSelectOptionByPathname();
  }, [setSelectOptionByPathname]);

  return (
    <aside className="flex h-full min-h-screen w-max bg-slate-700">
      <section className="w-14">
        <div className="flex h-14 w-14 items-center justify-center bg-primary-500">
          <img src={clientLogo ?? "/images/logo-col.png"} alt="webcol" className="w-6 h-6" />
        </div>
        <nav>
          {filteredOptions.map((option: OptionProps, index) => (
            <Option
              option={option}
              key={option.name}
              onSelected={() => handleSelectedOption(index)}
              currentOption={selectedOption === index}
            />
          ))}
        </nav>
      </section>
      <div
        className={twMerge(
          "hidden h-full min-h-screen w-60 bg-slate-800 px-6 py-4 overflow-y-auto",
          `${isOpenSubOptions && "block"}`
        )}
      >
        {selectedOption >= 0 && (
          <>
            <header>
              <h2 className="font-GilroySemibold text-lg font-normal text-slate-50">
                {filteredOptions[selectedOption]?.name}
              </h2>
              <p className="font-sans mt-3 text-xs text-slate-400">
                {filteredOptions[selectedOption]?.description}
              </p>
            </header>
            {renderSubOptions()}
          </>
        )}
      </div>
    </aside>
  );
};

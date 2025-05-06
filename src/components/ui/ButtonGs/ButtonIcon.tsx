import React from "react";

export interface ButtonIconProps {
  children: React.ReactNode;
}
export const ButtonIcon: React.FC<ButtonIconProps> = ({ children }) => {
  return <>{children}</>;
};

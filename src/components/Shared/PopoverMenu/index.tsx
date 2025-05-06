import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  PropsWithChildren,
} from "react";
import { keyframes } from "styled-components";
import { v4 as uuidV4 } from "uuid";

import * as S from "./styles";

export interface IMenuItem {
  label: string;
  action: Function;
}

interface IPopoverMenuProps extends PropsWithChildren<any> {
  menuItems: Array<IMenuItem>;
  marginTop?: Number;
}

export const PopoverMenu: React.FC<IPopoverMenuProps> = ({
  children,
  menuItems = [],
  marginTop = 38,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopoverMenu = useCallback(() => {
    setIsActive((state) => !state);
  }, []);

  const handleClickOutside = useCallback((event: any) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsActive(false);
    }
  }, []);

  const PopoverMenuContent = () => {
    if (!isActive) return <></>;

    const animation = keyframes`
      from {
        opacity: 0;
        top: ${Number(marginTop) * 1.33}px;
      }
      to {
        opacity: 1;
        top: ${Number(marginTop)}px;
      }
    `;

    return (
      <S.AnimatedContainer marginTop={marginTop} animation={animation}>
        <S.Triangle />
        <S.PopoverMenuContainer>
          {menuItems.map(({ label, action }) => (
            <S.MenuOption
              key={uuidV4()}
              onClick={(e) => {
                e.stopPropagation()
                setIsActive(false);
                if (action) action();
              }}
            >
              {label}
            </S.MenuOption>
          ))}
        </S.PopoverMenuContainer>
      </S.AnimatedContainer>
    );
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <S.Container ref={containerRef}>
      <S.ChildrenContainer onClick={togglePopoverMenu}>
        {children}
        <PopoverMenuContent />
      </S.ChildrenContainer>
    </S.Container>
  );
};

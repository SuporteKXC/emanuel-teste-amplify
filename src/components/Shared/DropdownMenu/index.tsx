import { useState, useCallback, useEffect, useRef } from "react";
import * as S from "./styles";

interface Options {
  title: string;
  action: () => void;
  disabled?: boolean;
}

interface DropdownProps {
  options: Options[];
}

export const DropdownMenu = ({ options }: DropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<any | null>(null);

  const openMenu = useCallback(() => {
    setOpen(true);
  }, [open]);

  const onOutside = useCallback(() => setOpen(false), []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) onOutside();
    },
    [ref]
  );

  useEffect(() => {
    addEventListener("click", handleClickOutside, true);
    return () => {
      removeEventListener("click", handleClickOutside, true);
    };
  }, [onOutside]);

  return (
    <S.Container>
      <S.DropButton type="button" onClick={openMenu}>
        <S.Dropicon />
      </S.DropButton>
      <S.Menu isOpen={open} ref={ref}>
        {options.map((item, index) => (
          <S.Option onClick={item.action} key={index} disabled={item.disabled}>
            {item.title}
          </S.Option>
        ))}
        <S.Triangle />
      </S.Menu>
    </S.Container>
  );
};

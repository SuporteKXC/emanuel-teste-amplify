import React, { useCallback, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ReactDatePickerProps } from "react-datepicker";
import * as S from "./styles";

export const DatePicker = React.memo((props: ReactDatePickerProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const changeOpen = useCallback(() => {
    setOpen((prev: boolean) => !prev);
  }, []);

  const onOutside = useCallback(()=>{
    setOpen(false)
  },[])

  return (
    <S.Container>
      <S.Calendar />
      <ReactDatePicker
        {...props}
        key={"@calendar-key"}
        calendarClassName="calendar"
        dayClassName={(_) => "day"}
        wrapperClassName="wrapper"
        weekDayClassName={(_) => "week"}
        open={open}
        onClickOutside={onOutside}
      />
      <S.ButtonChevron type="button" onClick={changeOpen}>
        <S.ChevronIcon />
      </S.ButtonChevron>
    </S.Container>
  );
});

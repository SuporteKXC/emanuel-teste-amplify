import { CalendarWeekIcon } from './../../../../styles/components/icons';
import styled from "styled-components";
import { ChevronDownIcon } from "styles/components";
import { Colors, Fonts } from "styles/constants";

export const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  div.react-datepicker__day--selected,
   .react-datepicker__day--in-selecting-range,
    .react-datepicker__day--in-range, .react-datepicker__month-text--selected,
     .react-datepicker__month-text--in-selecting-range,
      .react-datepicker__month-text--in-range,
      .react-datepicker__quarter-text--selected,
       .react-datepicker__quarter-text--in-selecting-range,
        .react-datepicker__quarter-text--in-range,
         .react-datepicker__year-text--selected,
          .react-datepicker__year-text--in-selecting-range,
           .react-datepicker__year-text--in-range {
            background-color: ${Colors.Blue30} !important;
           }
  div.react-datepicker__day--outside-month {
    color: ${Colors.Gray40};
  }
  div.react-datepicker__triangle::before {
    border-bottom-color: ${Colors.White} !important;
  }
  div.react-datepicker__triangle::after {
    border-bottom-color: ${Colors.White} !important;
  }

  .calendar {
    background-color: white;
    font-family: ${Fonts.GilroyBold};
    border: none;
    box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 3px 3px 7px 0px rgba(0, 0, 0, 0.1);
    padding: 10px;
    transform-origin: 80px 0;
    animation: calendarAnim 0.35s;

    div.react-datepicker__header {
      background-color: ${Colors.White};
    }
    button.react-datepicker__navigation {
      top: 5px;
    }

    @keyframes calendarAnim {
      from { transform: scale(0.7); opacity: 0.4; }
      to { transform: scale(1); opacity: 1; }
    }
  }

  .day {
    border-radius: 50%;
  }

  .wrapper {
    display: flex;
    margin: 0;
    padding: 0;
    border: none;
    height: 68px;
    width: 100%;
    background-color: ${Colors.Gray70};
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 6px 0 0 6px;

    input {
      border: none;
      margin: 0;
      text-align: center;
      font-family: ${Fonts.GilroyBold};
      font-size: 14px;
      color: ${Colors.White};
      background-color: inherit;
    }
  }

  .week {
    margin-top: 10px;
  }
`;

export const ButtonChevron = styled.button`
  display: flex;
  position: absolute;
  right: 6%;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

export const ChevronIcon = styled(ChevronDownIcon)`
  color: ${Colors.White};
  width: 24px;
  height: 24px;
`;

export const Calendar = styled(CalendarWeekIcon)`
  position: absolute;
  left: 20px;
  color: ${Colors.White};
  width: 20px;
  height: 20px;
`
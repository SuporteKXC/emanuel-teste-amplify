import { Form } from "@unform/web";
import styled from "styled-components";
import { CalendarWeekIcon, ChevronDownIcon } from "styles/components";
import { Colors, Fonts } from "styles/constants";
import { Button, Close } from "styles/components";
export { Search } from "@styled-icons/evil/Search";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 182px;
  background-color: ${Colors.White};
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
`;

export const FilterForm = styled(Form)`
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  gap: 6px;
  width: 100%;
  align-items: center;
  justify-content: flex-start;

  > div {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

export const DropWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const DateContainer = styled.div`
  display: flex;
  position: relative;
  background-color: ${Colors.Gray70};
  color: ${Colors.White};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  border-radius: 6px 0 0 6px;
  justify-content: flex-start;
  align-items: center;
  width: 5px;
  height: 100%;
  padding: 10px 15px;
  flex-direction: row;
  gap: 10px;
`;

export const DateFilter = styled.input`
  background: ${Colors.Gray70};
  border: none;
  color: ${Colors.White};
  font-family: ${Fonts.GilroySemiBold};
  font-size: 14px;
  flex-grow: 1;
`;

export const CalendarIcon = styled(CalendarWeekIcon)`
  color: ${Colors.White};
  width: 20px;
  height: 20px;
`;

export const Open = styled.button`
  position: absolute;
  align-self: center;
  right: 12px;
`;

export const ArrowDown = styled(ChevronDownIcon)`
  color: ${Colors.White};
  width: 24px;
  height: 24px;
`;

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const ButtonSubmit = styled(Button)`
  display: flex;
  gap: 2px;
  color: #ffff;
  height: 38px;
  margin-top: 8px;
  background-color: #0085ff;
  max-width: 8rem;
  padding: 6px 12px 6px 8px;
`;

export const MensagemClear = styled.p`
  white-space: nowrap;
  font-size: 12px;
  margin-right: 6px;
`;

export const ButtonFilter = styled(Button)`
  display: flex;
  color: #0085ff;
  height: 38px;
  margin-top: 8px;
  width: 135px;
  background-color: white;
  border: 1px solid #0085ff;
  padding: 0;
`;

export const CloseIcon = styled(Close).attrs({
  size: 20,
})`
  color: #0085ff;
`;

export const DownloadWrapper = styled.span`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  margin-top: 8px;
  height: 46px;
`;

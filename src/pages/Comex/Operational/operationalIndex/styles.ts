import styled from 'styled-components';
import { Colors, Fonts } from 'styles/constants';
export {
  PackageIcon,
  CogIcon,
  TogglerOpenIcon,
  TogglerCloseIcon,
} from 'styles/components/icons';

export { Button } from 'styles/components';

export const Container = styled.div`
  flex-direction: column;
  height: 100%;
  display: flex;
  border-radius: 10px;
  hr {
    border: 1px solid ${Colors.Gray30};
    margin: 0px 15px;
  }
`;

export const Header = styled.header`
  display: flex;
  /* display: grid; */
  /* grid-template-columns: 1fr 1fr 1fr; */
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  font-size: 24px;
  font-family: ${Fonts.GilroySemiBold};

  div.wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;
export const ClickWrapper = styled.div`
  padding: 13px;
  background-color: ${Colors.White};
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: auto;
  width: max-content;
`;
export const Filter = styled.div`
  display: flex;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
  border-radius: 5px;
  background-color: ${Colors.White};
  animation: ContentSlideIn 500ms ease forwards;
  box-shadow: 1px 10px 10px rgb(0 0 0 / 10%);
  border-left: 10px solid ${Colors.DarkBlue};
  margin-bottom: 20px;
`;
export const FilterInput = styled.input`
  border: 1px solid ${Colors.Gray50};
  padding: 15px;
  border-radius: 5px;
  min-width: 200px;
  max-height: 50px;
  font-family: ${Fonts.GilroyRegular};
`;
export const FilterSelect = styled.select`
  border: 1px solid ${Colors.Gray50};
  padding: 15px;
  border-radius: 5px;
  min-width: 200px;
  max-height: 50px;
  font-family: ${Fonts.GilroyRegular};
`;

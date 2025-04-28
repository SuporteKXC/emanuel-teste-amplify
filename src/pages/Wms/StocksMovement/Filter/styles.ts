import styled from 'styled-components'
import { Colors, fonts } from 'styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 8px;
`; 

export const FormContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr 1fr 0.2fr 0.2fr 0.4fr;
gap: 5px;
padding: 8px;
align-items: center;
justify-content: center;
border-radius: 10px;
background-color: white;
`

export const Checks = styled.div`
display: flex;
padding:8px;
border-radius: 10px;
background-color: white;
margin-bottom: 15px;
label{
margin-right: 10px;
margin-left: 10px;
}
`

export const Update = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const ContentUpdate = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: row;
  font-size: 13px;
  color: ${Colors.Gray50};
  font-family: ${fonts.GilroySemiBold};
  p {
    font-family: ${fonts.GilroyRegular};
  }
`;

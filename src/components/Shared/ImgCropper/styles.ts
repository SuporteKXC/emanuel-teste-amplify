import styled from 'styled-components';
import { Colors, ColorScheme, Fonts } from 'styles/constants';
export { ModalHeader, ModalBody, ModalContent } from 'styles/components/modals';
export { Button } from 'styles/components/buttons';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 24px;
  input[type='file'] {
    height: 0;
    position: absolute;
    left: -30000px;
  }
`;

export const Info = styled.div`
  margin-top: 24px;
  text-align: center;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-family: ${Fonts.GilroySemiBold};
  color: ${ColorScheme.Text};
`;

export const HelpText = styled.p`
  font-size: 11px;
`;

// previews

export const SmallPreviewContainer = styled.figure`
  width: 200px;
  height: 200px;
  border-radius: 6px;
  background-color: ${Colors.Gray10};
  border: 1px solid ${Colors.Gray50};
  overflow: hidden;
  cursor: pointer;
`;

export const SmallPreviewImage = styled.img.attrs({ alt: 'prévia da logo' })`
  max-width: 100%;
  height: auto;
`;

export const PreviewContainer = styled.figure`
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
`;

export const PreviewImage = styled.img.attrs({ alt: 'prévia da logo' })`
  max-width: 100%;
  height: auto;
`;

// cropper

export const CropperContainer = styled.div`
  width: 320px;
  height: 320px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${Colors.Gray40};
`;

export const ModalActionButtons = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

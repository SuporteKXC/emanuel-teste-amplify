import React from "react";
import * as S from "./styles";

export interface StepProps {
  title?: string | number | null;
  value?: string | number | null;
  status?: 'alert' | 'active' | 'none';
}

interface ProgressProps {
  steps: StepProps[];
}

export const ProgressSteps = React.memo(
  ({ steps }: ProgressProps): JSX.Element => (
    <S.Container>
      <S.Content>
        {steps.map((step, index) => (
          <S.Item key={index} status={step?.status}>
            <S.Title>{step?.title}</S.Title>
            <S.Circle status={step?.status}/>
            <S.Value>{step?.value}</S.Value>
          </S.Item>
        ))}
      </S.Content>
    </S.Container>
  )
);

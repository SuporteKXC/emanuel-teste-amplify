import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import * as S from "./styles";

export const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  const handleTime = useCallback((): void => {
    setInterval(() => setTime(new Date()), 60000);
  }, []);

  useEffect(() => {
    handleTime();
  }, [handleTime]);

  return (
    <S.Container>
      <S.Hours>{format(time, "HH:mm")}</S.Hours>
      <S.Gerasinergia>Gera Sinergia ®</S.Gerasinergia>
    </S.Container>
  );
};

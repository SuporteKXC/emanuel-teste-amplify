import React, { useCallback } from 'react';
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { LanguageState, LanguageActions } from 'store/ducks/language';

import * as S from './styles';

const LanguageSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { language } = useSelector<RootStateOrAny, LanguageState>(
    (state) => state.language
  );

  const onChangeLanguage = useCallback(
    (language: string) => {
      dispatch(LanguageActions.setLanguage(language));
    },
    [dispatch]
  );

  return (
    <S.Container>
      <S.Button
        onClick={() => onChangeLanguage('pt')}
        active={language === 'pt'}
      >
        PT
      </S.Button>
      <S.Button
        onClick={() => onChangeLanguage('en')}
        active={language === 'en'}
      >
        EN
      </S.Button>
      <S.Button
        onClick={() => onChangeLanguage('es')}
        active={language === 'es'}
      >
        ES
      </S.Button>
      <S.Button
        onClick={() => onChangeLanguage('de')}
        active={language === 'de'}
      >
        DE
      </S.Button>
    </S.Container>
  );
};

export {LanguageSelector};

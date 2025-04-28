import React, { useRef, useCallback, useState, useEffect } from 'react';

import * as S from './styles';

const ControlTower: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleClick = useCallback(() => {
    if (ref.current) {
      if (window.document.fullscreenElement) {
        if (window.document.exitFullscreen) {
          window.document.exitFullscreen();
        }
      } else {
        ref.current.requestFullscreen();
      }
    }
  }, []);

  const handleKeyDown = useCallback(() => {
    setIsFullscreen((v) => !v);
  }, []);

  useEffect(() => {
    if (window.document) {
      window.document.addEventListener('fullscreenchange', handleKeyDown);
    }

    return () => {
      window.document.removeEventListener('fullscreenchange', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <S.Container ref={ref}>
      <S.Button onClick={handleClick}>
        {isFullscreen ? <S.IconExitFullscreen /> : <S.IconFullscreen />}
      </S.Button>
      <S.Iframe
        frameBorder={0}
        width="100%"
        height="100%"
        src="https://analytics.zoho.com/open-view/1432280000066184917/39d52090c8e4668983a61138476baf4b"
      />
    </S.Container>
  );
};

export { ControlTower };

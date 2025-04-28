import React, { useRef, useCallback, useState, useEffect } from 'react';

import * as S from './styles';

const StocksDashboard: React.FC = () => {
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
        width="800"
        height="600"
        src="https://analytics.zoho.com/open-view/1432280000170615805/d11f1f510c54d781f28a6eb0c987d187"
      />
    </S.Container>
  );
};

export default StocksDashboard;

import * as S from "./styles";
import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  Fullscreen as FullScreenLogo,
  ExitFullscreen,
} from "@styled-icons/boxicons-regular";

export const AntecipationGr: React.FC = () => {
  const [showLogo, setShowLogo] = useState(true);
  const handle = useFullScreenHandle();

  const handleEnterFullScreen = () => {
    setShowLogo(false);
    handle.enter();
  };

  return (
    <S.Container>
      <FullScreen handle={handle}>
        <S.GrContainer>
          <iframe
            frameBorder={0}
            src="https://analytics.zoho.com/open-view/1432280000089747759/805dbea58304c2662fb3c71219c4dc2c "></iframe>
          {showLogo && (
            <FullScreenLogo
              onClick={handleEnterFullScreen}
              size={34}
              style={{
                position: "absolute",
                color: "gray",
                cursor: "pointer",
                top: "120px",
                right: "40px",
              }}
            />
          )}
        </S.GrContainer>
        {handle.active ? (
          <ExitFullscreen
          onClick={() => {
            handle.exit();
            setShowLogo(true);
          }}
          size={40}
          color={"gray"}
          style={{
            position: "absolute",
            right: "35",
            top: "2",
            cursor: "pointer",
          }}
          />
        ) : (
          ""
        )}
      </FullScreen>
    </S.Container>
  );
};

export default AntecipationGr;

import * as S from "./styles";
import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  Fullscreen as FullScreenLogo,
  ExitFullscreen,
} from "@styled-icons/boxicons-regular";

export const KpiDashboard: React.FC = () => {
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
            src="https://analytics.zoho.com/open-view/1432280000161257172/a08c74b4e55026f4a8ee711e6cb84ee7 "
          ></iframe>
          {showLogo && (
            <FullScreenLogo
              onClick={handleEnterFullScreen}
              size={34}
              style={{
                position: "absolute",
                color: "gray",
                cursor: "pointer",
                top: "200px",
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
            size={50}
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

export default KpiDashboard;

import * as S from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import {
  Fullscreen as FullScreenLogo,
  ExitFullscreen,
} from "@styled-icons/boxicons-regular";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import { useDashboards } from "@/hooks/useDashboards";
import { Loading } from "../shared/Forms/Input/styles";

interface IDashboardRenderProps {
  moduleId: number,
}

export const DashboardRender: React.FC<IDashboardRenderProps> = ({ moduleId }) => {
  const [showLogo, setShowLogo] = useState(true);
  const handle = useFullScreenHandle();
  const { dashboardPageUrl } = useParams();

  const { data } = useDashboards(moduleId)

  const handleEnterFullScreen = () => {
    setShowLogo(false);
    handle.enter();
  };

  const findIFrame = data?.find((dashboard: any) => dashboard.page_url === dashboardPageUrl)
  const htmlFrame = findIFrame ? findIFrame.script : "<iframe></iframe>" 

  const dashboardIFrame = DOMPurify.sanitize(htmlFrame, { ADD_TAGS: ["iframe"] });

  const mainIFrameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(mainIFrameRef.current) {
      mainIFrameRef.current.children[0].className = "w-full h-screen"
    }
    const checkElement = setInterval(() => {
      if(mainIFrameRef.current) {
        if (mainIFrameRef?.current?.children[0].className != "w-full h-screen") {
          mainIFrameRef.current.children[0].className = "w-full h-screen"
        } else {
          clearInterval(checkElement)
        }
      }
    }, 500);

  }, [dashboardIFrame]);

  return (
    <S.Container>
      <FullScreen handle={handle}>
        <S.GrContainer>
          {dashboardIFrame == "<iframe></iframe>"
            ? <div className="w-full h-screen flex justify-center">
                <Loading size={30} />
              </div>
            : <div ref={mainIFrameRef} className="w-full h-screen" dangerouslySetInnerHTML={{ __html: dashboardIFrame }} />
          }
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

export default DashboardRender;

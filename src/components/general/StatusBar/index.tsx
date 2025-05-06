import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useAuth } from "hooks";
import { FetchUserImageActions, LogoutActions } from "store/ducks";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "services";
import { AuthBar } from "@/components/ui/AuthBar";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Language } from "@/components/shared";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Country from "@/components/shared/Country";

export const StatusBar: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const { data: userImageLink, loading: loadingImage } = useSelector(
    (state: RootState) => state.userImage
  );

  const fetchUserImage = useCallback(() => {
    dispatch(FetchUserImageActions.request(profile?.image_key));
  }, [profile?.image_key, dispatch]);

  useEffect(() => {
    if (!profile?.image_key) return;
    fetchUserImage();
  }, [profile?.image_key]);

  const handleLogout = useCallback(async (): Promise<void> => {
    dispatch(LogoutActions.request());
    navigate("/");
  }, [dispatch]);

  if (!profile) return null;

  useEffect(() => {
    const handleAccessRegistration = async () => {
      await api.post(`/user/last-access`);
    };

    document.addEventListener("visibilitychange", (e) => {
      handleAccessRegistration();
    });

    window.addEventListener("beforeunload", (e) => {
      handleAccessRegistration();
    });

    return () => {
      document.removeEventListener("visibilitychange", () => {});
      document.removeEventListener("beforeunload", () => {});
    };
  }, []);

  const splitPathname = pathname !== "/" ? pathname.split("/") : [];
  const currentRoute =
    splitPathname.length > 0
      ? t(`general.routes./${splitPathname[1]}/${splitPathname[2]}`)
      : "";

  return (
    <section className="w-full p-4 ">
      <AuthBar
        currentPage={currentRoute ?? ""}
        user={{
          name: profile.name,
          avatar: userImageLink ?? undefined,
          options: [{ label: "Sair", action: () => handleLogout() }],
        }}
      >
        <Language />
        <Country />
      </AuthBar>
    </section>
  );
};

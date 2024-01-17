import { useQuery } from "@tanstack/react-query";
import { getMeFn } from "api/auth.api";
import { getAccessToken } from "helpers/getToken";
import { createContext, useContext, useEffect, useState } from "react";
import { IUser, IUserResponse } from "types/authTypes";

const AuthContext = createContext<
  Partial<{
    user: IUser | null;
    isAuth: boolean;
    setAuthStatus: (val: boolean) => void;
  }>
>({});
const { Provider } = AuthContext;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthState must be used in AuthProvider");

  return context;
};

export const AuthProvider = (props: any) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("auth"));
  const { data: user, isLoading } = useQuery<IUserResponse, Error>({
    queryKey: ["getMe"],
    queryFn: getMeFn,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!getAccessToken(),
  });

  const setAuthStatus = (status: boolean) => {
    if (!status) {
      setIsAuth(false);
      localStorage.removeItem("auth");
      return;
    }
    setIsAuth(true);
  };
  useEffect(() => {
    if (user?.data) {
      setAuthStatus(true);
    }
  }, [user]);

  if (isLoading) console.log("loading"); // Add preloader

  return (
    <Provider
      value={{
        user: user?.data,
        isAuth,
        setAuthStatus,
      }}
      {...props}
    />
  );
};

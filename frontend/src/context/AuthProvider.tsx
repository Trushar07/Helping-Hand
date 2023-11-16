import React, { createContext, useState, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export interface AuthContextType {
  auth: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      accessToken: string | undefined;
      refreshToken: string | undefined;
    }>
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    accessToken: undefined,
    refreshToken: undefined,
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

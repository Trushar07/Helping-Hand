import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { AuthContextType } from "../context/AuthProvider";

const useAuth = (): AuthContextType => {
  return useContext(AuthContext) as AuthContextType;
};

export default useAuth;

import { useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

function useLogout() {
  const [data, setData] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const { auth, setAuth } = useAuth();

  const logout = async () => {
    console.log("logout called");

    try {
      const { data } = await axiosPrivate.post("logout", {
        refresh: auth.refreshToken,
      });
      setData(data);
      console.log(data);
      setAuth({
        accessToken: undefined,
        refreshToken: undefined,
      });
      console.log(auth);
      axiosPrivate.defaults.headers.common["Authorization"] = null;
    } catch (e) {
      console.error(e);
    }
  };

  return logout;
}

export default useLogout;

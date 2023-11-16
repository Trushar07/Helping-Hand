import axios from "../api/axios";
import useAuth from "./useAuth";

function useRefreshToken() {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      "/token/refresh",
      {
        refresh: auth.refreshToken,
      },
      {
        withCredentials: true,
      }
    );

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response?.data);
      return {
        ...prev,
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      };
    });
    return response.data.access;
  };

  return refresh;
}

export default useRefreshToken;

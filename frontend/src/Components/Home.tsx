import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function Home(): JSX.Element {
  const [data, setData] = useState({});
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosPrivate.get("/home");
        setData(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <>
      <NavBar />
      <p>{data.message}</p>;
    </>
  );
}

export default Home;

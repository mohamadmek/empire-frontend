import { useEffect, useState } from "react";
import { Login, Register } from "../components";
import { setAccessToken } from "../utilities/CommonUtilities";
import Services from "../services";
import MainScreen from "./MainScreen";

const { API } = Services;
export default function Home() {
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("F");
  const [isLoadingLocal, setIsLoadingLocal] = useState(true);
  const toggleIsLogin = () => setIsLogin(!isLogin);

  const prepareData = async () => {
    setIsLoadingLocal(true);
    const storageUserData = localStorage.getItem("userData");
    if (storageUserData != null) {
      const parsedData = JSON.parse(storageUserData);
      setAccessToken(parsedData.auth_token);
      try {
        const result = await API.getUserWithToken();
        const { data } = result;
        if (data.success) {
          setUserData(data.data);
          setFavorites(data.data.favorites);
          setSelectedUnit(data.data.unit);
        } else {
          setUserData(null);
        }
      } catch (error) {
        setUserData(null);
        console.error("getUserWithToken ", error);
      }
    }
    setIsLoadingLocal(false);
  };

  useEffect(() => {
    prepareData();
    return () => {};
  }, []);

  if (isLoadingLocal) {
    return <div className="h-full w-full bg-gray-300"></div>;
  }
  return (
    <>
      {!userData ? (
        isLogin ? (
          <Login
            favorites={favorites}
            setFavorites={setFavorites}
            setUserData={setUserData}
            toggleIsLogin={toggleIsLogin}
            setSelectedUnit={setSelectedUnit}
          />
        ) : (
          <Register
            favorites={favorites}
            setFavorites={setFavorites}
            setUserData={setUserData}
            toggleIsLogin={toggleIsLogin}
            setSelectedUnit={setSelectedUnit}
          />
        )
      ) : (
        <MainScreen
          setUserData={setUserData}
          favorites={favorites}
          setFavorites={setFavorites}
          selectedUnit={selectedUnit}
          setSelectedUnit={setSelectedUnit}
        />
      )}
    </>
  );
}

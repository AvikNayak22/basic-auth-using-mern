import { useEffect, useState } from "react";
import { handleError } from "../utils/handleError";
axios.defaults.withCredentials = true;

import axios from "axios";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/my-details");
      setIsLoggedIn(true);
      setUserData(response.data.user);
    } catch (error) {
      if (error.response.status === 401) {
        setIsLoggedIn(false);
      }
      handleError(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>{isLoggedIn ? <>{userData.username}</> : "You are not logged in"}</div>
  );
};

export default Home;

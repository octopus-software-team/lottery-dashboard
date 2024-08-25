import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { setUser } from "../redux/authedUser";
import { jwtDecode } from "jwt-decode";
import useGetUser from "../hooks/useGetUser";
import Loader from "../ui/Loader";

export default function ProtectionProvider({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const [cookies] = useCookies(["token", "id"]);
  const token = cookies?.token;
  const id = cookies?.id;

  let decodedToken = null;
  let isExpired = false;

  if (token) {
    try {
      decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      isExpired = decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    axiosInstance.defaults.headers.common["Authorization"] = `bearer ${token}`;
  }

  const {
    data: profile,
    isLoading: isFetchingProfile,
    isFetched,
    refetch
  } = useGetUser(Boolean(token && id && !isExpired));

  useLayoutEffect(() => {
    if (!token || !id) {
      setRedirect(true);
      return;
    }

    if (isExpired) {
      setRedirect(true);
      return;
    }

    if (Number(decodedToken?.sub) !== id) {
      setRedirect(true);
      return;
    }

    if (isFetched) {
      if (profile) {
        dispatch(setUser(profile));
        setLoading(false);
      } else {
        console.log("Profile data not available, refetching...");
        refetch().then(() => setLoading(false));
      }
    } else {
      refetch().then(() => setLoading(false));
    }
  }, [
    decodedToken?.sub,
    id,
    isExpired,
    profile,
    isFetched,
    refetch,
    dispatch,
    navigate,
    token,
    decodedToken
  ]);

  useLayoutEffect(() => {
    if (redirect) {
      delete axiosInstance.defaults.headers.common["Authorization"];
      navigate("/login");
    }
  }, [redirect, navigate]);

  if (loading || isFetchingProfile) {
    return <Loader />;
  }

  return <>{children}</>;
}

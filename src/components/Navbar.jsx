import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { axiosInstance } from "./../utils/axiosInstance";
import { toast } from "react-toastify";
import { errorHandle } from "../utils/helpers";
import { logout } from "../redux/authedUser";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authedUser.user);
  const [, , removeCookie] = useCookies(["token", "id"]);
  const navigate = useNavigate();
  const settingMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        settingMenuRef.current &&
        !settingMenuRef.current.contains(event.target) &&
        !event.target.closest(".settingBtn")
      ) {
        setShowSettingsModal(false);
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        !event.target.closest(".user_dropdown")
      ) {
        setShowUserModal(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSettingsToggle = () => {
    setShowSettingsModal(!showSettingsModal);
    if (!showSettingsModal) setShowUserModal(false);
  };

  const handleUserToggle = () => {
    setShowUserModal(!showUserModal);
    if (!showUserModal) setShowSettingsModal(false);
  };

  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        removeCookie("token", { path: "/" });
        removeCookie("id", { path: "/" });
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error.message);
      toast.error(errorHandle(error, "حدث خطأ في تسجيل الخروج"));
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/assets/images/logo.svg" alt="logo" />
          </Link>
        </div>
        <ul className="nav_menu">
          <li>
            <NavLink className="nav_link" to="/">
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/lotteries">
              قائمة القرعات
            </NavLink>
          </li>
          <li>
            <NavLink className="nav_link" to="/investors">
              بيانات المساهمين
            </NavLink>
          </li>
          <li>
            <span
              className="nav_link settingBtn"
              onClick={handleSettingsToggle}
              aria-expanded={showSettingsModal}
              aria-controls="settingsMenu"
              role="button"
            >
              الاعدادات{" "}
              <img src="/assets/images/arrowDown.svg" alt="arrow" />
            </span>
            <div
              ref={settingMenuRef}
              id="settingsMenu"
              className={`dropMenu settings ${showSettingsModal ? "show" : ""}`}
            >
              <ul>
                <li>
                  <NavLink
                    className="nav_link"
                    to="/slider-settings"
                    onClick={() => setShowSettingsModal(false)}
                  >
                    <div className="icon">
                      <img src="/assets/images/dots.svg" alt="dots" />
                    </div>
                    <h6>السلايدر</h6>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav_link"
                    to="/account-settings"
                    onClick={() => setShowSettingsModal(false)}
                  >
                    <div className="icon">
                      <img
                        src="/assets/images/settings.svg"
                        alt="settings"
                      />
                    </div>
                    <h6>الإعدادات</h6>
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <div className="user_dropdown">
          <div
            className="button_drop"
            onClick={handleUserToggle}
            aria-expanded={showUserModal}
            aria-controls="userMenu"
            role="button"
          >
            <div className="user">
              <img src="/assets/images/user.svg" alt="user" />
              <span className="status"></span>
            </div>
            <span className="user_name">{user?.name}</span>
            <img src="/assets/images/arrowDown.svg" alt="arrow" />
            <div
              ref={userMenuRef}
              id="userMenu"
              className={`dropMenu ${showUserModal ? "show" : ""}`}
            >
              <ul>
                <li>
                  <NavLink
                    className="nav_link"
                    onClick={() => {
                      setShowUserModal(false), handleLogout();
                    }}
                  >
                    <div className="icon">
                      <img
                        src="/assets/images/logout.svg"
                        alt="logout"
                      />
                    </div>
                    <h6>تسجيل الخروج</h6>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authedUser";
import { useCookies } from "react-cookie";
import { errorHandle } from "../utils/helpers";
import InputField from "../ui/InputField";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["token", "id"]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      if (res.data.data) {
        toast.success("تم تسجيل الدخول بنجاح");
        dispatch(setUser(res.data.data));
        navigate("/");
        setCookie("token", res.data.data.token, {
          path: "/",
          secure: true,
          sameSite: "Strict"
        });
        setCookie("id", res.data.data.id, {
          path: "/",
          secure: true,
          sameSite: "Strict"
        });
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `bearer ${res.data.data.token}`;
      } else {
        toast.error("اسم المستخدم او كلمة المرور غير صحيحة");
      }
    } catch (error) {
      console.log(error);
      toast.error(errorHandle(error, "اسم المستخدم او كلمة المرور غير صحيحة"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="login_form">
        <div className="logo">
          <img src="/assets/images/logo.svg" alt="logo" />
        </div>
        <h1>مرحباً بعودتك 👋</h1>
        <form className="form_ui" onSubmit={handleSubmit}>
          <InputField
            label="اسم المستخدم"
            placeholder="ادخل اسم المستخدم"
            type="text"
            name="username"
            id="username"
            required
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <InputField
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            type="password"
            name="password"
            id="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <div className="input-field">
            <button
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading}
              type="submit"
              className="submit"
            >
              تسجيل الدخول{" "}
              <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

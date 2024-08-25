import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import InputField from "../ui/InputField";
import ReactFlagsSelect from "react-flags-select";
import SubmitButton from "./../ui/SubmitButton";

export default function Settings() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const getSettigs = async () => {
      try {
        const res = await axiosInstance.get("/getSettings");
        if (res?.data?.status === 200) {
          console.log(res.data.data);
          setFormData((prev) => ({
            ...prev,
            image: res.data.data.image || "",
            email: res.data.data.email || "",
            firstname: res.data.data.firstname || "",
            lastname: res.data.data.lastname || "",
            job: res.data.data.job || "",
            country: res.data.data.country || "SA",
            twitter: res.data.data.twitter || "",
            linkedin: res.data.data.linkedin || "",
            facebook: res.data.data.facebook || "",
            google: res.data.data.google || "",
            youtube: res.data.data.youtube || "",
            instagram: res.data.data.instagram || ""
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSettigs();
  }, []);

  const handleSelectCountry = (countryCode) => {
    setFormData((prev) => ({
      ...prev,
      country: countryCode
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/settings", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res?.data?.status === 200) {
        toast.success("تم تحديث بياناتك بنجاح");
        navigate("/");
      } else toast.error(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="settings">
      <div className="container">
        <div className="row">
          <PageHeader
            base="الاعدادات"
            path={[{ name: "إعدادات الحساب", path: "/account-settings" }]}
          />
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="header">
                <h1>إعدادات الحساب</h1>
              </div>
              <form className="form_ui account_form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-12 p-2 mb-3">
                    <div className="img_field">
                      <h6 className="title">إضافة صورة رئيسية</h6>
                      <div className="img">
                        {formData.image === "" ? (
                          <span className="icon">
                            <img src="/assets/images/img.svg" alt="Main" />
                          </span>
                        ) : (
                          <img
                            src={
                              formData?.image?.type?.startsWith("image/")
                                ? URL.createObjectURL(formData.image)
                                : formData.image
                            }
                            alt="Main"
                          />
                        )}
                      </div>
                      <label htmlFor="image" className="upload">
                        <input
                          type="file"
                          name="image"
                          id="image"
                          accept="image/*"
                          multiple={false}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              image: e.target.files[0]
                            })
                          }
                        />
                        <div className="content">
                          <img src="/assets/images/upload.svg" alt="upload" />
                          <p>رفع صورة</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <div className="input-field">
                      <label>الاسم</label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          placeholder="الاسم الاول"
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstname: e.target.value
                            })
                          }
                        />
                        <Form.Control
                          placeholder="الاسم الاخير"
                          type="text"
                          id="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastname: e.target.value
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="البريد الالكتروني"
                      placeholder="أدخل البريد الالكتروني"
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="الوظيفة"
                      placeholder="أدخل  الوظيفة"
                      id="job"
                      name="job"
                      type="text"
                      value={formData.job}
                      onChange={(e) =>
                        setFormData({ ...formData, job: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <div className="input-field">
                      <label htmlFor="country">البلد</label>
                      <ReactFlagsSelect
                        searchable={true}
                        selectedSize={false}
                        selected={formData?.country}
                        onSelect={(code) => {
                          handleSelectCountry(code, setFormData);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="twitter"
                      id="twitter"
                      name="twitter"
                      type="text"
                      value={formData.twitter}
                      onChange={(e) =>
                        setFormData({ ...formData, twitter: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="linkedin"
                      id="linkedin"
                      name="linkedin"
                      type="text"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="instagram"
                      id="instagram"
                      name="instagram"
                      type="text"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData({ ...formData, instagram: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="facebook"
                      id="facebook"
                      name="facebook"
                      type="text"
                      value={formData.facebook}
                      onChange={(e) =>
                        setFormData({ ...formData, facebook: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="google"
                      id="google"
                      name="google"
                      type="text"
                      value={formData.google}
                      onChange={(e) =>
                        setFormData({ ...formData, google: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-6 col-12 p-2">
                    <InputField
                      label="youtube"
                      id="youtube"
                      name="youtube"
                      type="text"
                      value={formData.youtube}
                      onChange={(e) =>
                        setFormData({ ...formData, youtube: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-12 p-2 mt-5 d-flex justify-content-end">
                    <SubmitButton
                      name="حفظ"
                      loading={loading}
                      className={"submit_btn"}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

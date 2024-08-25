import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { errorHandle } from "../../utils/helpers";
import { axiosInstance } from "../../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import CheckField from "../../ui/CheckField";
import useGetLotteries from "../../hooks/useGetLotteries";

export default function RulesForm({ formData, setFormData, setForm }) {
  const { id } = useParams();
  const { refetch } = useGetLotteries();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endPoint = id ? `/editLottery` : "/addLottery";
    const payload = {
      title: formData.title,
      description: formData.description,
      live_link: formData.live_link,
      from_age: formData.from_age,
      to_age: formData.to_age,
      policy: formData.policy,
      to_date: formData.to_date,
      age: formData.age,
      sex: formData.sex,
      box_id: formData.box_id
    };

    if (id) {
      payload.lottery_id = id;
    }

    if (typeof formData.image === "object") {
      payload.image = formData.image;
    }

    const images = formData.lottery_images.filter(
      (image) => typeof image === "object"
    );

    if (images.length > 0) {
      payload.lottery_images = images;
    }

    const newCategories = formData.categories.filter((c) => !c.id);

    payload.categories = newCategories;

    try {
      const res = await axiosInstance.post(endPoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.data) {
        toast.success(id ? "تم تحديث القرعة بنجاح" : "تم تسجيل القرعة بنجاح");
        navigate("/lotteries");
        queryClient.invalidateQueries(["lottery", id]);
        refetch();
      } else {
        toast.error(res.data.message || "حدث خطأ ما");
      }
    } catch (error) {
      console.log(error);

      toast.error(errorHandle(error, "حدث خطأ ما"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form_ui" onSubmit={handleSubmit}>
      <div className="row m-0">
        <div className="col-lg-6 col-12 p-2">
          <CheckField
            name="العمر (اجباري)"
            id="age"
            checked={Number(formData.age) === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                age: e.target.checked ? 1 : 0
              }))
            }
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CheckField
            name="رقم العضوية (اجباري)"
            id="box_id"
            checked={Number(formData.box_id) === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                box_id: e.target.checked ? 1 : 0
              }))
            }
          />
        </div>
        <div className="col-lg-6 col-12 p-2">
          <CheckField
            name="النوع (اجباري)"
            id="sex"
            checked={Number(formData.sex) === 1}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                sex: e.target.checked ? 1 : 0
              }))
            }
          />
        </div>
        <div className="col-12 p-2 mt-3 d-flex justify-content-end">
          <div className="d-flex gap-3">
            <button className="prev" onClick={() => setForm("media")}>
              السابق
            </button>
            <button
              className="next"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading}
              type="submit"
            >
              حفظ <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

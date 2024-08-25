import { useState } from "react";
import InputField from "./../../ui/InputField";
import { axiosInstance } from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import useGetLotteryWinners from "../../hooks/useGetLotteryWinners";

export default function StartLottery({
  lottery,
  setFormStep,
  formData,
  setFormData
}) {
  const [loading, setLoading] = useState(false);
  const { refetch } = useGetLotteryWinners(
    formData.lottery_id,
    formData.category_id,
    formData.main
  );

  const handleStartLottery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/getLotteriesWinners", formData);
      if (res?.data?.status === 200) {
        toast.success("تم بدء القرعة بنجاح");
        setFormStep("choose_winner");
        refetch();
      } else toast.error(res.data.message);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lottery_info">
        <h3>{lottery?.title}</h3>
        <ul>
          <li>
            <img src="/assets/images/calendar.svg" alt="calender" />
            اخر موعد للتسجيل: {lottery?.to_date}
          </li>
          <li>
            <img src="/assets/images/users.svg" alt="users" />
            عدد المسجلين بالقرعة حتى الآن: {lottery?.usersCount}
          </li>
        </ul>
      </div>
      <div className="lotteries_type">
        {lottery?.categories.map((item, index) => (
          <label htmlFor={item.id} key={index}>
            <input
              type="radio"
              id={item.id}
              name="category"
              checked={formData.category_id === item.id}
              onChange={() =>
                setFormData({ ...formData, category_id: item.id })
              }
            />
            <div className="content">
              <h3>{item.title}</h3>
            </div>
          </label>
        ))}
      </div>
      <div className="start_lottery_img">
        <img src="/assets/images/start.svg" alt="" />
      </div>
      <form
        className="form_ui"
        onSubmit={handleStartLottery}
        style={{ padding: "0 16px" }}
      >
        <div className="row">
          <div className="col-lg-6 col-12 p-2">
            <InputField
              label="عدد السحوبات في القرعة الواحدة"
              placeholder="أدخل عدد السحوبات في القرعة الواحدة"
              type="number"
              required
              id="count"
              name="count"
              min="1"
              value={formData.count}
              onChange={(e) =>
                setFormData({ ...formData, count: e.target.value })
              }
            />
          </div>
          <div className="col-lg-6 col-12 p-2">
            <div className="input-field">
              <label>نوع القرعة</label>
              <div className="check_lottery">
                <label htmlFor="main">
                  <input
                    type="radio"
                    id="main"
                    name="lottery_type"
                    checked={formData.main === 1}
                    onChange={() => setFormData({ ...formData, main: 1 })}
                  />
                  <div className="content">
                    <h6>قرعة رئيسية </h6>
                  </div>
                </label>
                <label htmlFor="reservoir">
                  <input
                    type="radio"
                    id="reservoir"
                    name="lottery_type"
                    checked={formData.main === 0}
                    onChange={() => setFormData({ ...formData, main: 0 })}
                  />
                  <div className="content">
                    <h6>قرعة احتياطية</h6>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="col-12 p-2 mt-3 d-flex justify-content-end">
            <button
              className="submit_btn"
              type="submit"
              style={{ opacity: loading ? 0.7 : 1 }}
              disabled={loading}
            >
              بدء القرعة{" "}
              <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

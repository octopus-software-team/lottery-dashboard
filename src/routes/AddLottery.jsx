import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DetailsForm from "../components/add-lottery/DetailsForm";
import MediaForm from "../components/add-lottery/MediaForm";
import RulesForm from "../components/add-lottery/RulesForm";
import ParticipantsForm from "../components/add-lottery/ParticipantsForm";
import useGetLottery from "../hooks/useGetLottery";

const stepsAr = {
  details: "إضافة تفاصيل القرعة",
  media: "إضافة صور السلايدر",
  rules: "إضافة قواعد القرعة",
  participants: "قائمة المشاركين"
};

export default function AddLottery() {
  const { id } = useParams();
  const { data: lottery } = useGetLottery(id);

  const categoriesInitial = {
    title: "",
    count: "",
    type: "new"
  };

  const [form, setForm] = useState("details");
  const [formData, setFormData] = useState({});

  const steps = id
    ? ["details", "media", "rules", "participants"]
    : ["details", "media", "rules"];

  useEffect(() => {

    setFormData({
      categories: lottery?.categories || [categoriesInitial],
      title: lottery?.title || "",
      description: lottery?.description || "",
      live_link: lottery?.live_link || "",
      from_age: lottery?.from_age || "",
      to_age: lottery?.to_age || "",
      policy: lottery?.policy || "",
      image: lottery?.image || "",
      to_date: lottery?.to_date || "",
      age: lottery?.age || 0,
      sex: lottery?.sex || 0,
      box_id: lottery?.box_id || 0,
      lottery_images: lottery?.images?.map((image) => image?.image) || []
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lottery]);

  return (
    <section className="add-lottery">
      <div className="container">
        <div className="row">
          <PageHeader
            path={[
              { name: "قائمة القرعات", path: "/lotteries" },
              {
                name: id ? "تعديل قرعة" : "اضافة قرعة",
                path: id ? `/edit-lottery/${id}` : "/add-lottery"
              }
            ]}
          />
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="wizard_tabs">
                {steps.map((fo, index) => (
                  <div
                    key={index}
                    className={`tab ${form === fo ? "active" : ""}`}
                    onClick={() => setForm(fo)}
                  >
                    <div className="circle_icon">
                      <span />
                    </div>
                    <h6>{stepsAr[fo]}</h6>
                  </div>
                ))}
              </div>
              {form === "details" && (
                <DetailsForm
                  formData={formData}
                  setForm={setForm}
                  setFormData={setFormData}
                  categoriesInitial={categoriesInitial}
                />
              )}
              {form === "media" && (
                <MediaForm
                  formData={formData}
                  setForm={setForm}
                  setFormData={setFormData}
                />
              )}
              {form === "rules" && (
                <RulesForm
                  formData={formData}
                  setForm={setForm}
                  setFormData={setFormData}
                />
              )}
              {form === "participants" && id && (
                <ParticipantsForm
                  formData={formData}
                  setForm={setForm}
                  setFormData={setFormData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

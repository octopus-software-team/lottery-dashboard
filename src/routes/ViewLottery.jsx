import { useEffect, useState } from "react";
import StartLottery from "../components/view-lottery/StartLottery";
import { useParams } from "react-router-dom";
import useGetLottery from "../hooks/useGetLottery";
import DataLoader from "./../ui/DataLoader";
import ChooseWinner from "../components/view-lottery/ChooseWinner";
import Results from "../components/view-lottery/Results";

const stepsAr = {
  start_lottery: "بدء القرعة",
  choose_winner: "اختيار الفائز",
  release_result: "إعلان النتائج"
};

export default function ViewLottery() {
  const { id } = useParams();
  const { data: lottery, isLoading } = useGetLottery(id);
  const [form, setForm] = useState("start_lottery");

  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      lottery_id: lottery?.id,
      category_id: lottery?.categories[0]?.id,
      main: 1,
      count: ""
    });
  }, [lottery]);

  return (
    <section className="view_lottery">
      <div className="container">
        <div className="row">
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="wizard_tabs">
                {["start_lottery", "choose_winner", "release_result"].map(
                  (fo, index) => (
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
                  )
                )}
              </div>
              {isLoading ? (
                <DataLoader />
              ) : (
                <>
                  {form === "start_lottery" && (
                    <StartLottery
                      lottery={lottery}
                      setFormStep={setForm}
                      formData={formData}
                      setFormData={setFormData}
                    />
                  )}
                  {form === "choose_winner" && (
                    <ChooseWinner lottery={lottery} formData={formData} />
                  )}
                  {form === "release_result" && (
                    <Results lottery={lottery} formData={formData} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

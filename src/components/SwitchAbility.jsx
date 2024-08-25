import { useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { errorHandle } from "../utils/helpers";
import { Form } from "react-bootstrap";

export default function SwitchAbility({ rowData }) {
  const { id: lottery_id } = useParams();
  const queryClient = useQueryClient();

  const [isChecked, setIsChecked] = useState(
    Number(rowData.does_he_comply_with_the_conditions) === 1 ? true : false
  );

  const handleChange = async () => {
    try {
      setIsChecked((prevState) => !prevState);
      const res = await axiosInstance.post("/changeLotteryUserStatus", {
        lottery_user_id: rowData.id,
        status: isChecked === true ? 0 : 1
      });

      if (res.status === 200) {
        queryClient.invalidateQueries(["lottery-users", lottery_id]);
      } else {
        setIsChecked(isChecked);
      }
    } catch (error) {
      setIsChecked(isChecked);
      errorHandle(error, "حدث خطأ في تعديل الحالة");
    }
  };

  return (
    <div className="switch">
      <Form.Check
        type="switch"
        id={rowData.id}
        name={rowData.id}
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
}

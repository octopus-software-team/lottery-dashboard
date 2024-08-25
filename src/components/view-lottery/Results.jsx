import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useGetLotteryWinners from "../../hooks/useGetLotteryWinners";
import DataLoader from "../../ui/DataLoader";

export default function Results({ lottery, formData }) {
  const { data: winners, isLoading } = useGetLotteryWinners(
    lottery?.id,
    formData?.category_id,
    formData?.main
  );

  const nationalIdTemplate = (rowData) => {
    return <span>{rowData?.user?.national_id}</span>;
  };

  const boxTemplate = (rowData) => {
    return <span>{rowData?.user?.box_id}</span>;
  };

  const lotteryType = (rowData) => {
    return <span>{rowData?.main === "1" ? "رئيسية" : "فرعية"}</span>;
  };

  const nameTemplate = (rowData) => {
    return <span>{rowData?.user?.full_name}</span>;
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
      <h3 className="table-title">الفائزين بالقرعة</h3>
      {isLoading ? (
        <DataLoader />
      ) : (
        <div className="table-container">
          <DataTable value={winners}>
            <Column field="id" header="ID" />
            <Column field="name" body={nameTemplate} header="الاسم" />
            <Column
              field="national_id"
              body={nationalIdTemplate}
              header="الرقم المدني للفائزين"
            />
            <Column field="box_id" body={boxTemplate} header="رقم العضوية" />
            <Column field="main" body={lotteryType} header="نوع القرعة" />
          </DataTable>
        </div>
      )}
    </>
  );
}

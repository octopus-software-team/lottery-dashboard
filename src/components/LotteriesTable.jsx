import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link, useSearchParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { errorHandle } from "../utils/helpers";
import { axiosInstance } from "../utils/axiosInstance";
import Pagination from "../ui/Pagination";
import DataLoader from "../ui/DataLoader";
import useGetLotteries from "../hooks/useGetLotteries";

export default function LotteriesTable() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const {
    data: lotteries,
    isLoading,
    refetch
  } = useGetLotteries({ page: currentPage });

  function truncate(inputString) {
    let truncateStringResult;
    if (inputString.length > 20) {
      truncateStringResult = inputString.substring(0, 20) + "...";
    } else {
      truncateStringResult = inputString;
    }
    return truncateStringResult;
  }

  const statusTemplate = (rowData) => {
    const toDate = new Date(rowData.to_date);
    const fromDate = new Date(rowData.from_date);
    const now = new Date();

    let status = "";
    let className = "";

    if (fromDate > now) {
      status = "مجدولة";
      className = "status-Scheduled";
    } else if (toDate <= now) {
      status = "بدأت";
      className = "status-Started";
    } else {
      status = "انتهت";
      className = "status-Ended";
    }

    return <span className={className}>{status}</span>;
  };

  const descriptionTemplate = (rowData) => {
    return (
      <div className="description">
        <p>{truncate(rowData.description)}</p>
      </div>
    );
  };

  const categoryTemplate = (rowData) => {
    return (
      <div className="category">
        <p>
          {rowData?.categories?.map((item, index) =>
            index < rowData.categories.length - 1
              ? item?.title + ", "
              : item?.title
          )}
        </p>
      </div>
    );
  };

  const actionsTemplate = (rowData) => {
    return (
      <div className="actions">
        <Dropdown>
          <Dropdown.Toggle>
            <img src="/assets/images/vertical-dots.svg" alt="dots" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={`/lotteries/edit-lottery/${rowData.id}`}>
                <img src="/assets/images/edit.svg" alt="edit" />
                تعديل القرعة
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <button
                onClick={async () => {
                  try {
                    const res = await axiosInstance.post(
                      "/changeLotteryStatus",
                      {
                        lottery_id: rowData.id,
                        type: Number(rowData?.type) === 1 ? 0 : 1
                      }
                    );
                    if (res.status === 200) {
                      toast.success(
                        Number(rowData?.type) === 1
                          ? "تم تعطيل القرعة بنجاح"
                          : "تم تفعيل القرعة بنجاح"
                      );
                      refetch();
                    }
                  } catch (error) {
                    console.log(error);
                    errorHandle(error, "حدث خطأ ما");
                  }
                }}
              >
                <img src="/assets/images/lott.svg" alt="lott" />
                {Number(rowData?.type) === 1 ? "تعطيل القرعة" : "تفعيل القرعة"}
              </button>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={`/lotteries/choose-winner/${rowData.id}`}>
                <img src="/assets/images/winner.svg" alt="view" />
                اختيار الفائز
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <>
      {isLoading ? (
        <DataLoader />
      ) : (
        <>
          <div className="table-container">
            <DataTable value={lotteries.data}>
              <Column field="id" header="ID" />
              <Column field="title" header="الاسم" />
              <Column body={descriptionTemplate} header="الوصف" />
              <Column body={categoryTemplate} header="التصنيف" />
              <Column field="users" header="عدد المسجلين" />
              <Column body={statusTemplate} header="الحالة" />
              <Column field="to_date" header="اخر موعد للتسجيل" />
              <Column body={actionsTemplate} />
            </DataTable>
          </div>
          {lotteries?.count > 10 && <Pagination count={lotteries?.count} />}
        </>
      )}
    </>
  );
}

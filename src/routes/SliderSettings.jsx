import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { errorHandle } from "../utils/helpers";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";
import PageHeader from "../components/PageHeader";
import useGetSlider from "../hooks/useGetSlider";
import DataLoader from "../ui/DataLoader";
import SliderCreateModal from "../ui/SliderCreateModal";

export default function SliderSettings() {
  const { data: slider, isLoading } = useGetSlider();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [row, setRow] = useState({});
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    slider_image: "",
    rank: "",
    title: "",
    description: ""
  });

  const addSlide = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endPoint = formData?.slider_id ? "/updateSlider" : "/addSlider";
      let payload = {
        rank: formData?.rank,
        title: formData?.title,
        description: formData?.description
      };
      if (formData.slider_id) {
        payload.slider_id = formData.slider_id;
      }
      if (typeof formData.slider_image === "object") {
        payload.slider_image = formData.slider_image;
      }
      if (formData.status) {
        payload.status = formData.status;
      }
      const res = await axiosInstance.post(endPoint, payload, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res?.data?.status === 200) {
        toast.success(
          formData?.slider_id
            ? "تم تعديل الاسلايد بنجاح"
            : "تم اضافة الاسلايد بنجاح"
        );
        setShowModal(false);
        queryClient.invalidateQueries(["slider"]);
        setFormData({
          slider_image: "",
          rank: "",
          title: "",
          description: ""
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      errorHandle(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlide = async (id) => {
    try {
      const res = await axiosInstance.get(`/deleteSlider/${id}`);
      if (res?.data?.status === 200) {
        toast.success("تم حذف الاسلايد بنجاح");
        queryClient.invalidateQueries(["slider"]);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      errorHandle(error, "حدث خطأ ما");
    }
  };

  const imageTemplate = (rowData) => {
    return (
      <div className="row_img">
        <img src={rowData?.image} alt="image" />
        <h6>{rowData.name || ""}</h6>
      </div>
    );
  };

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
    const status = rowData.status === "1" ? "مفعل" : "غير مفعل";
    return (
      <span
        className={rowData.status === "1" ? "status-Started" : "status-Ended"}
      >
        {status}
      </span>
    );
  };

  const descriptionTemplate = (rowData) => {
    return (
      <div className="description">
        <p>{truncate(rowData.description)}</p>
      </div>
    );
  };

  const deleteTemplate = (rowData) => {
    return (
      <button className="delete" onClick={() => deleteSlide(rowData.id)}>
        <img src="/assets/images/delete.svg" alt="" />
      </button>
    );
  };

  const updateTemplate = (row) => {
    return (
      <button
        className="edit"
        onClick={() => {
          setShowModal(true);
          setRow(row);
        }}
      >
        <img src="/assets/images/edit.svg" alt="" />
      </button>
    );
  };

  return (
    <section className="settings">
      <div className="container">
        <div className="row">
          <PageHeader
            base="الاعدادات"
            path={[{ name: "السلايدر", path: "/slider-settings" }]}
          />
          <div className="col-12 p-2">
            <div className="inner_card">
              <div className="header">
                <h1>السلايدر</h1>
                <div className="search_form">
                  <button onClick={() => setShowModal(true)}>
                    <img src="/assets/images/plus.svg" alt="filterIcon" />
                    اضافة اسلايد
                  </button>
                </div>
              </div>
              {isLoading ? (
                <DataLoader />
              ) : (
                <>
                  <div className="table-container">
                    <DataTable value={slider}>
                      <Column field="id" header="ID" />
                      <Column
                        field="image"
                        body={imageTemplate}
                        header="الصورة"
                      />
                      <Column field="title" header="النص" />
                      <Column
                        field="description"
                        body={descriptionTemplate}
                        header="الوصف"
                      />
                      <Column
                        field="status"
                        body={statusTemplate}
                        header="الحالة"
                      />
                      <Column field="rank" header="الترتيب" />
                      <Column body={updateTemplate} />
                      <Column body={deleteTemplate} />
                    </DataTable>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <SliderCreateModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        setFormData={setFormData}
        eventFun={addSlide}
        loading={loading}
        row={row}
        setRow={setRow}
      />
    </section>
  );
}

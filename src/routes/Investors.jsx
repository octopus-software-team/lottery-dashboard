import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { toast } from "react-toastify";
import { axiosInstance } from "../utils/axiosInstance";
import { errorHandle } from "../utils/helpers";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmDeleteModal from "./../ui/ConfirmDeleteModal";
import PageHeader from "../components/PageHeader";
import useGetImpotedUsers from "../hooks/useGetImpotedUsers";
import DataLoader from "../ui/DataLoader";
import Pagination from "../ui/Pagination";

export default function Investors() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");
  const currentPage = searchParams.get("page") || 1;
  const [searchValue, setSearchValue] = useState(search || "");
  const { data: investors, isLoading } = useGetImpotedUsers({
    page: currentPage
  });
  const [showModal, setShowModal] = useState(false);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    setSearchValue(search || "");
  }, [search]);

  const handleImportInvestors = async (selectedFile) => {
    if (!selectedFile) {
      toast.error("الرجاء اختيار ملف للتحميل");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await axiosInstance.post("/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (res.data.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["imported-users"] });
        toast.success("تم تحميل المساهمين بنجاح");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(errorHandle(error, "حدث خطأ ما ، الرجاء المحاولة مرة أخرى"));
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  useEffect(() => {
    if (file) {
      handleImportInvestors(file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const deleteTemplate = (rowData) => {
    return (
      <button
        disabled={loading}
        onClick={() => {
          setShowModal(true);
          setRowId(rowData.national_id);
        }}
      >
        <img src="/assets/images/delete.svg" alt="delete" />
      </button>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ search: e.target[0].value });
  };

  const confirmDelete = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/deleteContributor", {
        national_id: Number(rowId)
      });
      if (res.data.status === 200) {
        toast.success("تم الحذف بنجاح");
        queryClient.invalidateQueries({ queryKey: ["imported-users"] });
        setShowModal(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(errorHandle(error, "حدث خطأ ما"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="investors">
      <div className="container">
        <div className="row">
          <PageHeader
            path={[{ name: "بيانات المساهمين", path: "/investors" }]}
          />
          <div className="col-12 p-2">
            <div className="inner_card">
              {isLoading ? (
                <DataLoader />
              ) : (
                <>
                  <div className="header">
                    <h1>بيانات المساهمين</h1>
                    <form className="search_form" onSubmit={handleSubmit}>
                      <div className="input_field">
                        <img src="/assets/images/search.svg" alt="searchIcon" />
                        <input
                          type="text"
                          placeholder="البحث"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </div>
                      {investors?.count > 0 && (
                        <button type="button" disabled={loading}>
                          <label
                            htmlFor="file"
                            style={{
                              cursor: loading ? "not-allowed" : "pointer"
                            }}
                          >
                            <img
                              src="/assets/images/download.svg"
                              alt="filterIcon"
                            />{" "}
                            {loading ? "جار التحميل..." : "استيراد البيانات"}
                          </label>
                          <input
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            type="file"
                            name="file"
                            id="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            style={{ display: "none" }}
                            disabled={loading}
                          />
                        </button>
                      )}
                    </form>
                  </div>
                  {investors?.count > 0 ? (
                    <>
                      <div className="table-container">
                        <DataTable value={investors.data}>
                          <Column field="id" header="م" />
                          <Column field="national_id" header="الرقم المدني" />
                          <Column body={deleteTemplate} />
                        </DataTable>
                      </div>
                      {investors?.count > 10 && (
                        <Pagination count={investors?.count} />
                      )}
                    </>
                  ) : (
                    <div className="empty_data">
                      <img src="/assets/images/empty.svg" alt="no-data" />
                      <p>قم الان باستيراد بيانات المساهمين من ملف الاكسل</p>
                      <button
                        type="button"
                        disabled={loading}
                        style={{ opacity: loading ? 0.7 : 1 }}
                      >
                        <label
                          htmlFor="file"
                          style={{
                            cursor: loading ? "not-allowed" : "pointer"
                          }}
                        >
                          <img
                            src="/assets/images/download.svg"
                            alt="filterIcon"
                          />{" "}
                          {loading ? "جار التحميل..." : "استيراد البيانات"}
                        </label>
                        <input
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          type="file"
                          name="file"
                          id="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ display: "none" }}
                          disabled={loading}
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ConfirmDeleteModal
        showDeleteModal={showModal}
        setShowDeleteModal={setShowModal}
        deletionTarget={rowId}
        loading={loading}
        onConfirm={confirmDelete}
      />
    </section>
  );
}

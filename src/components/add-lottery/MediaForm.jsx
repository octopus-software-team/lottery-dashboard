import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function MediaForm({ formData, setFormData, setForm }) {
  const imageTemplate = (rowData) => {
    return (
      <div className="row_img">
        <img
          src={
            rowData.type?.startsWith("image/")
              ? URL.createObjectURL(rowData)
              : rowData
          }
          alt={rowData.name || rowData}
        />
        <h6>{rowData.name || ""}</h6>
      </div>
    );
  };

  const indexTemplate = (rowData) => {
    return formData.lottery_images.indexOf(rowData) + 1;
  };

  const deleteTeplate = (rowData) => {
    return (
      <div
        className="delete_icon"
        onClick={() =>
          setFormData((prev) => ({
            ...prev,
            lottery_images: prev.lottery_images.filter(
              (image) => image !== rowData
            )
          }))
        }
      >
        <img src="/assets/images/delete.svg" alt="delete" />
      </div>
    );
  };

  return (
    <form className="form_ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <label className="images_upload_field">
            <input
              type="file"
              name="lottery_images"
              id="lottery_images"
              multiple
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [e.target.name]: [...prev[e.target.name], ...e.target.files]
                }))
              }
            />
            <div className="content">
              <div className="icon">
                <img src="/assets/images/upload-gray.svg" alt="upload" />
              </div>
              <h6>اضغط لإرفاق الملفات</h6>
              <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </label>
        </div>
        {formData?.lottery_images?.length === 0 ? (
          <div className="col-12 p-2">
            <div className="empty_data">
              <img src="/assets/images/noData.svg" alt="no-data" />
              <h5>لم تقم باضافة صور</h5>
            </div>
          </div>
        ) : (
          <div className="col-12 p-2">
            <div className="table-container">
              <DataTable value={formData.lottery_images}>
                <Column field="index" body={indexTemplate} header="م" />
                <Column field="image" body={imageTemplate} header="الصورة" />
                <Column field="" body={deleteTeplate} header="" />
              </DataTable>
            </div>
          </div>
        )}

        <div className="col-12 p-2 mt-3 d-flex justify-content-end">
          <div className="d-flex gap-3">
            <button className="prev" onClick={() => setForm("details")}>
              السابق
            </button>
            <button className="next" onClick={() => setForm("rules")}>
              التالي
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

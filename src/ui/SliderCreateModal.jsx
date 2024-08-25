import { Form, Modal } from "react-bootstrap";
import { useEffect } from "react";
import InputField from "./InputField";

export default function SliderCreateModal({
  showModal,
  setShowModal,
  formData,
  setFormData,
  eventFun,
  loading,
  row,
  setRow
}) {
  console.log(row);

  useEffect(() => {
    if (row?.id) {
      setFormData({
        slider_id: row?.id,
        slider_image: row?.image || "",
        rank: row?.rank || "",
        title: row?.title || "",
        description: row?.description || "",
        status: row?.status
      });
    }
  }, [row, setFormData]);

  return (
    <Modal
      show={showModal}
      centered
      onHide={() => {
        setFormData({
          slider_image: "",
          rank: "",
          title: "",
          description: ""
        });
        setRow({});
        setShowModal(false);
      }}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <h6>اضافة اسلايد</h6>
      </Modal.Header>
      <Modal.Body className="p-3 pt-0">
        <form className="form_ui account_form" onSubmit={eventFun}>
          <div className="row m-0">
            <div className="col-12 p-2">
              <div className="img_field">
                <div className="img">
                  {formData.slider_image === "" ? (
                    <span className="icon">
                      <img src="/assets/images/img.svg" alt="Main" />
                    </span>
                  ) : (
                    <img
                      src={
                        formData?.slider_image?.type?.startsWith("image/")
                          ? URL.createObjectURL(formData.slider_image)
                          : formData?.slider_image
                      }
                      alt="Main"
                    />
                  )}
                </div>
                <label htmlFor="image" className="upload">
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    multiple={false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slider_image: e.target.files[0]
                      })
                    }
                  />
                  <div className="content">
                    <img src="/assets/images/upload.svg" alt="upload" />
                    <p>رفع صورة</p>
                  </div>
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="العنوان"
                placeholder="عنوان الاسلايد"
                id="title"
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value
                  }))
                }
              />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="ترتيب الاسلايد"
                placeholder="رقم الاسلايد"
                type="number"
                id="rank"
                required
                name="rank"
                value={formData.rank}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, rank: e.target.value }))
                }
              />
            </div>
            <div className="col-12 p-2">
              <InputField
                label="الوصف"
                placeholder="وصف الاسلايد"
                id="description"
                type="text"
                required
                as="textarea"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
              />
            </div>
            {formData.slider_id && (
              <div className="col-12 p-2">
                <Form.Check
                  type="switch"
                  id="status"
                  name="status"
                  label="الحالة (مفعل/غير مفعل)"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.checked ? 1 : 0
                    })
                  }
                  checked={Number(formData.status) === 1}
                />
              </div>
            )}
            <div className="col-12 p-2 d-flex justify-content-end mt-2">
              <button
                type="submit"
                disabled={loading}
                className="submit_btn"
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                <i className={loading ? "fa-solid fa-spinner fa-spin" : ""}></i>{" "}
                حفظ
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

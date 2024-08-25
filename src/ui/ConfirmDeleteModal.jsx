import Modal from "react-bootstrap/Modal";
import SubmitButton from "./SubmitButton";

const ConfirmDeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  deletionTarget,
  loading,
  onConfirm
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row m-0 confirmation_modal">
          <div className="col-12 p-2">
            <p>
              أنت على وشك إزالة <span>{deletionTarget}</span> عند المتابعة، لن
              تتمكن من التراجع. هل ترغب في تأكيد الحذف؟
            </p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              الغاء
            </button>
            <SubmitButton
              name={"تاكيد"}
              className="confirm red"
              loading={loading}
              event={onConfirm}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;

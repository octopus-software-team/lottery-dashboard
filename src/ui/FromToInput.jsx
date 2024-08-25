import { Form } from "react-bootstrap";

export default function FromToInput({ label, ...props }) {
  return (
    <div className="d-flex align-items-center gap-2 w-100">
      <label htmlFor={props?.id}>{label}</label>
      <Form.Control className="form-control" {...props} />
    </div>
  );
}

import { Form } from "react-bootstrap";

export default function InputField({ label, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>{label}</label>
      <Form.Control className="form-control" {...props} />
    </div>
  );
}

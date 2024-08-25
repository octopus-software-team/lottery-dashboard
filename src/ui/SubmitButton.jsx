export default function SubmitButton({
  loading,
  name,
  className,
  event = undefined
}) {
  return (
    <button
      onClick={event ? event : undefined}
      style={{ opacity: loading ? 0.7 : 1 }}
      disabled={loading}
      type="submit"
      className={`log ${className || ""}`}
    >
      {name} <i className={loading ? "fa-solid fa-spinner fa-spin" : ""} />
    </button>
  );
}

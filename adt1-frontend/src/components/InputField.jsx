
const InputField = ({ label, name, value, onChange }) => (
  <div style={{ marginBottom: "12px" }}>
    <label style={{ fontWeight: "bold" }}>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={{ width: "100%", padding: "8px" }}
    />
  </div>
);

export default InputField;
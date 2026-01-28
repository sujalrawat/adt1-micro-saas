import { useState } from "react";
import api from "../api";
import InputField from "./InputField";

const ADT1Form = () => {
  const [hasOwnAuditor, setHasOwnAuditor] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    COMPANY_NAME: "",
    COMPANY_ADDRESS: "",
    COMPANY_CIN: "",
    COMPANY_MAIL: "",
    COMPANY_CONTACT: "",

    DIRECTOR_NAME: "",
    DIRECTOR_DIN: "",

    AUDITOR_FIRM_NAME: "",
    AUDITOR_FRN: "",
    AUDITOR_ADDRESS: "",
    AUDITOR_PLACE: "",
    AUDITOR_PARTNER_NAME: "",
    AUDITOR_MEMBERSHIP_NO: "",

    DATE: "",
    DAY: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 THIS WAS MISSING
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "/generate-adt1",
        {
          ...formData,
          HAS_OWN_AUDITOR: hasOwnAuditor,
        },
        {
          responseType: "blob", // VERY IMPORTANT
        }
      );

      // 🔽 Download file
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "ADT1_Documents.zip";
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to generate documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "700px", margin: "auto" }}
    >
      {/* COMPANY DETAILS */}
      <h3 style={{ background: "yellow", padding: "10px" }}>
        COMPANY'S DETAILS
      </h3>

      <InputField label="Company Name" name="COMPANY_NAME" value={formData.COMPANY_NAME} onChange={handleChange} />
      <InputField label="Address" name="COMPANY_ADDRESS" value={formData.COMPANY_ADDRESS} onChange={handleChange} />
      <InputField label="CIN" name="COMPANY_CIN" value={formData.COMPANY_CIN} onChange={handleChange} />
      <InputField label="Email ID" name="COMPANY_MAIL" value={formData.COMPANY_MAIL} onChange={handleChange} />
      <InputField label="Mobile Number" name="COMPANY_CONTACT" value={formData.COMPANY_CONTACT} onChange={handleChange} />

      {/* DIRECTOR DETAILS */}
      <h3 style={{ marginTop: "30px" }}>DIRECTOR'S DETAILS</h3>

      <InputField label="Director Name" name="DIRECTOR_NAME" value={formData.DIRECTOR_NAME} onChange={handleChange} />
      <InputField label="DIN" name="DIRECTOR_DIN" value={formData.DIRECTOR_DIN} onChange={handleChange} />

      {/* CHECKBOX */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="checkbox"
          checked={hasOwnAuditor}
          onChange={() => setHasOwnAuditor(!hasOwnAuditor)}
        />
        <label style={{ marginLeft: "8px" }}>
          Company has its own auditor
        </label>
      </div>

      {/* AUDITOR DETAILS */}
      {hasOwnAuditor && (
        <>
          <h3 style={{ background: "yellow", padding: "10px" }}>
            AUDITOR'S DETAILS
          </h3>

          <InputField label="Firm Name" name="AUDITOR_FIRM_NAME" value={formData.AUDITOR_FIRM_NAME} onChange={handleChange} />
          <InputField label="FRN" name="AUDITOR_FRN" value={formData.AUDITOR_FRN} onChange={handleChange} />
          <InputField label="Address" name="AUDITOR_ADDRESS" value={formData.AUDITOR_ADDRESS} onChange={handleChange} />
          <InputField label="Place" name="AUDITOR_PLACE" value={formData.AUDITOR_PLACE} onChange={handleChange} />
          <InputField label="Partner's Name" name="AUDITOR_PARTNER_NAME" value={formData.AUDITOR_PARTNER_NAME} onChange={handleChange} />
          <InputField label="Membership Number" name="AUDITOR_MEMBERSHIP_NO" value={formData.AUDITOR_MEMBERSHIP_NO} onChange={handleChange} />
        </>
      )}

      {/* DATES */}
      <h3 style={{ marginTop: "30px" }}>DATES</h3>

      <InputField label="Enquiry & Eligibility Date" name="ELIGIBILITY_DATE" value={formData.ELIGIBILITY_DATE} onChange={handleChange} />
      <InputField label="BR, Intimation & Consent Date" name="CONSENT_DATE" value={formData.CONSENT_DATE} onChange={handleChange} />
      <InputField label="Day" name="DAY" value={formData.DAY} onChange={handleChange} />

      {/* SUBMIT */}
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Documents"}
      </button>
    </form>
  );
};

export default ADT1Form;
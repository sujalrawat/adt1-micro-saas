import express from "express";
import fs from "fs";
import path from "path";
import { generateDoc } from "../utils/generateDoc.js";
import { zipDocuments } from "../utils/zipDocs.js";

const router = express.Router();

router.post("/generate-adt1", async (req, res) => {
  try {
    const {HAS_OWN_AUDITOR,...formData } = req.body;

    const outputDir = "output";
    const zipPath = "ADT1_Documents.zip";

    // Decide template folder based on auditor type
    const templateBasePath = path.join(
      "templates",
      HAS_OWN_AUDITOR ? "Independent" : "Mohindra"
    );

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const documents = [
      { file: "BR.docx", output: "Board_Resolution.docx" },
      { file: "CL.docx", output: "Consent_Letter.docx" },
      { file: "ECL.docx", output: "Eligibility_Criteria_Letter.docx" },
      { file: "Inquiry Letter.docx", output: "Inquiry_Letter.docx" },
      { file: "Intimation Letter.docx", output: "Intimation_Letter.docx" },
    ];

    for (const doc of documents) {
      await generateDoc(
        path.join(templateBasePath, doc.file),
        path.join(outputDir, doc.output),
        formData
      );
    }

    await zipDocuments(outputDir, zipPath);

    res.download(zipPath, () => {
      fs.rmSync(outputDir, { recursive: true, force: true });
      fs.unlinkSync(zipPath);
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Document generation failed" });
  }
});

export default router;

import React, { useState } from "react";

const FileUploader = ({ label }) => {
  const [fileName, setFileName] = useState(label);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(label);
    }
  };
  // Generate a unique ID for each instance
  const inputId = `fileInput-${label.replace(/\s+/g, "-")}`;
  return (
    <div className="file-upload">
      <input
        id={inputId}
        type="file"
        className="fileInput"
        onChange={handleFileChange}
      />
      <label htmlFor={inputId}>
        <span>{fileName}</span>
        <img src="chainIcon.png" className="file-upload-icon" />
      </label>
    </div>
  );
};

export default FileUploader;

import React, { useEffect, useState } from "react";

const FileUploader = ({ label,onFileSelect,apiDataName }) => {
  const [fileName, setFileName] = useState(apiDataName || label);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file)

    if (file) {
      setFileName(file.name)
      onFileSelect(file,label);
    } else {
      setFileName(label);
    }
  };
  // Generate a unique ID for each instance
  const inputId = `fileInput-${label.replace(/\s+/g, "-")}`;
  useEffect(()=>{
    if(apiDataName){
      setFileName(apiDataName);
    }
  },[])
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
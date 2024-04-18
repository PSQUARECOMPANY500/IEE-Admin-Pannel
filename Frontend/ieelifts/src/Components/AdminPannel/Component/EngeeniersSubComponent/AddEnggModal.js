//................................{amit}....................................
import React, { useEffect, useState, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { closeAddEngggModalAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { getDetailByPinCode } from "../../../../ReduxSetup/Actions/AdminActions";
import { getBankDetails } from "../../../../ReduxSetup/Actions/AdminActions";
import { SlLink } from "react-icons/sl";
import AddEnggAttachment from "../DashboardSubComponent/DropdownCollection/AddEnggAttachment";
import CheckBox from "../DashboardSubComponent/CheckBox";
import { RegistrationEnggDetails } from "../../../../ReduxSetup/Actions/AdminActions";


const AddEnggModal = () => {
  const dispatch = useDispatch();
  const divRef = useRef([]);
  const mainDivRef = useRef(null);

  const fileInputRef = useRef(null); // Define fileInputRef
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const fileInputRef5 = useRef(null);

  const [showWorkExperience, setShowWorkExperience] = useState(false);

  const [profilePhoto, setProfilePhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [addharCardNumber, setAddharCardNumber] = useState("");
  const [drivingLisience, setDrivingLisience] = useState("");
  const [pancards, setPancard] = useState("");
  const [qualification, setQualification] = useState("");
  const [additionalCourse, setAdditionalCourse] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [branchName, setBranchName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [jobDuration, setJobDuration] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [managerName, setManagerName] = useState("");
  const [managerNumber, setManagerNumber] = useState("");

  //-------------------------------------------------
  const [pinCode, setPinCode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [IFSCcode, setIFSCcode] = useState("");
  const [fetchIFSCCode, setfetchIFSCCode] = useState("");

  //attachmnents
  const [additionalCoursePhoto, SetAdditionalCoursePhoto] = useState("");
  const [qualificationPhoto, SetQualificationPhoto] = useState("");
  const [pancardPhoto, SetPancardPhoto] = useState("");
  const [drivingLicensePhoto, SetDrivingLicensePhoto] = useState("");
  const [addharPhoto, SetAddharPhoto] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const closeModal = (e) => {
    e.stopPropagation();
    dispatch(closeAddEngggModalAction());
  };

  const QualificationData = [
    {
      value: "10",
      label: "10th MarkSheet",
    },
    {
      value: "12",
      label: "12th MarkSheet",
    },
    {
      value: "Diploma",
      label: "Diploma MarkSheet",
    },
  ];

  const handlePinCodeInput = async (event) => {
    const newEvent = event.target.value;
    setPinCode(newEvent);

    const data = await getDetailByPinCode(newEvent);
    if (data[0]?.PostOffice) {
      setDistrict(data[0]?.PostOffice[0]?.District);
      setState(data[0]?.PostOffice[0]?.State);
    } else {
      console.log("PostOffice data not found");
    }
  };

  const handleIFSCcode = async (event) => {
    const newData = event.target.value;
    setIFSCcode(newData);
    const data = await getBankDetails(newData);
    if (data) {
      setfetchIFSCCode(data?.BRANCH);
    } else {
      console.log("IFSC data not found");
    }
  };
  //Bank IFSC's = SBIN0001840 , PUNB0209600

  const handleClick = (index) => {
    if (divRef.current[index]) {
      divRef.current[index].classList.toggle("changeBorderInputColor");
    }
  };

  const handleCheckboxChange = (e) => {
    setShowWorkExperience(e.target.checked);
  };

  const onStateChange = (value) => {
    setQualification(value.value);
  };

  const handleUploadClick = (documentType) => {
    switch (documentType) {
      case "aadhar":
        fileInputRef.current.dataset.documentType = documentType;
        fileInputRef.current.click();
        break;
      case "panCard":
        fileInputRef1.current.dataset.documentType = documentType;
        fileInputRef1.current.click();
        break;
      case "drivingLicense":
        fileInputRef2.current.dataset.documentType = documentType;
        fileInputRef2.current.click();
        break;
      case "QualificationPhoto":
        fileInputRef3.current.dataset.documentType = documentType;
        fileInputRef3.current.click();
      case "AdditionalCoursePhoto":
        fileInputRef4.current.dataset.documentType = documentType;
        fileInputRef4.current.click();
        break;
      case "profilePhoto":
        fileInputRef5.current.dataset.documentType = documentType;
        fileInputRef5.current.click();
        break;
      default:
        break;
    }
  };

  const handleSaveEnggProfileData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("mobileNumber", mobileNumber);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("pinCode", pinCode);
    formData.append("city", city);
    formData.append("district", district);
    formData.append("state", state);
    formData.append("addharCardNumber", addharCardNumber);
    formData.append("drivingLisience", drivingLisience);
    formData.append("pancards", pancards);
    formData.append("addharPhoto", addharPhoto);
    formData.append("pancardPhoto", pancardPhoto);
    formData.append("drivingLicensePhoto", drivingLicensePhoto);
    formData.append("additionalCourse", additionalCourse);
    formData.append("additionalCoursePhoto", additionalCoursePhoto);
    formData.append("qualificationPhoto", qualificationPhoto);
    formData.append("qualification", qualification);
    formData.append("accountHolderName", accountHolderName);
    formData.append("branchName", branchName);
    formData.append("accountNumber", accountNumber);
    formData.append("IFSCcode", IFSCcode);
    formData.append("jobDuration", jobDuration);
    formData.append("companyName", companyName);
    formData.append("jobTitle", jobTitle);
    formData.append("managerName", managerName);
    formData.append("managerNumber", managerNumber);
    const response = await RegistrationEnggDetails(formData);
    console.log("response", response);

    if (response?.status === 201) {
      setProfilePhoto("");
      setFirstName("");
      setLastName("");
      setMobileNumber("");
      setDateOfBirth("");
      setEmail("");
      setAddress("");
      setCity("");
      setAddharCardNumber("");
      setDrivingLisience("");
      setPancard("");
      setQualification("");
      setAdditionalCourse("");
      setAccountHolderName("");
      setBranchName("");
      setAccountNumber("");
      setJobDuration("");
      setCompanyName("");
      setJobTitle("");
      setManagerName("");
      setManagerNumber("");
      setPinCode("");
      setDistrict("");
      setState("");
      setIFSCcode("");
      setfetchIFSCCode("");
      SetAdditionalCoursePhoto("");
      SetQualificationPhoto("");
      SetPancardPhoto("");
      SetDrivingLicensePhoto("");
      SetAddharPhoto("");
    }
  };

  return (
    <>
      <div className="add-engg-wrapper" onClick={closeModal}>
        <div
          className="add-engg-modal"
          ref={mainDivRef}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="cross-icon"
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          >
            <RxCross2 />
          </div>

          {/* --------------------------------------------------------------------------- Engineer Personal details section starts--------------------------------------------------------------------------- */}
          <div className="outerMainMoodule">
            <div className="EnggAddressSection">
              <div className="EnggDetailSection">
                <div className="EnggDetailHeading">Engineer details</div>
                <div className="EnggDetailInputField">
                  <div
                    className="imageUploadDiv"
                    onClick={() => handleUploadClick("profilePhoto")}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "8px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        objectFit: "contain",
                        border: "none",
                      }}
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                      }
                    ></img>
                    <input
                      type="file"
                      name="fields[]"
                      onChange={(e) => setProfilePhoto(e.target.files[0])}
                      style={{ display: "none" }}
                      ref={fileInputRef5} // Attach fileInputRef to the input element
                    />
                  </div>
                  <div className="personalDetailSec">
                    <div className="PersonalDetailInput">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="PersonalDetailInput">
                      <input
                        type="text"
                        placeholder="Mobile no"
                        required
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Date of Birth"
                        required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                      />
                    </div>
                    <div className="PersonalDetailInputEmail">
                      <input
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------------------------------------------------------- Address details section starts--------------------------------------------------------------------------- */}

              <div className="ExtraCiricularSection">
                <div className="EnggDetailHeading">Address details</div>
                <div className="ExtraCiricularSectionInputFields">
                  <div className="EnggAddressInput">
                    <input
                      type="text"
                      placeholder="Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="mainPersonalDetialSection">
                    <div className="PersonalDetailInput">
                      <input
                        type="number"
                        placeholder="Pincode"
                        required
                        value={pinCode}
                        onChange={handlePinCodeInput}
                      />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="PersonalDetailInput">
                      <input
                        type="text"
                        placeholder="District"
                        required
                        value={district}
                      />
                      <input
                        type="text"
                        placeholder="State"
                        required
                        value={state}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* ---------------------------------------------------------------------------  Government IDs section starts--------------------------------------------------------------------------- */}
              <div className="ExtraCiricularSection">
                <div className="EnggDetailHeading">Government IDs</div>
                <div className="ExtraCiricularSectionInputFields">
                  <div className="mainPersonalDetialSection">
                    <div className="PersonalDetailInput">
                      <div className="addFileName">
                        <div
                          className="inputWithAttachment"
                          ref={(el) => (divRef.current[0] = el)}
                          onClick={() => handleClick(0)}
                          style={{ outline: "none" }}
                        >
                          <input
                            type="text"
                            placeholder="Aadhaar Card No"
                            required
                            style={{ outline: "none" }}
                            value={addharCardNumber}
                            onChange={(e) =>
                              setAddharCardNumber(e.target.value)
                            }
                          />
                          <input
                            type="file"
                            onChange={(e) => SetAddharPhoto(e.target.files[0])}
                            style={{ display: "none" }}
                            ref={fileInputRef} // Attach fileInputRef to the input element
                          />
                          <SlLink
                            style={{ marginRight: "18px", cursor: "pointer" }}
                            onClick={() => handleUploadClick("aadhar")}
                          />
                        </div>
                        <p>{addharPhoto.name}</p>
                      </div>

                      <div className="addFileName">
                        <div
                          className="inputWithAttachment"
                          ref={(el) => (divRef.current[1] = el)}
                          onClick={() => handleClick(1)}
                          style={{ outline: "none" }}
                        >
                          <input
                            type="file"
                            name="fields[]"
                            onChange={(e) => SetPancardPhoto(e.target.files[0])}
                            style={{ display: "none" }}
                            ref={fileInputRef1} // Attach fileInputRef to the input element
                          />
                          <input
                            type="text"
                            placeholder="Pancard No"
                            required
                            style={{ outline: "none" }}
                            value={pancards}
                            onChange={(e) => setPancard(e.target.value)}
                          />
                          <SlLink
                            style={{ marginRight: "22px", cursor: "pointer" }}
                            onClick={() => handleUploadClick("panCard")}
                          />
                        </div>
                        <p>{pancardPhoto.name}</p>
                      </div>
                    </div>

                    <div className="addFileName">
                      <div className="PersonalDetailInput">
                        <div
                          className="inputWithAttachment"
                          ref={(el) => (divRef.current[2] = el)}
                          onClick={() => handleClick(2)}
                          style={{ outline: "none", width: "49%" }}
                        >
                          <input
                            type="text"
                            placeholder="Driving License No"
                            required
                            style={{ outline: "none" }}
                            value={drivingLisience}
                            onChange={(e) => setDrivingLisience(e.target.value)}
                          />

                          <input
                            type="file"
                            name="fields[]"
                            onChange={(e) =>
                              SetDrivingLicensePhoto(e.target.files[0])
                            }
                            style={{ display: "none" }}
                            ref={fileInputRef2} // Attach fileInputRef to the input element
                          />
                          <SlLink
                            style={{ marginRight: "22px", cursor: "pointer" }}
                            onClick={() => handleUploadClick("drivingLicense")}
                          />
                        </div>
                      </div>
                      <p>{drivingLicensePhoto.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ---------------------------------------------------------------------------  Educational details section starts--------------------------------------------------------------------------- */}

              <div className="ExtraCiricularSection">
                <div className="EnggDetailHeading">Educational details</div>
                <div className="ExtraCiricularSectionInputFields">
                  <div className="mainPersonalDetialSection">
                    <div className="PersonalDetailInput">
                      <div className="addFileName">
                        <div
                          className="inputWithAttachment"
                          ref={(el) => (divRef.current[4] = el)}
                          onClick={() => handleClick(4)}
                          style={{ outline: "none" }}
                        >
                          <AddEnggAttachment
                            width="100%"
                            placeholder="Select Qualification"
                            Details={QualificationData}
                            padding="4px"
                            onStateChange={onStateChange}
                          />
                          <input
                            type="file"
                            name="fields[]"
                            onChange={(e) =>
                              SetQualificationPhoto(e.target.files[0])
                            }
                            style={{ display: "none" }}
                            ref={fileInputRef3} // Attach fileInputRef to the input element
                          />
                          <SlLink
                            style={{ marginRight: "22px", cursor: "pointer" }}
                            onClick={() =>
                              handleUploadClick("QualificationPhoto")
                            }
                          />
                        </div>
                        <p>{qualificationPhoto.name}</p>
                      </div>

                      <div className="addFileName">
                        <div
                          className="inputWithAttachment"
                          ref={(el) => (divRef.current[4] = el)}
                          onClick={() => handleClick(4)}
                          style={{ outline: "none" }}
                        >
                          <input
                            type="text"
                            placeholder="Additional Course"
                            required
                            style={{ outline: "none" }}
                            value={additionalCourse}
                            onChange={(e) =>
                              setAdditionalCourse(e.target.value)
                            }
                          />
                          <input
                            type="file"
                            name="fields[]"
                            onChange={(e) =>
                              SetAdditionalCoursePhoto(e.target.files[0])
                            }
                            style={{ display: "none" }}
                            ref={fileInputRef4} // Attach fileInputRef to the input element\
                          />
                          <SlLink
                            style={{ marginRight: "22px", cursor: "pointer" }}
                            onClick={() =>
                              handleUploadClick("AdditionalCoursePhoto")
                            }
                          />
                        </div>
                        <p>{additionalCoursePhoto.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ---------------------------------------------------------------------------  Banking Details section starts--------------------------------------------------------------------------- */}

            <div className="BankWorkSection">
              <div className="ExtraCiricularSection">
                <div className="EnggDetailHeading">Banking Details</div>
                <div className="ExtraCiricularSectionInputFields">
                  <div className="mainPersonalDetialSection">
                    <div className="PersonalDetailInput">
                      <input
                        type="text"
                        placeholder="Account Holder Name"
                        required
                        value={accountHolderName}
                        onChange={(e) => setAccountHolderName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Branch Name"
                        required
                        value={branchName}
                        onChange={(e) => setBranchName(e.target.value)}
                      />
                    </div>
                    <div className="PersonalDetailInput">
                      <input
                        type="text"
                        placeholder="Account Number"
                        required
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                      />
                      <div className="smallifcCodeSuggestion">
                        <input
                          type="text"
                          placeholder="IFSC Code"
                          required
                          value={IFSCcode}
                          onChange={handleIFSCcode}
                        />
                        <p>{fetchIFSCCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ExtraCiricularSection">
                <div className="EnggDetailHeading">Work Experience</div>

                <div className="ExtraCiricularSectionInputFields">
                  <div className="mainPersonalDetialSection">
                    <div className="PersonalDetailInput">
                      <div
                        className="workExperienceCheckbox"
                        style={{ width: showWorkExperience ? "100%" : "50%" }}
                      >
                        <input
                          type="text"
                          placeholder="Previos Work Experience"
                          required
                          style={{ border: "none", outline: "none" }}
                        />
                        <CheckBox
                          style={{ marginTop: "4px" }}
                          handleCheckboxChange={handleCheckboxChange}
                        />
                      </div>

                      {showWorkExperience && (
                        <input
                          type="text"
                          placeholder="Duration of Job"
                          required
                          value={jobDuration}
                          onChange={(e) => setJobDuration(e.target.value)}
                        />
                      )}
                    </div>

                    <div className="PersonalDetailInput">
                      {showWorkExperience && (
                        <input
                          type="text"
                          placeholder="Company Name"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      )}
                      {showWorkExperience && (
                        <input
                          type="text"
                          placeholder="Job title"
                          required
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                      )}
                    </div>
                    <div className="PersonalDetailInput">
                      {showWorkExperience && (
                        <input
                          type="text"
                          placeholder="Manager Name"
                          required
                          value={managerName}
                          onChange={(e) => setManagerName(e.target.value)}
                        />
                      )}
                      {showWorkExperience && (
                        <input
                          type="text"
                          placeholder="Manager No"
                          required
                          value={managerNumber}
                          onChange={(e) => setManagerNumber(e.target.value)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="addEnggButtons">
                <button class="button-69-cancel" role="button">
                  Cancel
                </button>
                <button
                  class="button-69"
                  role="button"
                  onClick={(e) => handleSaveEnggProfileData(e)}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          {/* -------------------------------------------------------------------------------------------------------------------------------- */}
        </div>
      </div>
    </>
  );
};

export default AddEnggModal;

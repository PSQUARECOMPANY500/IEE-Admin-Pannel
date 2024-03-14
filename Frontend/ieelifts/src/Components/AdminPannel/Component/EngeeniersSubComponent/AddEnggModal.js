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

const AddEnggModal = () => {
  const dispatch = useDispatch();
  const divRef = useRef([]);
  const mainDivRef = useRef(null);
  
  const [showWorkExperience, setShowWorkExperience] = useState(false)
  console.log(showWorkExperience)

  const [pinCode, setPinCode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [IFSCcode, setIFSCcode] = useState("");
  const [fetchIFSCCode, setfetchIFSCCode] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const closeModal = () => {
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
    console.log(newEvent);
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
      divRef.current[index].classList.toggle('changeBorderInputColor');
    }  
  }
  

 const handleCheckboxChange = (e) => {
  // console.log(e.target.checked);
  setShowWorkExperience(e.target.checked)
 }


  return (
    <>
      <div className="add-engg-wrapper" onClick={closeModal}></div>
      <div className="add-engg-modal" ref={mainDivRef}>
        <div className="cross-icon" onClick={closeModal}>
          <RxCross2 />
        </div>

{/* --------------------------------------------------------------------------- Engineer Personal details section starts--------------------------------------------------------------------------- */}
<div className="outerMainMoodule">
          <div className="EnggAddressSection">
            <div className="EnggDetailSection">
              <div className="EnggDetailHeading">Engineer details</div>
              <div className="EnggDetailInputField">
                <div className="imageUploadDiv">
                  <input
                    type="text"
                    name="first"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="personalDetailSec">
                  <div className="PersonalDetailInput">
                    <input type="text" placeholder="First Name" required />
                    <input type="text" placeholder="Last Name" required />
                  </div>
                  <div className="PersonalDetailInput">
                    <input type="text" placeholder="Mobile no" required />
                    <input type="text" placeholder="Date of Birth" required />
                  </div>
                  <div className="PersonalDetailInputEmail">
                    <input type="text" placeholder="Email" required />
                  </div>
                </div>
              </div>
            </div>
{/* --------------------------------------------------------------------------- Address details section starts--------------------------------------------------------------------------- */}

            <div className="ExtraCiricularSection">
              <div className="EnggDetailHeading">Address details</div>
              <div className="ExtraCiricularSectionInputFields">
                <div className="EnggAddressInput">
                  <input type="text" placeholder="Address" required />
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
                    <input type="text" placeholder="City" required />
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
                    <div className="inputWithAttachment" ref={(el) => (divRef.current[0] = el)}  onClick={() => handleClick(0)}  style={{ outline: "none" }} >
                      <input
                        type="text"
                        placeholder="Aadhaar Card No"
                        required
                        style={{ outline: "none" }}
                      />
                      <SlLink
                        style={{ marginRight: "22px", cursor: "pointer" }}
                      />
                    </div>

                    <div className="inputWithAttachment" ref={(el) => (divRef.current[1] = el)} onClick={() => handleClick(1)}  style={{ outline: "none" }} >
                      {" "}
                      <input
                        type="text"
                        placeholder="Pancard No"
                        required
                        style={{ outline: "none" }}
                      />
                      <SlLink
                        style={{ marginRight: "22px", cursor: "pointer" }}
                      />
                    </div>
                  </div>
                  <div className="PersonalDetailInput">
                    <div
                      className="inputWithAttachment" ref={(el) => (divRef.current[2] = el)} onClick={() => handleClick(2)}  style={{ outline: "none", width: "49%" }}>
                      <input
                        type="text"
                        placeholder="Driving License No"
                        required
                        style={{ outline: "none" }}
                      />
                      <SlLink
                        style={{ marginRight: "22px", cursor: "pointer" }}
                      />
                    </div>
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
                    <div className="inputWithAttachment" ref={(el) => (divRef.current[4] = el)}  onClick={() => handleClick(4)}  style={{ outline: "none" }}>
                      <AddEnggAttachment
                        width="100%"
                        placeholder="Select Qualification"
                        Details={QualificationData}
                        padding="4px"
                      />
                      <SlLink
                        style={{ marginRight: "22px", cursor: "pointer" }}
                      />
                    </div>

                    <div className="inputWithAttachment" ref={(el) => (divRef.current[4] = el)}  onClick={() => handleClick(4)}  style={{ outline: "none" }}>
                      <input
                        type="text"
                        placeholder="Additional Course"
                        required
                        style={{ outline: "none" }}
                      />
                      <SlLink
                        style={{ marginRight: "22px", cursor: "pointer" }}
                      />
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
                    />
                    <input type="text" placeholder="Branch Name" required />
                  </div>
                  <div className="PersonalDetailInput">
                    <input type="text" placeholder="Account Number" required />
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
                    <div className="workExperienceCheckbox" style={{width: showWorkExperience? "100%" : "50%"}}>
                      <input
                        type="text"
                        placeholder="Previos Work Experience"
                        required
                        style={{ border: "none",outline: "none" }}
                      />
                      <CheckBox style={{ marginTop: "4px"}} handleCheckboxChange={handleCheckboxChange}/>
                    </div>

                   {showWorkExperience &&  <input type="text" placeholder="Duration of Job" required /> }
                  </div>


                   <div className="PersonalDetailInput">
                   {showWorkExperience && <input type="text" placeholder="Company Name" required />}
                   {showWorkExperience &&<input type="text" placeholder="Job title" required />}
                  </div>
                 <div className="PersonalDetailInput">
                 {showWorkExperience &&<input type="text" placeholder="Manager Name" required />}
                  {showWorkExperience && <input type="text" placeholder="Manager No" required />}
                  </div>


                </div>
              </div>
            </div>

            <div className="addEnggButtons">
              <button class="button-69-cancel" role="button">
                Cancel
              </button>
              <button class="button-69" role="button">
                Save
              </button>
            </div>
          </div>
        </div>
        {/* -------------------------------------------------------------------------------------------------------------------------------- */}
      </div>
    </>
  );
};

export default AddEnggModal;

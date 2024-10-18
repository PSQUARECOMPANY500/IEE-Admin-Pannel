import React, { useEffect, useRef, useState } from "react";
import details from "../../../../Assets/Images/details.svg";
import card from "../../../../Assets/Images/card.svg";
import expand from "../../../../Assets/Images/expand.svg";
import drivers from "../../../../Assets/Images/drivers.svg";
import { IoCloseOutline } from "react-icons/io5";
import AddEngineerForm from "./AddEngineerForm";
import { fetchEnggPersonalData } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";

import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions"



const EditEngineerDetails = ({ engID, onClose }) => {
  const [openForm, setOpenForm] = useState(false);
  const [engAddharPhoto, setEngAddharPhoto] = useState("");
  const [engPancardData, setEngPancardData] = useState("");
  const [engDrivingData, setEngDrivingData] = useState("");
  const [engQualificationPhoto, setQualificationPhoto] = useState("");

  const formRef = useRef();
  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseForm();
    }
  };



  //-------------------------------------    logic to get images forme the S3 bucket through API   ---------------------------------------------
  const fetchImageUrl = async (key) => {
    try {
      const response = await getImagesFromS3Bucket(`${key}`);
      return response.data.url;
    } catch (error) {
      console.log("error while fecthing the engg Images from S3 bucket ", error);
    }
  }
  
  //------------------------------------------------------------------------------------------------------------------------------------------------
  

  const openIt = async () => {
    try {
      const url = await fetchImageUrl(engAddharPhoto);
      if (url) {
        window.open(url);
      }
    } catch (error) {
      console.error("Error while opening Aadhaar image: ", error);
    }
  };


  const openPanCard = async () => {
    try{
    const url = await fetchImageUrl(engPancardData);
    if (url) {
      window.open(url);
    }
  } catch (error) {
    console.error("Error while opening Aadhaar image: ", error);
  }
};




  const openDrivingLicence = async () => {
    try {
      const url = await fetchImageUrl(engDrivingData);
      if (url) {
        window.open(url);
      }
    } catch (error) {
      console.error("Error while opening Aadhaar image: ", error);
    }
  };


  const openEduvationalDets = async () => {
    try {
      const url = await fetchImageUrl(engQualificationPhoto);
      if (url) {
        window.open(url);
      }
    } catch (error) {      
    }
  };







  const handleCloseForm = () => {
    setOpenForm(false);
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const getEnggBasicData = await fetchEnggPersonalData(engID);
      // console.log("getenggdata", getEnggBasicData);

      if (getEnggBasicData && getEnggBasicData.enggDetails !== undefined) {
        setEngAddharPhoto(getEnggBasicData.enggDetails.AddharPhoto);
        setEngPancardData(getEnggBasicData.enggDetails.PancardPhoto);
        setEngDrivingData(getEnggBasicData.enggDetails.DrivingLicensePhoto);
        setQualificationPhoto(getEnggBasicData.enggDetails.QualificationPhoto);
      }
    };

    getData();
  }, []);




  return (
    <>
      <div className="bigg">
        <IoCloseOutline onClick={onClose} className="edit-engineer-modal" />

        <div className="ttt">
          <div className="qqq">
            <div className="uuu" onClick={() => setOpenForm(true)}>
              <img src={details} />
              <p>Engineer Detail</p>
            </div>
            <div
              className="uuu"
              style={{ opacity: engAddharPhoto ? "1" : "0.3" }}
              onClick={engAddharPhoto ? () => openIt() : null}
            >
              <img src={card} />
              <p>Aadhaar Card</p>
            </div>
            <div
              className="uuu"
              onClick={engDrivingData ? () => openDrivingLicence() : null}
              style={{ opacity: engDrivingData ? "1" : "0.3" }}
            >
              <img src={drivers} />
              <p>Driving Licence</p>
            </div>
            <div
              className="uuu"
              style={{ opacity: engPancardData ? "1" : "0.3" }}
              onClick={engPancardData ? () => openPanCard() : null}
            >
              <img src={details} />
              <p>PAN Card</p>
            </div>
            {/* <div className="uuu">
              <img src={details} />
              <p>Bank details</p>
            </div> */}
            <div
              className="uuu"
              onClick={
                engQualificationPhoto ? () => openEduvationalDets() : null
              }
              style={{ opacity: engQualificationPhoto ? "1" : "0.3" }}
            >
              <img src={card} />
              <p>Educational Details</p>
            </div>
          </div>
        </div>
      </div>

      {openForm && (
        <div className="addform-modal-wrapper">
          <div className="addform-modal-container" ref={formRef}>
            <AddEngineerForm engID={engID} onClose={handleCloseForm} setOpenForm={setOpenForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditEngineerDetails;

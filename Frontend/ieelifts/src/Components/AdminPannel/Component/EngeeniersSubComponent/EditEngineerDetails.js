import React, { useEffect, useRef, useState } from "react";
import details from "../../../../Assets/Images/details.svg";
import card from "../../../../Assets/Images/card.svg";
import expand from "../../../../Assets/Images/expand.svg";
import drivers from "../../../../Assets/Images/drivers.svg";
import { IoCloseOutline } from "react-icons/io5";
import AddEngineerForm from "./AddEngineerForm";

const EditEngineerDetails = ({ engID, onClose }) => {
  const [openForm, setOpenForm] = useState(false);

  const formRef = useRef();

  const handleClickOutsideModal = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      handleCloseForm();
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


  return (
    <>
      <div className="bigg">
        <IoCloseOutline onClick={onClose} className="edit-engineer-modal" />

        <div className="ttt">
          <div className="qqq">
            <div className="uuu" onClick={() => setOpenForm(true)}>
              <img src={details} />
              <p>Details of Engineers</p>
            </div>
            <div className="uuu">
              <img src={card} />
              <p>Aadhar Card</p>
            </div>
            <div className="uuu">
              <img src={drivers} />
              <p>Driving license</p>
            </div>
            <div className="uuu">
              <img src={details} />
              <p>Pan Card</p>
            </div>
            <div className="uuu">
              <img src={details} />
              <p>Bank details</p>
            </div>
            <div className="uuu">
              <img src={card} />
              <p>Educatinational details</p>
            </div>
          </div>
        </div>
      </div>

      {openForm && (
        <div className="addform-modal-wrapper">
          <div className="addform-modal-container" ref={formRef}>
            <AddEngineerForm engID={engID} onClose={handleCloseForm} />
          </div>
        </div>
      )}
    </>
  );
};

export default EditEngineerDetails;

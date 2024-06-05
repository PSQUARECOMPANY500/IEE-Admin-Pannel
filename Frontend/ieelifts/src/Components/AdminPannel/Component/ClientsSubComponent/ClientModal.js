import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import ClientCallBackHis from "./ClientCallBackHis";
import ClientDropDown from "./ClientDropDown";
import ClientTableView from "./ClientTableView";
import "../../Component/ClientsSubComponent/style/clientModal.css";
import MailIcon from "../../../../Assets/Images/mailIon.svg";
import PdfIcon from "../../../../Assets/Images/pdf-icon.png";
import ExcelIcon from "../../../../Assets/Images/execel-icon.png";
import ClientServiceHistory from "./ClientServiceHistory";
import ClientDocuments from "./ClientDocuments";
import ClientSOSCall from "./ClientSOSCall";
import ClientElevatorDetails from "./ClientElevatorDetails";

// --------------------Raj -------------------------------------------

const ClientModal = ({ showClientModal, handleCloseModal, selectedClient }) => {
  const modalRef = useRef();
  // const cardRef = useRef();

  // Close modal when clicking outside of it
  const handleClickOutsideModal = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModalWithReset();
      handleCloseModal();
    }
  };

  const handleCloseModalWithReset = () => {
    handleResetDropdowns();
    handleCloseModal();
  };

  const handleResetDropdowns = () => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) => ({
        ...dropdown,
        selectedOption: defaultOptions[dropdown.id],
        showOptions: false,
      }))
    );
  };

  //When we click outside modal then closing modal
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideModal);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, []);

  // Changes scroll behavior when showclientmodal changes
  useEffect(() => {
    document.body.style.overflow = showClientModal ? "hidden" : "scroll";
  }, [showClientModal]);

  const defaultOptions = {
    0: "Select",
    1: "Warranty",
    2: "Elevator details",
  };

  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      options: ["Application", "Message", "SMS", "WhatsApp"],
      pic: MailIcon,
      selectedOption: defaultOptions[0],
      showOptions: false,
    },
    {
      id: 1,
      options: ["Warranty", "Platinum", "Gold", "Silver"],
      defaultName: "Membership :",
      pic: MailIcon,
      selectedOption: defaultOptions[1],
      showOptions: false,
    },
    {
      id: 2,
      options: [
        "Elevator details",
        "Service History",
        "Call Back History",
        "Document",
        "SOS Calls",
      ],
      pic: MailIcon,
      selectedOption: defaultOptions[2],
      showOptions: false,
    },
  ]);

  const toggleOptions = (id) => {
    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, showOptions: !dropdown.showOptions }
          : dropdown
      )
    );
  };

  const handleOptionClick = (id, option) => {


    setDropdowns((prevDropdowns) =>
      prevDropdowns.map((dropdown) =>
        dropdown.id === id
          ? { ...dropdown, selectedOption: option, showOptions: false }
          : dropdown
      )
    );
  };

  const renderComponent = () => {
    switch (dropdowns[2].selectedOption) {
      case "Elevator details":
        return <ClientElevatorDetails selectedClient={selectedClient.JobOrderNumber} />;
      case "Service History":
        return <ClientServiceHistory />;
      case "Call Back History":
        return <ClientCallBackHis />;
      case "Document":
        return <ClientDocuments />;
      case "SOS Calls":
        return <ClientSOSCall />;
      default:
        return <ClientElevatorDetails selectedClient={selectedClient.JobOrderNumber} />;
    }
  };

  return (
    <>
      {showClientModal && (
        <div className="client-modal-wrapper">
          <div className="client-modal-container" ref={modalRef}>
            <div className="cross-icon" onClick={handleCloseModalWithReset}>
              <RxCross2 />
            </div>
            <div className="client-child-modal-container">
              <div className="client-modal-profile-container">
                <div className="client-modal-profile-container-left">
                  <div className="client-modal-img-container">
                    <img
                      src="https://images.unsplash.com/photo-1543965170-e3d16958f280?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="client img"
                    />
                  </div>
                  <div className="client-modal-text-container">
                    <h5>{selectedClient && selectedClient.name}</h5>
                    <p>{selectedClient && selectedClient.JobOrderNumber}</p>
                  </div>
                </div>
                <div className="client-modal-profile-container-right">
                  <ClientDropDown
                    key={dropdowns[0].id}
                    pic={dropdowns[0].pic}
                    options={dropdowns[0].options}
                    selectedOption={dropdowns[0].selectedOption}
                    showOptions={dropdowns[0].showOptions}
                    toggleOptions={() => toggleOptions(dropdowns[0].id)}
                    handleOptionClick={(option) =>
                      handleOptionClick(dropdowns[0].id, option)
                    }
                    id={dropdowns[0].id}
                    w={"9rem"}
                  />
                  <ClientDropDown
                    key={dropdowns[1].id}
                    defaultName={dropdowns[1].defaultName}
                    options={dropdowns[1].options}
                    selectedOption={dropdowns[1].selectedOption}
                    showOptions={dropdowns[1].showOptions}
                    toggleOptions={() => toggleOptions(dropdowns[1].id)}
                    handleOptionClick={(option) =>
                      handleOptionClick(dropdowns[1].id, option)
                    }
                    id={dropdowns[1].id}
                    w={"16rem"}
                  />

                  <div className="client-modal-profile-pdficon">
                    <img src={PdfIcon} />
                  </div>
                  <div className="client-modal-profile-excelicon">
                    <img src={ExcelIcon} />
                  </div>

                  <ClientDropDown
                    key={dropdowns[2].id}
                    options={dropdowns[2].options}
                    selectedOption={dropdowns[2].selectedOption}
                    showOptions={dropdowns[2].showOptions}
                    toggleOptions={() => toggleOptions(dropdowns[2].id)}
                    handleOptionClick={(option) =>
                      handleOptionClick(dropdowns[2].id, option)
                    }
                    id={dropdowns[2].id}
                    w={"24%"}
                    color={"#F8AC1DAD"}
                  />
                </div>
              </div>
              <div className="client-modal-card-container">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClientModal;



  {/* <div className="patna">
        <div className="basement-form-dimensions">
          <div className="floor-header">
            <div className="floor-heading">Floor 1</div>
            <div className="mmBtn">mm</div>
          </div>
          <hr className="client-form-hr" />

          <div className="dimenstions-container">
            <div className="floor-section">
              <div className="floor">
                <div>
                  <div className="floor-input-wrapper">
                    <div>
        

                      <ElevatorInput
                        label={"Shaft Width"}
                        name={"Shaft Width"}
                        value={clientFormData.hello}
                        w="12vw"
                      />
                    </div>
                    <div>
                    <ElevatorInput
                        label={"Shaft Depth"}
                        name={"Shaft Depth"}
                        value={clientFormData.hello}
                        w="12vw"
                      />
                    </div>
                    <div>
                    <ElevatorInput
                        label={"Door Width"}
                        name={"Door Width"}
                        value={clientFormData.hello}
                        w="12vw"
                      />                    </div>
                    <div>
                    <ElevatorInput
                        label={"Door Height"}
                        name={"Door Height"}
                        value={clientFormData.hello}
                        w="12vw"
                      />
                    </div>

                    <div>
                    <ElevatorInput
                        label={"Door Width"}
                        name={"Door Width"}
                        value={clientFormData.hello}
                        w="12vw"
                      />
                    </div>
                    <div className="floor-fl-fr-container">
                      <ElevatorInput
                        label={"FL"}
                        name={"FL"}
                        value={clientFormData.hello}
                        w="6vw"
                      />

                      <ElevatorInput
                        label={"FR"}
                        name={"FR"}
                        value={clientFormData.stops}
                        w="5vw"
                      />
                    </div>
                  </div>

                  <div className="site-photos">Site Photos</div>
                  <div className="dimension-btn-wrapper">
                    <label className="dimension-btn">
                      Pit
                      <input className="hidden-input" type="file" />
                    </label>
                    <div className="dimension-upload-btn">
                      <label className="dimension-btn">
                        <span>Bottom to Top</span>
                        <input className="hidden-input" type="file" />
                      </label>
                    </div>
                    <div className="dimension-upload-btn">
                      <label className="dimension-btn">
                        <span>Basement Front</span>
                        <input className="hidden-input" type="file" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="delhi">
        <div className="patna">
          <div className="basement-form-dimensions">
            <div className="floor-header">
              <div className="floor-heading">Floor 2</div>
              <div className="mmBtn">mm</div>
            </div>
            <hr className="client-form-hr" />

            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
                  <div>
                    <div className="floor-input-wrapper">
                      <div>
                        <AnimatedInput
                          label={"Shaft Width"}
                          name={"Shaft Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Shaft Depth"}
                          name={"Shaft Depth"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Width"}
                          name={"Door Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Height"}
                          name={"Door Height"}
                        />
                      </div>

                      <div>
                        <AnimatedInput
                          label={"Floor to Floor Height"}
                          name={"Floor to Floor Height"}
                        />
                      </div>
                      <div className="floor-fl-fr-container">
                        <AnimatedInput label={"FL"} name={"FL"} />
                        <AnimatedInput label={"FR"} name={"FR"} />
                      </div>
                    </div>

                    <div className="site-photos">Site Photos</div>
                    <div className="dimension-btn-wrapper">
                      <label className="dimension-btn">
                        Pit
                        <input className="hidden-input" type="file" />
                      </label>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Bottom to Top</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Basement Front</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="delhi">
        <div className="patna">
          <div className="basement-form-dimensions">
            <div className="floor-header">
              <div className="floor-heading">Floor Top</div>
              <div className="mmBtn">mm</div>
            </div>
            <hr className="client-form-hr" />

            <div className="dimenstions-container">
              <div className="floor-section">
                <div className="floor">
                  <div>
                    <div className="floor-input-wrapper">
                      <div>
                        <AnimatedInput
                          label={"Shaft Width"}
                          name={"Shaft Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Shaft Depth"}
                          name={"Shaft Depth"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Width"}
                          name={"Door Width"}
                        />
                      </div>
                      <div>
                        <AnimatedInput
                          label={"Door Height"}
                          name={"Door Height"}
                        />
                      </div>

                      <div className="rrr">
                        <AnimatedInput
                          label={"Overhead (opt)"}
                          name={"Overhead"}
                        />
                      </div>
                    </div>

                    <div className="site-photos">Site Photos</div>
                    <div className="dimension-btn-wrapper">
                      <label className="dimension-btn">
                        Pit
                        <input className="hidden-input" type="file" />
                      </label>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Bottom to Top</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                      <div className="dimension-upload-btn">
                        <label className="dimension-btn">
                          <span>Basement Front</span>
                          <input className="hidden-input" type="file" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
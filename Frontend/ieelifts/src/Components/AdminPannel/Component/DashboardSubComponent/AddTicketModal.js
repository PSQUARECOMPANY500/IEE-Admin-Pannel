import React, { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "./DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "./DropdownCollection/MultiSelectDropdown";
// import ModalDropdown from "./ModalDropdown";

const AddTicketModal = ({ closeModal, showTicketModal, modalNumber }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  const getDynamicData = () => {
    // Use modalNumber to determine the data dynamically
    if (modalNumber === 1) {
      return {
        jon: "Some value 1",
        name: "Preet Pankaj",
        class: "col-dynamic",
        inputFiled: false,
      };
    } else if (modalNumber === 2) {
      return {
        jon: "Some value 2",
        name: "Another Name",
        class: "col-dynamic",
        inputFiled: false,
      };
    } else if (modalNumber === 3) {
      return {
        jon: "Some value 3",
        name: "Yet Another Name",
        class: "col-dynamic",
        inputFiled: false,
      };
    } else if (modalNumber === 0) {
      return {
        jon: "365365",
        name: "Yet Another Name",
        class: "shadow-dynamic",
      };
    } else if (modalNumber === 4) {
      return {
        jon: "0000000",
        name: "ths is my name",
        class: "col-dynamic",
        class2: "dynamic-background",
        inputFiled: false,
      };
    } else if (modalNumber === 5) {
      return {
        jon: "1010101010",
        name: "ths is my second name",
        class: "col-dynamic",
        class2: "dynamic-background",
        inputFiled: false,
      };
    }
  };

  const dynamicData = getDynamicData();

  return (
    <>
      <div
        className={`modal-wrapper ${dynamicData.class2}`}
        onClick={closeModal}
      ></div>

      <div className={`modal-container ${showTicketModal ? "active" : ""}`}>
        <div className="cross-icon" onClick={closeModal}>
          <RxCross2 />
        </div>

        <div className="child-modal-container">
          <div className="client-section">
            <div className="upload-photo-secton">
              <img
                style={{ width: "200px", height: "200px" }}
                src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                alt="lift"
              />
            </div>

            <div className="client-information-section">
              <form className="client-form">
                {/* one row strats */}
                <div className="row">
                  <div className="col25">
                    <label>JON:</label>
                  </div>

                  <div className="col75">
                    <input
                      className={`${dynamicData.class}`}
                      type="text"
                      name="name"
                      value={dynamicData.jon}
                    />
                  </div>
                </div>
                {/* one row ends */}

                <div className="row">
                  <div className="col25">
                    <label>NAME:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value="Preet Pankaj"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>NUMBER:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value="9416481863"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>ADDRESS:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value="Address Address Address"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>TYPE OF ISSUE:</label>
                  </div>

                  <div className="col75">
                    {dynamicData.inputFiled === false ? (
                      <input
                        type="text"
                        name="name"
                        value="Door not working"
                        style={{ border: "none" }}
                      />
                    ) : (
                      <SingleSetDropdown padding="8px" width="85%" />
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>DESCRIPTION:</label>
                  </div>

                  <div className="col75">
                    {dynamicData.inputFiled === false ? (
                      <input
                        type="text"
                        name="name"
                        value="Door not working"
                        style={{ border: "none" }}
                      />
                    ) : (
                      <textarea
                        id="subject"
                        name="subject"
                        style={{ height: "50px", resize: "none" }}
                      ></textarea>
                    )}
                  </div>
                </div>
              </form>
            </div>

            {/* membership-information-section section starts */}
            <div className="membership-information-section">
              <form className="client-form2">
                <div className="row">
                  <div className="col25">
                    <label>NO. OF CALLBACKS:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={6} />
                  </div>
                </div>

                <div className="row">
                  <div className="col25">
                    <label>MEMBERSHIP:</label>
                  </div>

                  <div className="col75">
                    <input
                      type="text"
                      name="name"
                      value={"GOLD"}
                      style={{ color: "#F8AC1D", fontWeight: "600" }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>DATE REPORTED:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={"12/12/23"} />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>TIME REPORTED:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={"01:34"} />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* membership-information-section section ends */}

          <div className="elevator-section">
            <div className="elevator-engg-detail-section">
              <div className="sub-engg-detail-section">
                <span>ENGINEER DETAILS</span>

                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>TYPE:</label>
                  </div>
                  <div className="col-elevator75">
                    <input type="text" name="name" value={"Hydraulic"} />
                  </div>
                </div>
                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>FLOORS:</label>
                  </div>
                  <div className="col-elevator75">
                    <input type="text" name="name" value={"G+2"} />
                  </div>
                </div>
                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>DOH:</label>
                  </div>
                  <div className="col-elevator75">
                    <input type="text" name="name" value={"10/03/2015"} />
                  </div>
                </div>
              </div>

              <div className="sub-engg-detail-section">
                <div style={{ marginTop: "10px" }}>
                  <p>ENGINEER DETAILS</p>

                  <div className="engg-photo-section">
                    <div>
                      <img
                        style={{ width: "90px", height: "90px" }}
                        src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                        alt="lift"
                      />
                    </div>
                    <div style={{ width: "60%" }}>
                      <div className="elevator-detail-row">
                        <div className="col-elevator75">
                          <input type="text" name="name" value={"2022100"} />
                        </div>
                      </div>
                      <div className="elevator-detail-row">
                        <div className="col-elevator75">
                          <input
                            type="text"
                            name="name"
                            value={"Arjun Rawat"}
                          />
                        </div>
                      </div>
                      <div className="elevator-detail-row">
                        <div className="col-elevator75">
                          <input type="text" name="name" value={"9898989898"} />
                        </div>
                      </div>
                      <div className="elevator-detail-row">
                        <div className="col-elevator75">
                          <input
                            type="text"
                            name="name"
                            value={"Address, Address"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="elevator-detail-row"
                      style={{ marginTop: "10px" }}
                    >
                      <div className="col-elevator25" style={{ width: "30%" }}>
                        <label>LOCATION:</label>
                      </div>
                      <div className="col-elevator75">
                        <input type="text" name="name" value={"Punchkula"} />
                      </div>
                    </div>
                    <div className="elevator-detail-row">
                      <div className="col-elevator25" style={{ width: "30%" }}>
                        <label>RATING:</label>
                      </div>
                      <div className="col-elevator75">
                        <input type="text" name="name" value={"4.2"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="Assign-engg-detail-section">
              <div className="engg-form">
                <div className="grid-form-container">
                  <div class="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      {/* <SingleSetDropdown/> */}
                      <MultiSelectDropdown />
                    </div>
                  </div>
                  <div class="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      <SingleSetDropdown padding="6px" width="100%" />
                    </div>
                  </div>
                  <div class="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      <MultiSelectDropdown />
                    </div>
                  </div>

                  <div class="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      <SingleSetDropdown padding="6px" width="100%" />
                    </div>
                  </div>
                </div>
                <div className="col75">
                  <textarea
                    id="subject"
                    name="subject"
                    style={{
                      height: "90px",
                      width: "78%",
                      marginLeft: "10%",
                      resize: "none",
                    }}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <div className="buttons">
              <button className="edit-button">Edit</button>
              <button className="assign-button">Assign</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTicketModal;

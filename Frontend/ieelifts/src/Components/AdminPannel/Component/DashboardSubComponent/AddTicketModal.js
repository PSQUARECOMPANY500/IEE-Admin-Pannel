import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "./DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "./DropdownCollection/MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchCallbackDetailWithCallbackIdAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchAllClientDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchChecklistAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchEnggDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { assignCallBackByAdminAction } from "../../../../ReduxSetup/Actions/AdminActions";


import ReactDatePickers from "./DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";


const AddTicketModal = ({
  closeModal,
  showTicketModal,
  modalNumber,
  callbackId,
}) => {
  const dispatch = useDispatch();

  //  backtrack the engg detail using useState

  //  manage use states for the input fields
  const [jon, setJon] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [modelType, setModelType] = useState("");
  const [enggDetail, setEnggDetail] = useState([]);
  const [slot, setSlot] = useState([]);
  // const [selectedEngg, setSelectedEngg] = useState([]);
  // const [checklist, setChecklist] = useState("");
  // const [selectedSlot, setSelectedSlot] = useState("");
  // const [selectedDate, setSelectedDate] = useState("");
  // const [comments, setComments] = useState("");

  //handle engg Data change state
  const [enggJon, setEnggJon] = useState("");
  const [enggName, setEnggName] = useState("");
  const [enggPhone, setEnggPhone] = useState("");
  const [enggAddress, setEnggAddress] = useState("");
  const [enggLocation, setEnggLocation] = useState("");
  const [enggRating, setEnggRating] = useState("");

  //slots logic here starts-------------------------------------------------
  const timeSlots = [
    {
      slot: "9:00-10:00",
    },
    {
      slot: "10:00-11:00",
    },
    {
      slot: "11:00-12:00",
    },
    {
      slot: "12:00-13:00",
    },
    {
      slot: "13:00-14:00",
    },
    {
      slot: "14:00-15:00",
    },
    {
      slot: "15:00-16:00",
    },
    {
      slot: "16:00-17:00",
    },
    {
      slot: "17:00-18:00",
    },
  ];

  const slots = timeSlots.map((slot) => ({
    ...slot,
  }));
  //slots logic here ends-------------------------------------------------

  //using use selector to select the checklist in check list state
  const checkList = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchChecklistReducer &&
      state.AdminRootReducer.fetchChecklistReducer.checklists
    ) {
      return state.AdminRootReducer.fetchChecklistReducer.checklists.Checklists;
    } else {
      return [];
    }
  });
  // console.log(checkList)

  // use use selector to select the user callBack state
  const userCallBackDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchCallbackDetailWithCallbackIdReducer &&
      state.AdminRootReducer.fetchCallbackDetailWithCallbackIdReducer
        .callbackData
    ) {
      return state.AdminRootReducer.fetchCallbackDetailWithCallbackIdReducer
        .callbackData.callback;
    } else {
      return [];
    }
  });
  // console.log(userCallBackDetail);

  // use use selector select to select the service engg state
  const serviceEnggDetail = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchAllClientDetailReducer &&
      state.AdminRootReducer.fetchAllClientDetailReducer.clientDetail
    ) {
      return state.AdminRootReducer.fetchAllClientDetailReducer.clientDetail
        .ServiceEngg;
    } else {
      return [];
    }
  });
  // console.log(serviceEnggDetail);

  // mapping the service engg detail and store it into the variable
  const serviceEnggDetailObject = serviceEnggDetail.map((serviceEngg) => ({
    ...serviceEngg,
  }));

  //mappping the checklist detail and store it inti the variable
  const checkListDetail = checkList.map((checklist) => ({
    ...checklist,
  }));

  //get eng state by use selector hook
  const getEnggState = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
    ) {
      return state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
        .enggDetail;
    }
  });

  useEffect(() => {
    setEnggJon(getEnggState?.EnggId);
    setEnggName(getEnggState?.EnggName);
    setEnggPhone(getEnggState?.PhoneNumber);
    setEnggAddress(getEnggState?.EnggAddress);
  }, [getEnggState]);

  const handleEnggSelectionChange1 = (id) => {
    return;
  };

  //handle Engg dropdown List
  const handleEnggSelectionChange = (selectedOptions) => {
    dispatch(fetchEnggDetailAction(selectedOptions[0]?.value));
  };

  useEffect(() => {
    dispatch(fetchCallbackDetailWithCallbackIdAction(callbackId));
    dispatch(fetchAllClientDetailAction());
    dispatch(fetchChecklistAction());
  }, [dispatch]);

  useEffect(() => {
    setJon(userCallBackDetail?.JobOrderNumber || "");
    setName(userCallBackDetail?.clientDetail?.name || "");
    setNumber(userCallBackDetail?.clientDetail?.PhoneNumber || "");
    setAddress(userCallBackDetail?.clientDetail?.Address || "");
    setTypeOfIssue(userCallBackDetail?.TypeOfIssue || "");
    setDescription(userCallBackDetail?.Description || "");
    setDate(userCallBackDetail?.createdAt || "");
    setModelType(userCallBackDetail?.clientDetail?.ModelType || "");
    setEnggDetail(serviceEnggDetailObject || []);
    setSlot(slots || []);
  }, [userCallBackDetail]);

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
        jon: jon,
        name: name,
        number: number,
        Address: address,
        typeOfIssue: typeOfIssue,
        description: description,
        Date: date,
        time: date,
        modelType: modelType,
        EnggDetail: enggDetail,
        slots: slot,
        checkList: checkListDetail,
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
                      value={dynamicData.name}
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
                      value={dynamicData.number}
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
                      value={dynamicData.Address}
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
                        value={dynamicData.typeOfIssue}
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
                        value={dynamicData.description}
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
                    <input type="text" name="name" value={0} />
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
                    <input type="text" name="name" value={dynamicData.Date} />
                  </div>
                </div>
                <div className="row">
                  <div className="col25">
                    <label>TIME REPORTED:</label>
                  </div>

                  <div className="col75">
                    <input type="text" name="name" value={dynamicData.Date} />
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* membership-information-section section ends */}

          <div className="elevator-section">
            <div className="elevator-engg-detail-section">
              <div className="sub-engg-detail-section">
                <span>ELEVATOR DETAILS</span>

                <div className="elevator-detail-row">
                  <div className="col-elevator25">
                    <label>TYPE:</label>
                  </div>
                  <div className="col-elevator75">
                    <input
                      type="text"
                      name="name"
                      value={dynamicData.modelType}
                    />
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

              {/*engg detail div start here------------------------------------------------------------------------------  */}
              <div className="sub-engg-detail-section">
                <div style={{ marginTop: "10px" }}>
                  <p>ENGINEER DETAILS</p>

                  <div className="engg-photo-section">
                    <div>
                      {enggJon ? (
                        <img
                          style={{ width: "90px", height: "90px" }}
                          src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                          alt="lift"
                        />
                      ) : (
                        <SkeltonLoader width="90px" height="90px" />
                      )}
                    </div>

                    <div style={{ width: "50%" }}>
                      {enggJon ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input type="text" name="name" value={enggJon} />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {enggJon ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input type="text" name="name" value={enggName} />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {enggJon ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input type="text" name="name" value={enggPhone} />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}

                      {enggJon ? (
                        <div className="elevator-detail-row">
                          <div className="col-elevator75">
                            <input
                              type="text"
                              name="name"
                              value={enggAddress}
                            />
                          </div>
                        </div>
                      ) : (
                        <SkeltonLoader width="80px" height="10px" />
                      )}
                    </div>
                  </div>

                  <div>
                    {enggJon ? (
                      <div
                        className="elevator-detail-row"
                        style={{ marginTop: "10px" }}
                      >
                        <div
                          className="col-elevator25"
                          style={{ width: "30%" }}
                        >
                          <label>LOCATION:</label>
                        </div>
                        <div className="col-elevator75">
                          <input type="text" name="name" value={enggLocation} />
                        </div>
                      </div>
                    ) : (
                      <SkeltonLoader width="100px" height="10px" />
                    )}

                    {enggJon ? (
                      <div className="elevator-detail-row">
                        <div
                          className="col-elevator25"
                          style={{ width: "30%" }}
                        >
                          <label>RATING:</label>
                        </div>
                        <div className="col-elevator75">
                          <input type="text" name="name" value={enggRating} />
                        </div>
                      </div>
                    ) : (
                      <SkeltonLoader width="100px" height="10px" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="Assign-engg-detail-section">
              <div className="engg-form">
                <div className="grid-form-container">
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      {/* <SingleSetDropdown/> */}
                      <MultiSelectDropdown
                        placeholder="Select Enggineers"
                        Details={dynamicData.EnggDetail}
                        onSelectionchange={handleEnggSelectionChange}
                      />
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      <SingleSetDropdown
                        padding="6px"
                        width="100%"
                        placeholder="Allot A Checklist"
                        Details={dynamicData.checkList}
                      />
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      <MultiSelectDropdown
                        placeholder="Select Slot"
                        slots={slots}
                        onSelectionchange={handleEnggSelectionChange1}
                      />
                    </div>
                  </div>

                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {/* <ModalDropdown></ModalDropdown> */}
                      {/* <SingleSetDropdown padding="6px" width="100%" placeholder="Select Date"/> */}
                      <div className="data-pic">
                        <ReactDatePickers className="date-picker-dropdown" />
                      </div>
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

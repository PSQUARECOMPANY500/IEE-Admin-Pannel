//................................{amit}....................................
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import SingleSetDropdown from "./DropdownCollection/SingleSetDropdown";
import MultiSelectDropdown from "./DropdownCollection/MultiSelectDropdown";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllClientDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchChecklistAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { fetchEnggDetailAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { assignCallBackByAdminAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { requestClientDetailsByJon } from "../../../../ReduxSetup/Actions/ClientActions";
import { requestCallBackByAdmin } from "../../../../ReduxSetup/Actions/ClientActions"; //request-callbacks that show on the ticket table
import { getBookedSlotsforEnggsAction } from "../../../../ReduxSetup/Actions/AdminActions";

import toast from "react-hot-toast";

import { assignserviceRequestByAdmin } from "../../../../ReduxSetup/Actions/AdminActions";
import { requestServiceRequestByAdmin } from "../../../../ReduxSetup/Actions/ClientActions";

import ReactDatePickers from "./DropdownCollection/ReactDatePickers";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";
import config from "../../../../config";

const AddTicketOnCallRequests = ({
  closeModal,
  showTicketModal,
  setRenderTicket,
  requestSection,
  setTicketUpdate,
}) => {
  const dispatch = useDispatch();

  const [selectedEnggId, setSelectedEnggId] = useState([]);
  const [flag, setFlag] = useState(false);

  //  callback-request-state
  const [jon, setJon] = useState(""); //call-api-using-jon

  const [name, setname] = useState(""); //-api
  const [number, setnumber] = useState(""); //-api
  const [address, setaddress] = useState(""); //-api
  const [ModelType, setModelType] = useState("");
  const [typeOfIssue, setTypeOfIssue] = useState(""); //-done
  const [time, setTime] = useState(""); //-done
  const [date, setDate] = useState(""); //-done
  const [dtext, setdtext] = useState(""); //-done
  const [membershipType,setMembershipType] = useState('')
  const[doh,setDoh]=useState('')

  const [timer, setTimer] = useState(null);
  const [engDate, setengDate] = useState("");

  //assign-callbacks-state
  const [engDetails, setEngDetails] = useState({
    enggJon: "",
    enggName: "",
    enggPhone: "",
    enggAddress: "",
    enggLocation: "",
    enggRating: "",
    enggPhoto: "",
    repersentativeName: "",
    repersentativeNumber: "",
  });

  console.log("length", engDetails.enggName.length);

  const [ClickListOnSelect, setClickListOnSelect] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [message, setMessage] = useState("");

  const [reName, setreName] = useState("");
  const [reNumber, setreNumber] = useState("");

  // console.log("5555555555555555555", reNumber);

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
      slot: "12:00-01:00",
    },
    {
      slot: "02:00-03:00",
    },
    {
      slot: "03:00-04:00",
    },
    {
      slot: "04:00-05:00",
    },
  ];
  const bookedDateForEngg = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.getBookedSlotsforEnggsReducer &&
      state.AdminRootReducer.getBookedSlotsforEnggsReducer.bookedDatesEngg
    ) {
      return state.AdminRootReducer.getBookedSlotsforEnggsReducer
        .bookedDatesEngg.BookedSlots;
    } else {
      return null;
    }
  });
  // console.log('bookedDateForEngg',bookedDateForEngg)

  const filterTimeAsPerSchedule = () => {
    const currentTime = new Date();

    // Convert to IST
    const ISTOffset = 5 * 60 * 60 * 1000 + 30 * 60 * 1000; // IST offset UTC+5:30
    const currentTimeIST = new Date(currentTime.getTime() + ISTOffset);

    const hoursIST = currentTimeIST.getUTCHours();

    return hoursIST;
  };
  const timeSlotHours = [9, 10, 11, 12, 14, 15, 16];

  const filterTime = timeSlotHours.filter((item) => {
    if (engDate === new Date().toLocaleDateString("en-GB")) {
      return item > filterTimeAsPerSchedule();
    } else {
      return item;
    }
  });


  const filteredSlots = timeSlots
    .slice(timeSlots.length - filterTime.length)
    .filter((slot, i) => {
      const engg = bookedDateForEngg?.find(
        (engg) => engg.ServiceEnggId === selectedEnggId[0]
      );
      const bookedSlots = engg ? engg.slots : [];

      return !bookedSlots.includes(slot.slot);
    });


  //-------------------------------------------------
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
      return;
    }
  });

  //using use selector to select the checklist in check list state
  const checkList = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchChecklistReducer &&
      state.AdminRootReducer.fetchChecklistReducer.checklists
    ) {
      return state.AdminRootReducer.fetchChecklistReducer.checklists.Checklists;
    } else {
      return;
    }
  });

  const getEnggState = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer &&
      state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
    ) {
      return state.AdminRootReducer.fetchEnggDetailReducer.enggDetail
        .enggDetail;
    }
    return;
  });

  const clientDetails = useSelector((state) => {
    return state?.AdminRootReducer?.fetchClientDetailsByJon?.clientDetails
      ?.client;
  });
 
  const callBackDetails=useSelector((state)=>{
    return state?.AdminRootReducer?.fetchClientDetailsByJon?.clientDetails
    ?.callbacks;
  })

  //  console.log("}}}}}}}",clientDetails)

  useEffect(() => {
    if (clientDetails) {
      setname(clientDetails.name);
      setnumber(clientDetails.PhoneNumber);
      setaddress(clientDetails.Address);
      setModelType(clientDetails.ModelType);
      setMembershipType(clientDetails.MembershipType)
      setDoh(clientDetails.DateOfHandover)

      const currentDate = new Date();
      const formatedDate = `${currentDate.getDate()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
      const updatedFormatedDate = currentDate.toLocaleDateString("en-GB");
      console.log(updatedFormatedDate);
      setDate(updatedFormatedDate);

      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();
      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setTime(formattedTime);
    } else {
      setname("");
      setnumber("");
      setaddress("");
      setModelType("");
      setDate("");
      setTime("");
      setMembershipType('')
      setDoh('')
    }
  }, [clientDetails]);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      if (jon) {
        dispatch(requestClientDetailsByJon(jon));
      }
    }, 1000);

    setTimer(newTimer);

    return () => {
      dispatch(requestClientDetailsByJon());
      dispatch(requestCallBackByAdmin());
      clearTimeout(newTimer);
    };
  }, [jon, dispatch]);

  useEffect(() => {
    dispatch(fetchAllClientDetailAction());

    if (requestSection) {
      dispatch(fetchChecklistAction("service"));
    } else {
      dispatch(fetchChecklistAction("callback"));
    }

    return () => {
      dispatch(fetchEnggDetailAction());
    };
  }, []);

  useEffect(() => {
    //no problem
    if (getEnggState) {
      // console.log("Engg state is True");
      setEngDetails({
        enggJon: getEnggState.EnggId,
        enggName: getEnggState.EnggName,
        enggPhone: getEnggState.PhoneNumber,
        enggAddress: getEnggState.EnggAddress,
        enggPhoto: getEnggState.EnggPhoto,
        repersentativeName: getEnggState.RepresentativeName,
        repersentativeNumber: getEnggState.RepresentativeNumber,
      });
    }
  }, [getEnggState]);

  const handleEnggSelectionChange = (selectedOptions) => {
    setSelectedEnggId(selectedOptions); // selected Engg id
    dispatch(fetchEnggDetailAction(selectedOptions));

    if (selectedOptions.length === 0) {
      dispatch(fetchEnggDetailAction());
    }
  };

  const handleEnggSelectionChange1 = (value) => {
    setSelectedSlot(value);
  };

  const handleSingleSetDropdown = (selectedOptions) => {
    setClickListOnSelect(selectedOptions);
  };

  const handleTypeOfIssue = (selectedOption) => {
    setTypeOfIssue(selectedOption);
  };

  const handleAssignDateChange = (selectedOption) => {
    const formattedDate = selectedOption.toLocaleDateString("en-GB");
    setengDate(formattedDate);

    dispatch(getBookedSlotsforEnggsAction(formattedDate));
  };

  const handleElevatorSectionDetails = async () => {
    if (requestSection) {
      dispatch(
        requestServiceRequestByAdmin(
          jon,
          date,
          time,
          typeOfIssue.label,
          dtext,
          reName,
          reNumber
        )
      ).then((RequestId) => {
        if (engDetails.enggJon && ClickListOnSelect && selectedSlot && date) {
          dispatch(
            assignserviceRequestByAdmin(
              engDetails?.enggJon,
              jon,
              RequestId,
              ClickListOnSelect.value,
              selectedSlot,
              engDate,
              message,
              engDetails?.enggName,
              engDetails.enggJon,
              reName,
              reNumber
            )
          );
          closeModal();
        } else {
          toast.error("Please fill all the fields");
        }
      });
    } else {
      dispatch(
        requestCallBackByAdmin(
          jon,
          date,
          time,
          typeOfIssue.label,
          dtext,
          reName,
          reNumber
        )
      ).then((callbackId) => {
        if (engDetails.enggJon && ClickListOnSelect && selectedSlot && date) {
          dispatch(
            assignCallBackByAdminAction(
              engDetails?.enggJon,
              jon,
              callbackId,
              ClickListOnSelect.value,
              selectedSlot,
              engDate,
              message,
              engDetails?.enggName,
              engDetails.enggJon
            )
          );
          closeModal();
        } else {
          toast.error("Please fill all the fields");
        }
      });
    }
    setRenderTicket((prev) => !prev);
    if (setTicketUpdate) {
      setTicketUpdate((prev) => !prev);
    }
  };







  

  const handlleValidation = (e) => {
    if (e.target.name === "phoneNumber") {
      const phonePattern = /^(?:\+91|91)?[6-9]\d{9}$/;
      const input = e.target.value;

      if (
        (input.startsWith("+91") && input.length > 13) ||
        (input.startsWith("91") && input.length > 12) ||
        (!input.startsWith("91") &&
          !input.startsWith("+91") &&
          input.length > 10)
      ) {
        return;
      }
      if (phonePattern.test(input)) {
        setreNumber(input);
      } else {
        setreNumber(input);
      }
    }

    if (e.target.name === "text") {
      const input = e.target.value;
      const nonNumericPattern = /^[A-Za-z\s]*$/;
      if (nonNumericPattern.test(input)) {
        setreName(input);
      }
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 1500) {
      setFlag(true);
    }
  }, [window.innerWidth]);
  return (
    <>
      <div className={`modal-wrapper`} onClick={closeModal}></div>

      <div className={`modal-container ${showTicketModal ? "active" : ""}`}>
        <div className="child-modal-container">
          <div className="sub-child-modal-container">
            <div className="req-client-section">
              <div className="cross-icon" onClick={closeModal}>
                <RxCross2 style={{ cursor: "pointer" }} />
              </div>
              <div className="req-photo-upload-section">
                <div className="req-photo-container">
                  <img
                    src="https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxldmF0b3J8ZW58MHx8MHx8fDA%3D"
                    alt="lift"
                  />
                </div>
              </div>

              <div className="req-client-information-section">
                <form className="req-client-form">
                  {/* one row strats */}
                  <div className="row">
                    <div className="col25">
                      <label>JON:</label>
                    </div>

                    <div className="col75 col75-jon">
                      {/* <input className={``} type="text" name="name" placeholder="Enter-Client-Id"  onChange={(e)=>setJon(e.target.value)} /> */}
                      <input
                        onChange={(e) => setJon(e.target.value)}
                        type="text"
                        placeholder="Enter JON"
                      />
                    </div>
                  </div>
                  {/* one row ends */}

                  <div className="row">
                    <div className="col25">
                      <label>NAME:</label>
                    </div>
                    {name ? (
                      <div className="col75">
                        {/* <input
                              type="text"
                              name="name"
                              value={name}
                              style={{ border: "none" }}
                              
                            />  */}
                        <p>{name}</p>
                      </div>
                    ) : (
                      <div className="col75">
                        <SkeltonLoader width="220px" />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col25">
                      <label>NUMBER:</label>
                    </div>
                    {number ? (
                      <div className="col75">
                        <p>{number}</p>
                      </div>
                    ) : (
                      <div className="col75">
                        <SkeltonLoader width="220px" />
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col25">
                      <label>ADDRESS:</label>
                    </div>
                    {address ? (
                      <div className="col75">
                        <p>{address}</p>
                      </div>
                    ) : (
                      <div className="col75">
                        <div>
                          <SkeltonLoader width="220px" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="row">
                    <div className="col25">
                      <label>TYPE OF ISSUE:</label>
                    </div>

                    <div className="col75 col75-typeOfIssue">
                      <SingleSetDropdown
                        padding="8px"
                        width="220px"
                        className="dropdown-chnages"
                        placeholder={"Type Of Issue"}
                        Details={[
                          { _id: 1, checklistName: "Door" },
                          { _id: 2, checklistName: "Light" },
                          { _id: 3, checklistName: "Fan" },
                          { _id: 4, checklistName: "Buttons" },
                          { _id: 5, checklistName: "Lift" },
                          { _id: 6, checklistName: "Other" },
                        ]}
                        onStateChange={handleTypeOfIssue}
                        flag={flag}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col25">
                      <label style={{ marginBottom: "2rem" }}>
                        DESCRIPTION:
                      </label>
                    </div>
                    <div className="col75">
                      <textarea
                        id="subject"
                        name="subject"
                        style={{
                          height: "50px",
                          resize: "none",
                          width: "220px",
                        }}
                        onChange={(e) => setdtext(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </form>
              </div>

              <div className="req-membership-information-section">
                <div className="membership-form-container">
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>NO. OF CALLBACKS: </p>
                    </div>
                    {callBackDetails?<div className="membership-form-col2">
                      <p>{callBackDetails&&callBackDetails.length}</p>
                    </div>
                    :<div className="membership-form-col22">
                        <SkeltonLoader width="100px" />
                      </div>}
                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p> MEMBERSHIP: </p>
                    </div>
                    {membershipType?<div className="membership-form-col2">
                      <p style={{ color: "#F8AC1D" }}> {membershipType}</p>
                    </div>
                    :<div className="membership-form-col22">
                        <SkeltonLoader width="100px" />
                      </div>}
                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>DATE REPORTED:</p>
                    </div>

                    {date ? (
                      <div className="membership-form-col2">
                        <p>{date}</p>
                      </div>
                    ) : (
                      <div className="membership-form-col22">
                        <SkeltonLoader width="100px" />
                      </div>
                    )}
                  </div>
                  <div className="membership-form-row">
                    <div className="membership-form-col1">
                      <p>TIME REPORTED:</p>
                    </div>
                    {time ? (
                      <div className="membership-form-col2">
                        <p>{time}</p>
                      </div>
                    ) : (
                      <div className="membership-form-col22">
                        <SkeltonLoader width="100px" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="req-elevator-section">
              <div className="req-elevator-section-left">
                <div className="req-elevator-details">
                  <h1>ELEVATOR DETAILS</h1>
                  <div className="sub-req-elevator-details">
                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>TYPE:</p>
                      </div>

                      {ModelType ? (
                        <div className="req-elevator-col2">
                          <p>{ModelType}</p>
                        </div>
                      ) : (
                        <div className="col75">
                          <SkeltonLoader width="80px" />
                        </div>
                      )}
                    </div>
                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>FLOORS:</p>
                      </div>
                      <div className="req-elevator-col2">
                        <p>NA</p>
                      </div>
                    </div>
                    <div className="req-elevator-row">
                      <div className="req-elevator-col1">
                        <p>DOH:</p>
                      </div>
                      {doh?<div className="req-elevator-col2">
                        <p> {doh}</p>
                      </div>
                      :<div className="membership-form-col22">
                        <SkeltonLoader width="100px" />
                      </div>}
                    </div>
                  </div>
                </div>

                <div className="req-eng-details">
                  <div className="elevator-engg-detail-section">
                    {/*engg detail div start here------------------------------------------------------------------------------  */}
                    <div className="sub-engg-detail-section">
                      <h1>ENGINEER DETAILS</h1>

                      <div className="engg-photo-section">
                        <div>
                          {getEnggState ? (
                            <img
                              style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "cover",
                                objectPosition: "center",
                                borderRadius: "2px",
                              }}
                              src={`${config.documentUrl}/EnggAttachments/${engDetails.enggPhoto}`}
                              alt="lift"
                            />
                          ) : (
                            <SkeltonLoader
                              width="90px"
                              height="90px"
                              marginBottom="1.6rem"
                            />
                          )}
                        </div>

                        <div style={{ width: "50%" }}>
                          {getEnggState ? (
                            <div className="elevator-detail-row">
                              <div className="col-elevator75">
                                <input
                                  type="text"
                                  name="name"
                                  autoComplete="off"
                                  value={engDetails.enggJon}
                                />
                              </div>
                            </div>
                          ) : (
                            <SkeltonLoader
                              width="200px"
                              height="20px"
                              marginBottom="10px"
                            />
                          )}

                          {getEnggState ? (
                            <div className="elevator-detail-row">
                              <div className="col-elevator75">
                                <input
                                  type="text"
                                  name="name"
                                  autoComplete="off"
                                  value={engDetails.enggName}
                                />
                              </div>
                            </div>
                          ) : (
                            <SkeltonLoader
                              width="200px"
                              height="20px"
                              marginBottom="10px"
                            />
                          )}

                          {getEnggState ? (
                            <div className="elevator-detail-row">
                              <div className="col-elevator75">
                                <input
                                  type="text"
                                  name="name"
                                  autoComplete="off"
                                  value={engDetails.enggPhone}
                                />
                              </div>
                            </div>
                          ) : (
                            <SkeltonLoader
                              width="200px"
                              height="20px"
                              marginBottom="10px"
                            />
                          )}

                          {getEnggState ? (
                            <div className="elevator-detail-row">
                              <div className="col-elevator75">
                                <input
                                  type="text"
                                  name="name"
                                  autoComplete="off"
                                  value={engDetails.enggAddress}
                                />
                              </div>
                            </div>
                          ) : (
                            <SkeltonLoader
                              width="200px"
                              height="20px"
                              marginBottom="10px"
                            />
                          )}
                        </div>
                      </div>

                      <div>
                        {getEnggState ? (
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
                              <input
                                type="text"
                                autoComplete="off"
                                name="name"
                                value={engDetails.enggLocation}
                              />
                            </div>
                          </div>
                        ) : (
                          <SkeltonLoader
                            width="200px"
                            height="20px"
                            marginBottom="10px"
                          />
                        )}

                        {getEnggState ? (
                          <div className="elevator-detail-row">
                            <div
                              className="col-elevator25"
                              style={{ width: "30%" }}
                            >
                              <label>RATING:</label>
                            </div>
                            <div className="col-elevator75">
                              <input
                                type="text"
                                name="name"
                                autoComplete="off"
                                value={engDetails.enggRating}
                              />
                            </div>
                          </div>
                        ) : (
                          <SkeltonLoader width="100px" height="10px" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="req-elevator-section-right">
                <div className="grid-form-container">
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <div className="data-pic">
                        <ReactDatePickers
                          className="date-picker-dropdown"
                          OnDateChange={handleAssignDateChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDate ? (
                        <MultiSelectDropdown
                          placeholder={"Select Engineer"}
                          Details={serviceEnggDetail}
                          handleEnggSelectionChange={handleEnggSelectionChange}
                          flag={flag}
                        />
                      ) : (
                        <div className="col75">
                          <input
                            placeholder={"Select Engineer"}
                            disabled={true}
                            style={{ width: "109%", boxShadow: "none" }}
                            autoComplete="off"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      {engDetails.enggName ? (
                        <MultiSelectDropdown
                          placeholder={"Select Slot"}
                          slots={filteredSlots}
                          handleEnggSelectionChange={handleEnggSelectionChange1} //FIXME:
                          flag={flag}
                        />
                      ) : (
                        <div className="col75">
                          <input
                            placeholder={"Select Slot"}
                            disabled={true}
                            style={{ width: "109%", boxShadow: "none" }}
                            autoComplete="off"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="sm-box sm-box--2">
                    <div className="col75">
                      <SingleSetDropdown
                        padding="0.5rem"
                        width="100%"
                        placeholder={"Allot A Checklist"}
                        Details={checkList}
                        onStateChange={handleSingleSetDropdown}
                        isSearchable={false}
                        flag={flag}
                        requestSection={requestSection}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid-form-container2">
                  <div className="col75">
                    {/* <input placeholder={reName || "Enter Representative Name (Optional)"} onChange={(e) => setreName(e.target.value)} autoComplete="off"/> */}
                    <input
                      placeholder={
                        reName || "Enter Representative Name (Optional)"
                      }
                      onChange={(e) => handlleValidation(e)}
                      autoComplete="off"
                      value={reName}
                      name="text"
                    />
                  </div>

                  <div className="col75">
                    {/* <input placeholder={reNumber || "Enter Representative Number (Optional)"} value={reNumber} onChange={(e) => setreNumber(e.target.value)} autoComplete="off" type="number" /> */}
                    <input
                      placeholder="Enter Representative Number (Optional)"
                      name="phoneNumber"
                      onChange={(e) => handlleValidation(e)}
                      autoComplete="off"
                      type="number"
                      value={reNumber}
                    />
                  </div>

                  <div className="col75">
                    <textarea
                      id="subject"
                      name="subject"
                      style={{
                        height: "82px",
                        width: "93%",
                        resize: "none",
                      }}
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      placeholder="Add A Message"
                    ></textarea>
                  </div>

                  <div className="footer-section" style={{ width: "80%" }}>
                    <div className="buttons">
                      <button className={`edit-button`}>Edit</button>
                      <button
                        className="assign-button"
                        onClick={handleElevatorSectionDetails}
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTicketOnCallRequests;

// Dashboard.js
import React, { useEffect, useRef, useState } from "react";
import ServiceEnggCrousel from "../DashboardSubComponent/ServiceEnggCrousel";
import TaskLocationSection from "../DashboardSubComponent/TaskLocationSection";
import TicketSection from "../DashboardSubComponent/TicketSection";
import RepotImage from "../DashboardSubComponent/RepotImage";
import { useSelector, useDispatch } from "react-redux";
import AddTicketModals from "../DashboardSubComponent/AddTicketModals";
import ServiceRequestModals from "../ServiceRequestSubComponent/ServiceRequestModals";
import axios from "axios";
import { cancelEnggServiceRequestFormShiftingAction } from "../../../../ReduxSetup/Actions/AdminActions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [kanban, setKanban] = useState(true);
  const [ticketUpdate, setTicketUpdate] = useState(true);
  const [shouldScrollToTop, setShouldScrollToTop] = useState(true);
  const [reportOpen, setReportOpen] = useState(false);
  const [images, setImages] = useState();
  const ref = useRef(null);
  const ref2 = useRef(null);

  const R = useSelector((state) => {
    return state?.AdminRootReducer?.ReportCrouserHandlerReducer;
  });

  console.log("R", R);

  const [renderTicket, setRenderTicket] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      // dispatch(fetchAllCallbacksAction());
    }, 1000);
  }, [renderTicket, dispatch]);

  const [ShowTicketModal1, setShowTicketModal1] = useState(false);

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer;
  });

  console.log(
    "dashboard pit area ##########################",
    AdminReportData?.AdminReportData?.ReportImages?.photo
  );

  const cancelRequestByEngg = useSelector(
    (state) =>
      state?.AdminRootReducer?.cancelEnggCallbackServiceRequestReducer
        ?.cancelRequestData
  );
  // console.log(
  //   "cancelRequestByEngg++++++++++-------------+++++++++++++++---------------++++++++++++++++++++-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++++++++++++++++++-",
  //   cancelRequestByEngg
  // );

  useEffect(() => {
    if (ref.current && shouldScrollToTop) {
      ref2.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (ref.current && !shouldScrollToTop) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [kanban, shouldScrollToTop]);

  const handleKanbanToggle = () => {
    setShouldScrollToTop((prev) => !prev);
    setKanban((prevKanban) => !prevKanban);
  };

  useEffect(() => {
    setImages(AdminReportData?.AdminReportData?.ReportImages[R.Index]?.photo);
    setReportOpen(R.IsOpen);
  }, [R]);

  return (
    <>
      <div ref={ref2} className={`main-container`}>
        {cancelRequestByEngg?.isCallback && cancelRequestByEngg?.callbackId && (
          <AddTicketModals
            closeModal={() =>
              dispatch(cancelEnggServiceRequestFormShiftingAction("", "", ""))
            }
            callbackId={cancelRequestByEngg.callbackId}
            callbackIdtoPassed={cancelRequestByEngg.callbackId}
            setRenderTicket={setRenderTicket}
            setTicketUpdate={setTicketUpdate}
            enggId={cancelRequestByEngg.EnggId}
            isAssigned={false}
            isNotification={true}
          />
        )}

        {!cancelRequestByEngg?.isCallback &&
          cancelRequestByEngg?.callbackId && (
            <ServiceRequestModals
              closeModal={() =>
                dispatch(cancelEnggServiceRequestFormShiftingAction("", "", ""))
              }
              RequestId={cancelRequestByEngg.callbackId}
              RequestIdtoPassed={cancelRequestByEngg.callbackId}
              setRenderTicket={setRenderTicket}
              enggId={cancelRequestByEngg.EnggId}
              setTicketUpdate={setTicketUpdate}
              isAssigned={false}
              isNotification={true}
            />
          )}
        {reportOpen && <RepotImage images={images} />}
        <div style={{ width: "100%", marginTop: "6%" }}>
          <ServiceEnggCrousel ticketUpdate={ticketUpdate} />
          <TaskLocationSection
            ref={ref}
            ticketUpdate={ticketUpdate}
            handleKanbanToggle={handleKanbanToggle}
            kanban={kanban}
          />
          {kanban && <TicketSection setTicketUpdate={setTicketUpdate} />}
        </div>
      </div>
    </>
  );
};
export default Dashboard;

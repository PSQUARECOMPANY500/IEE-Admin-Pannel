// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { createSelector } from "reselect";
import Loader from "../../../CommonComponenets/Loader";
import {
  getClientMembershipDetails,
  getClientMembershipHistoryAction,
  getClientCallsDetails, settingJOBORDER
} from "../../../../ReduxSetup/Actions/AdminActions";

const MembershipExpiring = ({ DemoData, count }) => {

  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const ref = useRef();
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();
  const [state, setState] = useState(0);


  const selectExpiredMembership = createSelector(
    (state) =>
      state.AdminRootReducer?.requestLimitedClientDataExpiringReducer?.expiring?.[type],
    (expiredMembership) => expiredMembership || null // Example transformation
  );

  const memberShipDetails = useSelector(selectExpiredMembership);

  useEffect(() => {
    if (memberShipDetails?.totalPages >= page || page === 1) {
      setLoader(true);
      requestLimitedClientDataAction(dispatch, type, "expiring", page, 10)
        .then(() => setLoader(false))
        .catch((error) => {
          setLoader(false);
        });
    }
  }, [page, type, dispatch]);

  const handleInfiniteScroll = async () => {
    try {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (memberShipDetails && page < memberShipDetails.totalPages) {
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) { }
  };
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleInfiniteScroll);
      return () =>
        currentRef.removeEventListener("scroll", handleInfiniteScroll);
    }
  }, [handleInfiniteScroll]);



  const scrollbar =
    DemoData.dataType === "Warrenty"
      ? "membership_card_scrollable_warrenty"
      : DemoData.dataType === "Platinum"
        ? "membership_card_scrollable_platinum"
        : DemoData.dataType === "Gold"
          ? "membership_card_scrollable_gold"
          : DemoData.dataType === "Silver"
            ? "membership_card_scrollable_silver"
            : "total_revenue_outer_border";

  const job = useSelector((state) =>
    state.AdminRootReducer.settingJONforMembship?.Jon
  )

  useEffect(() => {
    dispatch(getClientMembershipDetails(job));
    dispatch(getClientMembershipHistoryAction(job));
    dispatch(getClientCallsDetails(job, "membership"));
    return () => {
      dispatch(getClientCallsDetails());
      dispatch(getClientMembershipDetails());
      dispatch(getClientMembershipHistoryAction());
    };
  }, [state]);


  useEffect(() => {
    if (memberShipDetails?.clientData[0]?.JobOrderNumber) {
      handleJob(memberShipDetails?.clientData[0]?.JobOrderNumber)
    }
  }, [memberShipDetails?.clientData[0]?.JobOrderNumber])



  const handleJob = (jon) => {
    if (job === jon) {
      return;
    }
    dispatch(settingJOBORDER(jon))
    setState(state + 1);
  };

  return (
    <>
      {ref && (
        <div
          className={
            count !== undefined && count !== null
              ? "membership_card_expiring"
              : "membership_card_expiring_expanded"
          }
        >
          {count !== undefined && count !== null ? (
            <div className="membership_card_expiring-title">
              <p>Expiring Soon</p>
              {memberShipDetails ? <p>{count}</p> : "--"}
            </div>
          ) : (
            <></>
          )}
          <div
            className={`${count !== undefined && count !== null ? "membership_card_scrollable_non_expand" : "membership_card_scrollable_height"} membership_card_scrollable
                } ${scrollbar}`}
            ref={ref}
          >
            {memberShipDetails &&
              memberShipDetails?.clientData.map((data, index) => {
                return (
                  <MembershipSubCard
                    handleJob={handleJob}
                    data={data}
                    isToShowNumber={count ? true : false}
                    isExpired={false}
                    key={index}
                    dataType={DemoData?.dataType}
                  />
                );
              })}
          </div>
          {loader ? (
            <>
              <div className="loder_Container">
                <Loader />
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};
export default MembershipExpiring;

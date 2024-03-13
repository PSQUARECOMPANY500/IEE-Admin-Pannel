// <-----------------------------  Author:- Armaan Singh ----------------------------------->
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
import MembershipLoader from "./MembershipLoader";

const MembershipExpired = ({ DemoData, count }) => {
  // Selectors using Reselect
  const selectAdminRootReducer = (state) => state.AdminRootReducer;
  const selectRequestLimitedClientDataReducer = createSelector(
    selectAdminRootReducer,
    (adminRootReducer) => adminRootReducer.requestLimitedClientDataReducer
  );
  const selectMembershipDetail = createSelector(
    selectRequestLimitedClientDataReducer,
    (requestLimitedClientDataReducer) =>
      requestLimitedClientDataReducer?.membershipDetail
  );
  const selectExpiredMembership = createSelector(
    selectMembershipDetail,
    (membershipDetail) => membershipDetail?.expired?.[type]
  );
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = useRef();
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    setLoader(true);
    requestLimitedClientDataAction(dispatch, type, "expired", page, 10)
      .then(() => setLoader(false))
      .catch((error) => {
        setLoader(false);
      });
  }, [page, type, dispatch]);

  const memberShipDetails = useSelector(selectExpiredMembership);

  useEffect(() => {
    if (memberShipDetails && memberShipDetails.clientData) {
      setPageData((prevData) => {
        const newData = memberShipDetails.clientData.filter(
          (data) =>
            !data.isExpired &&
            !prevData.some(
              (prev) => prev.JobOrderNumber === data.JobOrderNumber
            )
        );
        return [...prevData, ...newData];
      });
    }
  }, [memberShipDetails]);

  const handleInfiniteScroll = async () => {
    try {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (memberShipDetails && page < memberShipDetails.totalPages) {
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return;
  };

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", handleInfiniteScroll);
      return () =>
        currentRef.removeEventListener("scroll", handleInfiniteScroll);
    }
  }, [handleInfiniteScroll]);

  return (
    <>
      {ref && (
        <div
          className={
            count
              ? "membership_card_expiring"
              : "membership_card_expiring_expanded"
          }
        >
          {count !== undefined && count !== null ? (
            <div className="membership_card_expiring-title membership_card_expired-title">
              <p>Expired</p>
              {memberShipDetails ? <p>{count}</p> : "--"}
            </div>
          ) : (
            <></>
          )}

          {loader ? (
            <MembershipLoader />
          ) : (
            <div
              className={`membership_card_scrollable membership_card_scrollable_expired 
          ${!count && "membership_card_scrollable_expanded"}
          `}
              ref={ref}
            >
              {pageData.map((data, index) => {
                return (
                  <MembershipSubCard
                    data={data}
                    isToShowNumber={count ? true : false}
                    isExpired={true}
                    key={index}
                    dataType={DemoData?.dataType}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MembershipExpired;

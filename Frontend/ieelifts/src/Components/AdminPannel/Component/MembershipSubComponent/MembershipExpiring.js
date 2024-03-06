import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
import { createSelector } from "reselect";
const MembershipExpiring = ({ DemoData, count }) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const ref = useRef();
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();
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
    (membershipDetail) => membershipDetail?.expiring?.[type]
  );
  useLayoutEffect(() => {
    requestLimitedClientDataAction(dispatch, type, "expiring", page, 10);
  }, [page, type, dispatch]);
  const memberShipDetails = useSelector(selectExpiredMembership);
  useEffect(() => {
    if (memberShipDetails && memberShipDetails.clientData) {
      setPageData((prevData) => {
        const newData = memberShipDetails.clientData.filter((data) => {
          return (
            !data.isExpired &&
            !prevData.some(
              (prev) => prev.JobOrderNumber === data.JobOrderNumber
            )
          );
        });
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
  };
  useEffect(() => {
    const currentRef = ref.current;
    currentRef.addEventListener("scroll", handleInfiniteScroll);
    return () => currentRef.removeEventListener("scroll", handleInfiniteScroll);
  });
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
  return (
    <div
      className={
        count ? "membership_card_expiring" : "membership_card_expiring_expanded"
      }
    >
      {count !== undefined && count !== null ? (
        <div className="membership_card_expiring-title">
          <p>Expiring Soon</p>
          {<p>{count ? count : 0}</p>}
        </div>
      ) : (
        <></>
      )}
      <div
        className={`membership_card_scrollable ${
          !count && "membership_card_scrollable_expanded"
        } ${scrollbar}`}
        ref={ref}
      >
        {memberShipDetails &&
          pageData &&
          pageData.map((data, index) => (
            <MembershipSubCard
              data={data}
              isToShowNumber={count ? true : false}
              isExpired={false}
              key={index}
              dataType={DemoData?.dataType}
            />
          ))}
      </div>
    </div>
  );
};
export default MembershipExpiring;

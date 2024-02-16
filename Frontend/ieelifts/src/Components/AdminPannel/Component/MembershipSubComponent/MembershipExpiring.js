import React, { useLayoutEffect, useEffect, useRef, useState } from "react";

import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";
const MembershipExpiring = ({ DemoData, setClick, count }) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const ref = useRef();
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
   page && requestLimitedClientDataAction(dispatch, type, "expiring", page, 10);
  }, [page, type, dispatch]);

  const memberShipDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestLimitedClientDataReducer
    ) {
      return (
        state?.AdminRootReducer?.requestLimitedClientDataReducer
          ?.membershipDetail?.expiring?.[type] || {}
      );
    } else {
      return {};
    }
  });
  
  useEffect(() => {
    if (memberShipDetails && memberShipDetails.clientData) {
      {
        console.log("memberShipDetails", memberShipDetails);
      }
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
      if (memberShipDetails && page < memberShipDetails?.totalPages) {
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
    <div className="membership_card_expiring">
      <div className="membership_card_expiring-title">
        <p>Expiring Soon</p>
        {<p>{count}</p>}
      </div>
      <div
        className={`membership_card_scrollable ${scrollbar} ${
          setClick ? "membership_card_stats_expand_height" : ""
        }`}
        ref={ref}
      >
        {memberShipDetails && pageData &&
          pageData.map((data, index) => (
            <MembershipSubCard
              data={data}
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

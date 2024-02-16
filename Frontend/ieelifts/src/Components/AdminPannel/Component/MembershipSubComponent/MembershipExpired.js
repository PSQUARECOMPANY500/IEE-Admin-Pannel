import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import MembershipSubCard from "./MembershipSubCard";
import { useDispatch, useSelector } from "react-redux";
import { requestLimitedClientDataAction } from "../../../../ReduxSetup/Actions/AdminActions";

const MembershipExpired = ({ setClick, DemoData,count }) => {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const ref = useRef();
  const type = DemoData?.dataType?.toLowerCase();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
  requestLimitedClientDataAction(dispatch, type, "expired", page, 10);
  }, [page, type]);

  const memberShipDetails = useSelector((state) => {
    if (
      state.AdminRootReducer &&
      state.AdminRootReducer.requestLimitedClientDataReducer
    ) {
      return (
        state?.AdminRootReducer?.requestLimitedClientDataReducer
          ?.membershipDetail?.expired?.[type] || {}
      );
    } else {
      return {};
    }
  });

  useEffect(() => {
    if (memberShipDetails && memberShipDetails.clientData) {
      setPageData((prevData) => {
        const newData = memberShipDetails.clientData.filter((data) => 
          !data.isExpired && !prevData.some(prev => prev.JobOrderNumber === data.JobOrderNumber)
        );
        return [...prevData, ...newData];
      });
    }
  }, []);

  const handleInfiniteScroll = async () => {
    try {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      if (page < memberShipDetails?.totalPages) {
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
  },[]);

  return (
    <div className="membership_card_expiring">
      <div className="membership_card_expiring-title membership_card_expired-title">
        <p>Expired</p>
        {memberShipDetails ? <p>{count}</p> : null}
      </div>
      <div
        className={`membership_card_scrollable membership_card_scrollable_expired ${
          setClick ? "membership_card_stats_expand_height" : ""
        }`}
        ref={ref}
      >
        {pageData.map((data, index) => (
          <MembershipSubCard
            data={data}
            isExpired={true}
            key={index}
            dataType={DemoData?.dataType}
          />
        ))}
      </div>
    </div>
  );
};

export default MembershipExpired;

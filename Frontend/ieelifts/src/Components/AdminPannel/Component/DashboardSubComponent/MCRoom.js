import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { useSelector } from "react-redux";

const MCRoom = ({ serviceId }) => {
  const [adminReportData, setAdminReportData] = useState('');
  const [images, setImages] = useState();

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer
  });

  useEffect(() => {
    setImages(AdminReportData?.AdminReportData?.ReportImages[2]?.photo);
    setAdminReportData(AdminReportData?.AdminReportData?.finalReportedData?.MCRoom
    )
  }, [AdminReportData])
  return (
    <div className="McRoom">
      {adminReportData?.IssuesResolved?.length > 0 || adminReportData?.IssuesNotResolved?.length > 0 ||
        adminReportData?.SparePartsChanged?.length > 0 || adminReportData?.SparePartsRequested?.length > 0
        ?
        <div className="CarTopShift">
          <div className="IssueResolved CardShiftCards">
            <div className="IssueResolvedL">
              <h5>Issues Resolved</h5>
              {adminReportData?.IssuesResolved?.map((data, i) =>
                <h6><span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{i + 1}.</span>{data.questionResponse.questionName}</h6>
              )}
            </div>
            <div className="IssueResolvedR">
              <GrGallery style={{ cursor: "pointer" }} />
            </div>
          </div>

          <div className="IssueNotResolved CardShiftCards">
            <div className="IssueNotResolvedL">
              <h5>Issues Not Resolved</h5>
              {adminReportData?.IssuesNotResolved?.map((data, i) =>
                <h6><span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{i + 1}.</span>{data.questionResponse.questionName}</h6>
              )}
            </div>
            <div className="IssueNotResolvedR">
              <GrGallery style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div className="SparePartChange CardShiftCards">
            <h5>Spare Parts Changed</h5>


            {adminReportData?.SparePartsChanged?.map((data, i) =>
              <>
                <div className="SparePartChangeB">
                  <h5><span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{i + 1}.</span>Type <span>{data.questionResponse.sparePartDetail.sparePartsname}</span></h5>
                  <h5>Part <span>{data.questionResponse.sparePartDetail.subsparePartspartname}</span></h5>

                </div>

              </>

            )}

          </div>
          <div className="SparepartReq CardShiftCards">
            <h5>Spare Parts Requested</h5>
            {adminReportData?.SparePartsRequested?.map((data, i) =>
              <>
                <div className="SparepartReqB">
                  <h5><span style={{ fontWeight: '600', marginRight: '0.5rem' }}>{i + 1}.</span>Type <span>{data.questionResponse.sparePartDetail.sparePartsname}</span></h5>
                  <h5>Part <span>{data.questionResponse.sparePartDetail.subsparePartspartname}</span></h5>

                </div>

              </>

            )}
          </div>
          <div className="Amount CardShiftCards">
            <h5>Total Amount</h5>
            <h5>Rs. 12000/-</h5>
          </div>
        </div> :
        <>
          <h5>All areas are working well</h5>
          {images ? <div className={images.length===1?'McRoomCardSingle':'McRoomCard'}>
            {images?.length > 1 ? (
              images.map((e, i) => (
                i < 4 &&  (i===3||i===images.length-1?<div key={i} className='report-img-cards last-card'><p> View More </p></div>:(<div key={i} className='report-img-cards'>
                  <img src='https://ieelifts.com/wp-content/uploads/2023/09/1O3A3827-1-1024x683.jpg' />
                </div>))
              ))
            ) : <div className='single-card'>
                         <img src='https://ieelifts.com/wp-content/uploads/2023/09/1O3A3827-1-1024x683.jpg' />
              </div>}

          </div> : <p>Nothing Is Here</p>}
        </>
      }

    </div>

  );
};

export default MCRoom;

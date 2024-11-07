import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import ReportImageIcon from '../../../../Assets/Images/repotimage.png'
import { ReportCrouserHandler } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";

import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions"




const CartopShift = () => {
  const [adminReportData, setAdminReportData] = useState('')
  const [images, setImages] = useState();
  const [showReportImage, setShowReportImage] = useState(false);
  const [imageUrls, setImageUrls] = useState([]); // State to store fetched image URLs


  const dispatch=useDispatch();

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer
  });
  console.log("pwwww", images);
  useEffect(() => {
    setImages(AdminReportData?.AdminReportData?.ReportImages[2]?.photo);
    setAdminReportData(AdminReportData?.AdminReportData?.finalReportedData?.CartopShaft
    )
  }, [AdminReportData])
  const handleReport = () => {
    dispatch(ReportCrouserHandler(2, true));
  }



  //----------------------------------------------------------------------------------------------
  useEffect(()=>{
    const fetchImageUrl = async (key) => {
      try {
        const response = await getImagesFromS3Bucket(`${images[0]}`);
        setImageUrls(response.data.url);
        return response.data.url;
      } catch (error) {
        console.log("Error while fetching the image from S3 bucket:", error);
        return null; 
      }
    };
     if (images && images.length > 0) {
      fetchImageUrl(); 
    }
  }, [images]);
 
  
  // useEffect(() => {
  //   const getImages = async () => {
  //     const imageKeys = images || [];
  //     const urlPromises = imageKeys.map((imageKey) => fetchImageUrl(imageKey));
      
  //     try {
  //       const urls = await Promise.all(urlPromises);
  //       const validUrls = urls.filter((url) => url !== null); // Filter out any null values
  //       setImageUrls(validUrls); // Set fetched URLs
  //     } catch (error) {
  //       console.error("Error fetching image URLs", error);
  //     }
  //   };
    
  //   if (images && images.length > 0) {
  //     getImages(); // Fetch the image URLs if there are images
  //   }
  // }, [images]);
  
  //----------------------------------------------------------------------------------------------





  return (
    <div className="McRoom">
      {adminReportData?.IssuesResolved?.length > 0 || adminReportData?.IssuesNotResolved?.length > 0 ||
        adminReportData?.SparePartsChanged?.length > 0 || adminReportData?.SparePartsRequested?.length > 0
        ?
        <div className="CarTopShift Yello_Scrollbar">
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
          {/* <div className="Amount CardShiftCards">
            <h5>Total Amount</h5>
            <h5>Rs. 12000/-</h5>
          </div> */}
        </div> :
        <>
          <h5>All areas are working well</h5>
          {images &&
            <div className="McRoomCard" >
              <div className='single-card' onClick={handleReport}>
                <div className="single-card-overlay">
                  <div className="report-icon-container">   <img src={ReportImageIcon} alt='ieelifts report img icon' /></div>
                </div>
                <div className="report-img-count">
                  <p>+{images.length}</p>
                </div>
                <>
                  <img src={imageUrls} />
                </>
              </div>
            </div>}

        </>
      }


    </div>

  );
};

export default CartopShift


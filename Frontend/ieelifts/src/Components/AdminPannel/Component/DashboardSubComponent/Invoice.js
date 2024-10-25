import React, { useEffect, useState } from "react";
import { GrGallery } from "react-icons/gr";
import { BsFiletypePdf } from "react-icons/bs";


import { fetchFinalReportData, getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions";
import { useSelector } from "react-redux";
import config from "../../../../config";



const Invoice = ({ serviceId }) => {
  const [sparePartData, setSparePartData] = useState();
  const [totalAmount, setTotalAmount] = useState();

  const [imageUrls, setImageUrls] = useState({});


  // console.log("[[[[[[[[[[[[[[", sparePartData);

  useEffect(() => {
    const getData = async () => {
      const response = await fetchFinalReportData(serviceId);
      console.log("response", response);
      setTotalAmount(response?.TotalAmount);
      setSparePartData(response?.SparePartsChanged);
    };
    getData();
  }, [serviceId]);

  const AdminReportData = useSelector((state) => {
    return state?.AdminRootReducer?.getAdminReportDataReducer?.AdminReportData
      ?.finalReportedData;
  });


  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const response = await getImagesFromS3Bucket(AdminReportData?.PaymentDetails);
        setImageUrls(response.data.url);
        return response.data.url;
      } catch (error) {
        console.log("Error while fetching the image from S3 bucket:", error);
        return null;
      }
    };
    if (AdminReportData?.PaymentDetails) {
      fetchImageUrl();
    }
  }, [AdminReportData?.PaymentDetails]);


  const openIt = () => {
    // const url = `${config.documentUrl}/ReportPdf/${AdminReportData.PaymentDetails}`;
    // const url = imageUrls;

    window.open(imageUrls, "_blank");
  };

  return (
    <div className="McRoom">
      <div className="Invoice Yello_Scrollbar">
        {sparePartData && <h5>Spare Parts Changed</h5>}
        <div className="InvoiceTable">
          {sparePartData?.map((item) => (
            <div className="InvoiceTableRow">
              <h5>
                1.Type{" "}
                <span>
                  {item?.questionResponse?.sparePartDetail?.sparePartsname}
                </span>
              </h5>
              <h5>
                Part Break{" "}
                <span>
                  {item?.questionResponse?.sparePartDetail?.subsparePartspartname}
                </span>
              </h5>
            </div>
          ))}
        </div>
        {sparePartData && <div className="InvoiceFooter">
          <div className="InvoiceFooterL">
            <div className="InvoiceFooterRow">
              <h5>Payment Mode</h5>
              <h5>{AdminReportData?.PaymentMode}</h5>
            </div>
            <div className="InvoiceFooterRow">
              <h5> Total Payment: </h5>
              <h5> Rs. {totalAmount}/-</h5>
            </div>
          </div>
          <div className="InvoiceFooterR">
            <BsFiletypePdf
              style={{
                fontWeight: '800',
                fontSize: "24px",
                color:
                  AdminReportData?.PaymentDetails.length > 0
                    ? "#f8ac1d"
                    : "#444444",
                cursor: "pointer",
              }}
              onClick={openIt}
            />
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Invoice;

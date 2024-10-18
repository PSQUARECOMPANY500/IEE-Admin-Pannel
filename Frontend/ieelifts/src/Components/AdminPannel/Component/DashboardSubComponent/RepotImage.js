import React, { useEffect, useState } from "react";
import { ReportCrouserHandler } from "../../../../ReduxSetup/Actions/AdminActions";
import { useDispatch, useSelector } from "react-redux";
import config from "../../../../config";

import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions";

const RepotImage = ({ images }) => {

console.log("images carsouls ==============>>>>>>>>> ",images);

// const [imageUrls, setImageUrls] = useState({});
// console.log("this is report images inside the repost data ",imageUrls)

const [imageUrls, setImageUrls] = useState([]); // State to store fetched image URLs



  const [currentIndex, setCurrentIndex] = useState(0);
  const dispatch = useDispatch();

  const ReportUpdate = useSelector((state) => {
    return state?.AdminRootReducer?.ReportCrouserHandlerReducer;
  });

  console.log("ReportUpdate",ReportUpdate);

  const handleClick = (e) => {
    if (e.target.className === "images") {
      dispatch(ReportCrouserHandler(ReportUpdate?.Index, false));
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images?.length - 1 ? images?.length - 1 : prev + 1
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);


  
  //-------------------------------------    logic to get images forme the S3 bucket through API   ---------------------------------------------
  const fetchImageUrl = async (key) => {
    try {
      const response = await getImagesFromS3Bucket(key);
      console.log("Fetched URL from S3:", response.data.url);
      return response.data.url; 
    } catch (error) {
      console.log("Error while fetching the image from S3 bucket:", error);
      return null; 
    }
  };

  useEffect(() => {
    const getImages = async () => {
      const imageKeys = images || [];
      const urlPromises = imageKeys.map((imageKey) => fetchImageUrl(imageKey));

      try {
        const urls = await Promise.all(urlPromises);
        const validUrls = urls.filter((url) => url !== null); 
        setImageUrls(validUrls); 
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    };

    if (images && images.length > 0) {
      getImages(); // Fetch the image URLs if there are images
    }
  }, [images]);

  // //-----------------------------------------------------------------------------------------------------------------

  // const arr=[]


  // images.map((items) => {
  //       arr.push(`${config.documentUrl}/ReportAttachments/${items}`)
  //   })

  // <img src={`${config.documentUrl}/ReportAttachments/${items}`} />    



  return (
    <>
      <div className="images" onClick={handleClick}>
        <div className="report-image-container">
          <div className="report-image-prev">
            <button
              className="learn-previous"
              onClick={goToPrevious}
              style={{ opacity: currentIndex === 0 && "0" }}
            >
              <span className="circleprev" aria-hidden="true">
                <span className="iconprev arrowprev"></span>
                <span className="button-text-prev">PREV</span>
              </span>
            </button>
          </div>
        </div>

        <div className="image-container">      
          <img src={imageUrls[currentIndex]} />   
        </div>


        <div
          className="report-image-next"
          onClick={goToNext}
          style={{ opacity: currentIndex === images?.length - 1 && "0" }}
        >
          <button className="learn-next">
            <span className="circlenext" aria-hidden="true">
              <span className="button-text-next">NEXT</span>
              <span className="icon arrow"></span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default RepotImage;

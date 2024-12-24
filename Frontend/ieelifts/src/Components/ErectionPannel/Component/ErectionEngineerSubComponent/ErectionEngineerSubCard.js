import React, { useState, useEffect } from "react";
import { Engineers } from "../../DummyData/ErectionEngineerData";
import messageIcon from "../../../../Assets/Images/message-square_curved.png";
import { useDispatch, useSelector } from "react-redux";
import { getErectionEnggForErectionPannelAction } from "../.../../../../../ReduxSetup/Actions/ErectionEnggAction";
// import { getImagesFromS3Bucket } from "../../../ReduxSetup/Actions/AdminActions";
import { getImagesFromS3Bucket } from "../../../../ReduxSetup/Actions/AdminActions";

const EngeeniersSubCard = (props) => {
  const dispatch = useDispatch();

  const [singleClickTimeout, setSingleClickTimeout] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const {
    isFirst,
    setIsFirst,
    isSecond,
    setIsSecond,
    handleEnggNameDoubleClick,
  } = props;

  const [ImageUrls, setImageUrls] = useState([]);

  // console.log("this is man --------------------------------->>>>>>> ", ImageUrls)

  const engData = Engineers;

  const handleSingleClick = (index) => {
    if (!isDoubleClick) {
      setIsDoubleClick(false);
      clearTimeout(singleClickTimeout);
      setSingleClickTimeout(null);
    }

    if (isActive === index) {
      setIsActive(null);
      setIsFirst(false);
      setIsSecond(false);
      return;
    }
    setIsDoubleClick(false);
    const timeout = setTimeout(() => {
      setIsFirst(true);
      setSingleClickTimeout(null);
    }, 800);

    setSingleClickTimeout(timeout);
    setIsActive(index);
  };

  const handleDoubleClick = (index, EnggId, EnggName, EnggPhoto) => {
    setIsDoubleClick(true);
    clearTimeout(singleClickTimeout);
    setSingleClickTimeout(null);
    setIsSecond(true);
    handleEnggNameDoubleClick(EnggId, EnggName, EnggPhoto);
    console.log(EnggName);
  };

  useEffect(() => {
    dispatch(getErectionEnggForErectionPannelAction());
  }, [dispatch]);

  const erectionEngg = useSelector(
    (state) =>
      state?.ErectionRootReducer?.getErectionEnggForErectionPannelReducer
        ?.ErectionEnggDetails
  );


  //-------------------- S3 bucket Get Data -----------------------------------------------------------------------------------

  const fetchImageUrl = async (key) => {
    try {
      const response = await getImagesFromS3Bucket(key);
      return response.data.url;
    } catch (error) {
      console.log("Error while fetching the image from S3 bucket:", error);
      return null;
    }
  };



  useEffect(() => {
    const getImages = async () => {
      const engineers = erectionEngg || [];
      const urlPromises = engineers.map((engineer) =>
        fetchImageUrl(engineer.EnggPhoto)
      );

      try {
        const urls = await Promise.all(urlPromises);
        const urlMap = engineers.reduce((acc, engineer, index) => {
          acc[engineer.EnggId] = urls[index];
          return acc;
        }, {});
        setImageUrls(urlMap);
      } catch (error) {
        console.error("Error fetching image URLs", error);
      }
    };

      getImages();
    
  }, [erectionEngg]);


  //----------------------------------------------------------------------------------------------------------------------



  return (
    <div
      className="erectionEngineerParent"
      style={{ cursor: "pointer", display: isSecond && "none" }}
    >
      <div
        className="erectionEngCardContainer"
        style={{ gridTemplateColumns: isFirst && "1fr 1fr" }}
      >
        {erectionEngg &&
          erectionEngg.map((e, index) => (
            <div
              className="erectionEngCards"
              onDoubleClick={() =>
                handleDoubleClick(index, e.EnggId, e.EnggName, e.EnggPhoto)
              }
              onClick={() => handleSingleClick(index)}
              style={{
                boxShadow:
                  isActive === index
                    ? "1px 2px 5px #F8AC1D80"
                    : "2px 4px 10px #00000029",
              }}
            >
              <div className="erectionEngCardsDetails">
                <div className="erectionEngineerPicParent">
                  <img className="erectionEngineerPic "  src={
                      ImageUrls[e.EnggId] ||
                      "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                    } />
                </div>
                <div className="erectionEningeerDetailsContainer">
                  <div className="erectionEngDetail">
                    <span className="erectionEngLabel">NAME</span>
                    <span
                      className="erectionEngValue"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {e.EnggName}
                    </span>
                  </div>
                  <div className="erectionEngDetail">
                    <span className="erectionEngLabel">ID</span>
                    <span className="erectionEngValue">{e.EnggId}</span>
                  </div>
                  <div className="erectionEngDetail">
                    <span className="erectionEngLabel">LEAVES</span>
                    <span className="erectionEngValue">0</span>
                  </div>
                </div>
              </div>
              {e.message !== "" && e.messageCount > 0 && (
                <div
                  className="erectionEngineerMessage"
                  style={{
                    boxShadow:
                      isActive === index && "0 -4px 10px -2px #3893004D",
                  }}
                >
                  <div className="erectionMessageCard">
                    <div className="messsageIconErectionEngineer">
                      <img src={messageIcon} />
                    </div>
                    <div className="messsageErectionEngineer">
                      <p>
                        {e.message.length > 25
                          ? e.message.slice(0, 25) + "..."
                          : e.message}
                      </p>
                    </div>
                  </div>
                  <div
                    className="numberOfMesssageErectionEngineer"
                    style={{
                      backgroundColor: isActive === index && "#3893004D",
                    }}
                  >
                    {e.messageCount}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EngeeniersSubCard;

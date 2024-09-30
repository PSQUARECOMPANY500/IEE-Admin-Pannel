import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { fetchEngDetails } from "../../../../ReduxSetup/Actions/AdminActions";
import config from "../../../../config";
import "../../../../Assets/Engeeniers.css";
const EngeeniersSubCard = (props) => {

  const [singleClickTimeout, setSingleClickTimeout] = useState(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const { isFirst, setIsFirst, isSecond, setIsSecond, handleEnggNameDoubleClick, checkLengthAndDispalyName } = props;
  const [allSearchEngrs, setAllSearchEngrs] = useState(null);
  const [allEngData, setAllEngData] = useState('');
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const engData = useSelector((state) => {
    return state?.AdminRootReducer?.reducerfetchengdetails
  });


  const searchValue = useSelector((state) => {
    return state?.AdminRootReducer?.EngineerSearchHandler?.SearchEngineers
  });

  useEffect(() => {
    dispatch(fetchEngDetails());
  }, [])



  const handleSingleClick = (index) => {
    if (!isDoubleClick) {
      setIsDoubleClick(false);
      clearTimeout(singleClickTimeout);
      setSingleClickTimeout(null);
    }

    setIsDoubleClick(false);
    const timeout = setTimeout(() => {
      if (index === isActive) {
        setIsActive(null);
        setIsFirst(false);
      } else {
        setIsFirst(true);
        setIsActive(index);
        (!isFirst && scrollFun())
      }
      setSingleClickTimeout(null);
    }, 200);

    setSingleClickTimeout(timeout);
    // setIsActive(index);
  }
  const scrollFun = () => {
    if (!scrollRef.current) {
      return
    }
    setTimeout(() => {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, [100])
  }

  const handleDoubleClick = (index, EnggId, EnggName, EnggPhoto, AvailableCash, enggObjectId, lastname, spare) => {
    setIsDoubleClick(true);
    clearTimeout(singleClickTimeout);
    setSingleClickTimeout(null);
    setIsSecond(true);
    handleEnggNameDoubleClick(EnggId, EnggName, EnggPhoto, AvailableCash, enggObjectId, lastname, spare);
  };


  const SerachEngrs = (searchValue) => {
    if (!searchValue) {
      return engData?.engdetails?.combinedData;
    }
    return engData?.engdetails?.combinedData?.filter((value) => {
      return value?.EnggName?.toLowerCase().includes(searchValue?.toLowerCase()) || value?.EnggId?.toLowerCase().includes(searchValue?.toLowerCase());
    })

  }

  useEffect(() => {
    const result = SerachEngrs(searchValue);
    setAllSearchEngrs(result)
  }, [searchValue])


  useEffect(() => {
    if (allSearchEngrs) {
      setAllEngData(allSearchEngrs)
    } else {
      setAllEngData(engData?.engdetails?.combinedData)
    }
  }, [allSearchEngrs, engData])


  return (
    <div className="EngeeniersSubCard" style={{ cursor: "pointer", display: isSecond && 'none' }}>
      <div className="AllCards" style={{ gridTemplateColumns: isFirst && '1fr 1fr' }} >
        {allEngData && allEngData.map((e, index) => (

          <div className="EngCards" onDoubleClick={() => handleDoubleClick(index, e.EnggId, e.EnggName, e.EnggPhoto, e.AvailableCash, e._id, e.EnggLastName, e.Spare)} onClick={() => handleSingleClick(index)} style={{ boxShadow: isActive === index ? '1px 2px 5px #F8AC1D80' : '2px 4px 10px #00000029' }}>
            <div className="EngCardDetails">
              <div className="EngCardDetailsL">
                <img src={
                  e.EnggPhoto?.length === 0 ? "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg" :
                    `${config.documentUrl}/EnggAttachments/${e.EnggPhoto}`} alt={`Image for ID`}
                />

              </div>
              <div className="EngCardDetailsR">
                <div className="table-container">
                  <div className="table-item">NAME</div>
                  <div className="table-item" style={{ whiteSpace: 'nowrap' }}>{checkLengthAndDispalyName(e.EnggName + " " + e.
                    EnggLastName)}</div>
                  <div className="table-item">ID</div>
                  <div className="table-item">{e.EnggId}</div>
                  <div className="table-item">LEAVES</div>
                  <div className="table-item">{e.engLeaveRecord ? e.engLeaveRecord.UsedLeave : 0}</div>
                </div>
              </div>
            </div>
            <div className="EngCardCash">
              <h5>
                Spare Parts: <span>{e.Spare}</span>
              </h5>
              <span className="HoriZontalLine"></span>
              <h5>
                Cash:<span>{e.AvailableCash}</span>
              </h5>
            </div>
            <div className="EngCardMessage"></div>
            {isActive === index && <div className="for-scroll" style={{ position: 'absolute', height: '10px', width: '10px', top: '100%' }} ref={scrollRef}></div>}
          </div>

        ))}
      </div>
    </div>
  );
};

export default EngeeniersSubCard;
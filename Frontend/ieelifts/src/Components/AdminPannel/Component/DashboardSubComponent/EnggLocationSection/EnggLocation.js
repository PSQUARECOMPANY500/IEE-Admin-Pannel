import React, { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { useDispatch, useSelector } from "react-redux";
import { EnggLocationDetailsFetch } from "../../../../../ReduxSetup/Actions/AdminActions";
import { onClickPinCart } from "../../../../../ReduxSetup/Actions/AdminActions";

export default function EnggLocation() {
  const dispatch = useDispatch();
  const mainPosition = { lat: 30.715885973818526, lng: 76.6965589420526 };
  const [navigate , setnavigate] = useState({lat:30.715885973818526 , lng:76.6965589420526})
  const [open, setOpen] = useState("");
  const [mainopen, setMainOpen] = useState(false);
  const [pinClick, setpinClick] = useState(false);
  const [pinindex, setpinIndex] = useState(-1);
  const [enggId, setenggId] = useState("");

  const enggLocationDetails = useSelector((state) => {
    return state.AdminRootReducer?.EnggLocationDetailsFetchReducer
      ?.enggLocatioDetails;
  });

  const enggServiceID = useSelector((state) => {
    return state.AdminRootReducer?.onClickEnggCartEnggLocationReducer
      ?.enggLocation;
  });

useEffect(() => {
  if (enggLocationDetails) {
    enggLocationDetails.forEach((data, index) => {
      if (data.ServiceEnggId === enggServiceID) {
        const lat = parseFloat(data.currentLocation.coordinates[0]);
        const lng = parseFloat(data.currentLocation.coordinates[1]);
        setnavigate({ lat, lng });
      }
    });
  }
}, [enggServiceID, enggLocationDetails]);

  let num = 1
  let color = "#F8AC1D"
  useEffect(() => {
    dispatch(EnggLocationDetailsFetch());
  }, []);


  useEffect(()=>{
    dispatch(onClickPinCart(enggId))
    console.log(enggId)
  },[enggId])

  return (
    <APIProvider apiKey={"AIzaSyDqaTnQklfV5Ek9gmdbAuCk1qNIUyVyDC4"}>
      <div style={{ height: "100%", width: "100%" }}>
        <Map zoom={14} center={navigate} mapId={"4f48b9d7a475bd4d"}>
          <AdvancedMarker
            position={mainPosition}
            onClick={() => setMainOpen(true)}
          >
            <Pin
              background={"#0F351D"}
              glyphColor={"#ffff"}
              borderColor={"#0F351D"}
            />
          </AdvancedMarker>
          {mainopen && (
            <InfoWindow
              position={mainPosition}
              onCloseClick={() => setMainOpen(null)}
            >
              <p>IEE LIFTS</p>
            </InfoWindow>
          )}
          {enggLocationDetails &&
            enggLocationDetails.map((data, index) => {

              const latitude = parseFloat(
                data.currentLocation.coordinates?.[0]
              );
              const longitude = parseFloat(
                data.currentLocation.coordinates?.[1]
              );
              const position = { lat: latitude, lng: longitude };
              const engId = data.ServiceEnggId;
             // const imgurl = data.serviceEnggIdDetails.EnggPhoto;
              if (data.ServiceEnggId === enggServiceID   || pinindex === index) {
                //console.log("data.ServiceEnggId",data.ServiceEnggId)
                num = 1.8
               color = "#F8AC1D"
              } else {
                num = 1
                color = "#F8AC1D"
              }
              const enggId = data.ServiceEnggId;
              return (
                <React.Fragment key={index}>
                  <AdvancedMarker
                    position={position}
                    onClick={() => {
                      setenggId(engId)
                      setpinClick((prev) => !prev)
                      setpinIndex(index)
                    }}>
                    <Pin
                      background={color}
                      borderColor={color}
                      glyphColor={"#ffff"}
                      scale={num}
                    />
                  </AdvancedMarker>
                </React.Fragment>
              );
            })}
        </Map>
      </div>
    </APIProvider>
  );
}
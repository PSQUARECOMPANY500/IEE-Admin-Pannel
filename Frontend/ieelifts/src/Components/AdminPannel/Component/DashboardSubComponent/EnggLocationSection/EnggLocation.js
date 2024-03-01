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

export default function EnggLocation() {
    const dispatch = useDispatch()
    const mainPosition = { lat: 30.715885973818526, lng: 76.6965589420526 };
    const [open, setOpen] = useState(false);
    const [mainopen, setMainOpen] = useState(false);
    const enggLocationDetails = useSelector((state) => {
        return state.AdminRootReducer?.EnggLocationDetailsFetchReducer?.enggLocatioDetails;
    })
    console.log("enggLocationDetails", enggLocationDetails)

    useEffect(() => {
        dispatch(EnggLocationDetailsFetch())
    }, [])

    return (
        <APIProvider apiKey={"AIzaSyDqaTnQklfV5Ek9gmdbAuCk1qNIUyVyDC4"}>
            <div style={{ height: "100%", width: "100%" }}>
                <Map zoom={14} center={mainPosition} mapId={"4f48b9d7a475bd4d"}>
                    <AdvancedMarker position={mainPosition} onClick={() => setMainOpen(true)}>
                        <Pin
                            background={"red"}
                            borderColor={"black"}
                            glyphColor={"black"}
                        />
                    </AdvancedMarker>
                    {mainopen && (
                        <InfoWindow position={mainPosition} onCloseClick={() => setMainOpen(null)}>
                            <p>IEE LIFTS</p>
                        </InfoWindow>
                    )}
                    {enggLocationDetails && enggLocationDetails.map((data, index) => {
                        console.log(data)
                        const latitude = parseFloat(data.currentLocation.coordinates?.[0]);
                        const longitude = parseFloat(data.currentLocation.coordinates?.[1]);
                        const position = { lat: latitude, lng: longitude };
                        const engname = data.serviceEnggIdDetails.EnggName;
                        const imgurl = data.serviceEnggIdDetails.EnggPhoto
                        return (
                            <React.Fragment key={index}>
                                <AdvancedMarker position={position} onClick={() => setOpen(index)}>
                                    <img
                                        style={{
                                            transform: "perspective(40px) rotateX(20deg) rotateZ(-45deg)",
                                            width: "30px",
                                            height: "30px",
                                            position: "relative",
                                            borderRadius: "50% 50% 50% 0"
                                        }}
                                        src={imgurl}
                                        alt="Pin"
                                    />
                                </AdvancedMarker>
                                {open === index && (
                                    <InfoWindow position={position} onCloseClick={() => setOpen(null)}>
                                        <p>{engname}</p>
                                    </InfoWindow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Map>
            </div>
        </APIProvider>
    );
}
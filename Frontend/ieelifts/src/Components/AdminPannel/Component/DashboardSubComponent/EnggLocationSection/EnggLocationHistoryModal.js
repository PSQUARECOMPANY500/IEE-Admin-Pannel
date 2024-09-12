import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EnggLocationDetailsFetch,
  onClickPinCart,
  getEnggLocationCoordinatesAction,
  getEnggCoordinatesForMapModalAction
} from "../../../../../ReduxSetup/Actions/AdminActions";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  xl,
  Polyline,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";

const EnggLocationHistoryModal = ({engID,selectedDate}) => {
  const dispatch = useDispatch();
  const IEELifts = { lat: 30.71424661365234, lng: 76.69621266749 };
  const [center, setCenter] = useState({
    lat: 30.71424661365234,
    lng: 76.69621266749,
  });

  const [mainOpen, setMainOpen] = useState(false);
  const [directions, setDirections] = useState([]);

 useEffect(() => {
  dispatch(getEnggCoordinatesForMapModalAction(engID,selectedDate))
 },[engID,selectedDate]);


 const MapCoordinates = useSelector((state) => state?.AdminRootReducer?.getEnggCoordinatesForMapModalAction?.locationCorrdinates?.coordinates);


 const calculateDirection = async () => {
  if (MapCoordinates && MapCoordinates.length > 1) {
    const directionService = new window.google.maps.DirectionsService();

    // Ensure waypoints are formatted correctly
    const waypoints = MapCoordinates.slice(1, -1).reduce((acc, point, index) => {
      
      if(index % Math.ceil(MapCoordinates.length / 23) === 0 && index !== 0) {
        acc.push({
          location: { lat: point.lat, lng: point.lng },
        });
      }
      return acc;
    },[]);
    
    const request = {
      origin: { lat: MapCoordinates[0].lat, lng: MapCoordinates[0].lng }, // Starting point
      destination: {
        lat: MapCoordinates[MapCoordinates.length - 1].lat,
        lng: MapCoordinates[MapCoordinates.length - 1].lng,
      }, // Ending point
      waypoints: waypoints,
      travelMode: window.google.maps.TravelMode.WALKING,
    };

    try {
      const res = await directionService.route(request);
      console.log("this is response console ", res);
      if (res.status === "OK") {
        setDirections(res);
      } else {
        console.error("Directions request failed due to", res.status);
      }
    } catch (error) {
      console.error("Error fetching directions", error);
    }
  }
};

useEffect(() => {
  calculateDirection();
}, [MapCoordinates]);




  const IEEmarkerSymbol = {
    path: window.google?.maps?.SymbolPath?.BACKWARD_CLOSED_ARROW,
    scale: 10,
    fillColor: "#0F351D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };


  const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
  };
  const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "#8BC34A",
    fillColor: "#8BC34A",
  };
  const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "#FBC02D",
    fillColor: "#FBC02D",
  };
  const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FF5252",
    fillColor: "#FF5252",
  };
  const MorefarOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "#FFA500",
    fillColor: "#FFA500",
  };




  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName="map-container"
      options={{
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        // styles: mapStyles,
      }}
      //   onLoad={(map) => setMap(map)}
    >
      <Marker
        position={IEELifts}
        icon={IEEmarkerSymbol}
        onClick={() => setMainOpen(!mainOpen)}
      />

            <Circle center={IEELifts} radius={15000} options={closeOptions} />
              <Circle center={IEELifts} radius={30000} options={middleOptions} />
              <Circle center={IEELifts} radius={45000} options={farOptions} />
              <Circle center={IEELifts} radius={60000} options={MorefarOptions} />

      {mainOpen && (
        <InfoWindow
          position={IEELifts}
          onCloseClick={() => setMainOpen(!mainOpen)}
        >
          <p>IEE LIFTS</p>
        </InfoWindow>
      )}

{directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#F8AC1D", // Set the polyline color (red in this case)
              strokeOpacity: 0.9,
              strokeWeight: 3,
            },
            suppressMarkers: true, // Removes the default markers
          }}
        />
      )}


    </GoogleMap>
  );
};

export default EnggLocationHistoryModal;

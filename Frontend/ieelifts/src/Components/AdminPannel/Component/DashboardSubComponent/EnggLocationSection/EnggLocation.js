import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EnggLocationDetailsFetch,
  onClickPinCart,
} from "../../../../../ReduxSetup/Actions/AdminActions";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  DirectionsRenderer,
  Polyline 
} from "@react-google-maps/api";
import { onClickEnggCart } from "../../../../../ReduxSetup/Actions/AdminActions";

const EnggLocation = () => {
  const dispatch = useDispatch();
  const enggLocationDetails = useSelector((state) => {
    return state.AdminRootReducer?.EnggLocationDetailsFetchReducer
      ?.enggLocatioDetails;
  });
  const enggServiceID = useSelector(
    (state) =>
      state.AdminRootReducer?.onClickEnggCartEnggLocationReducer?.enggLocation
  );
  console.log("-----------------------", enggServiceID);

  const IEELifts = { lat: 30.715885973818526, lng: 76.6965589420526 };
  const [center, setCenter] = useState({
    lat: 30.715885973818526,
    lng: 76.6965589420526,
  });

  const [mainOpen, setMainOpen] = useState(false);
  const [pinIndex, setPinIndex] = useState(-1);
  const [enggId, setEnggId] = useState("");
  const [state, setState] = useState(0);

  const [directionsResponses, setDirectionsResponses] = useState([]);
  const [distances, setDistances] = useState([]);
  const [durations, setDurations] = useState([]);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$", distances);
  console.log("!!!!!!!!!!!!!!!!!!", durations);


  const locations = [
    {
      origin: "30.714428633668856, 76.69627382349806",
      destination: "30.786394881867572, 76.81068259533569",
    },
    {
      origin: "30.786394881867572, 76.81068259533569",
      destination: "30.699955351116518, 76.86418011009073",
    },
    {
      origin: "30.699955351116518, 76.86418011009073",
      destination: "30.673769256945302, 76.74035592749549",
    },
    // Add more locations as needed
  ];

  //--------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const calculateRoutes = async () => {
      const directionsService = new window.google.maps.DirectionsService();

      const newDirectionsResponses = [];
      const newDistances = [];
      const newDurations = [];

      for (const location of locations) {
        const { origin, destination } = location;
        const results = await directionsService.route({
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        });

        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", results);

        newDirectionsResponses.push(results);
        newDistances.push(results.routes[0].legs[0].distance.text);
        newDurations.push(results.routes[0].legs[0].duration.text);
      }

      setDirectionsResponses(newDirectionsResponses);
      setDistances(newDistances);
      setDurations(newDurations);
    };

    calculateRoutes();
  }, []);



  //------------------------------------------------------------------------------------------------------------------------

  const enggMarkerSymbol = {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: "#0F351D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  const inactiveMarkerSymbol = {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 15,
    fillColor: "#F8AC1D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  const IEEmarkerSymbol = {
    path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 10,
    fillColor: "#0F351D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(EnggLocationDetailsFetch()).catch((error) => {
        console.error("Error fetching data:", error);
      });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000); // 20 seconds in milliseconds
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    if (enggId) {
      dispatch(onClickPinCart(enggId));
    } else {
      if (enggServiceID) {
        // console.log("============enggServiceID", enggServiceID);
        // console.log("============enggId", enggId);
        dispatch(onClickEnggCart(""));
        // setPinIndex(-1);
        // setEnggId(null);
      }
      dispatch(onClickPinCart());
    }
  }, [dispatch, enggId, state]);

  useMemo(() => {
    if (enggLocationDetails) {
      enggLocationDetails.forEach((data) => {
        if (data.ServiceEnggId === enggServiceID) {
          const lat = parseFloat(data.currentLocation.coordinates[0]);
          const lng = parseFloat(data.currentLocation.coordinates[1]);
          setCenter({ lat, lng });
        }
      });
      setPinIndex(-1);
      setEnggId("");
    }
  }, [enggServiceID]);

  // const mapStyles = [
  //   {
  //     featureType: "landscape.man_made",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         color: "#f7f1df",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "landscape.natural",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         color: "#d0e3b4",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "landscape.natural.terrain",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "poi",
  //     elementType: "labels",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "poi.attraction",
  //     elementType: "labels",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "poi.business",
  //     elementType: "all",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "poi.medical",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         color: "#fbd3da",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "poi.park",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         color: "#bde6ab",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "geometry.stroke",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road",
  //     elementType: "labels",
  //     stylers: [
  //       {
  //         visibility: "off",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "geometry.fill",
  //     stylers: [
  //       {
  //         color: "#ffe15f",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.highway",
  //     elementType: "geometry.stroke",
  //     stylers: [
  //       {
  //         color: "#efd151",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.arterial",
  //     elementType: "geometry.fill",
  //     stylers: [
  //       {
  //         color: "#ffffff",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.local",
  //     elementType: "geometry.fill",
  //     stylers: [
  //       {
  //         color: "#ffffff",
  //       },
  //       {
  //         visibility: "on",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "road.local",
  //     elementType: "labels.text",
  //     stylers: [
  //       {
  //         visibility: "on",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "transit.station.airport",
  //     elementType: "geometry.fill",
  //     stylers: [
  //       {
  //         color: "#cfb2db",
  //       },
  //     ],
  //   },
  //   {
  //     featureType: "water",
  //     elementType: "geometry",
  //     stylers: [
  //       {
  //         color: "#a2daf2",
  //       },
  //     ],
  //   },
  // ];

  return (
    <GoogleMap
      zoom={12}
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
    >
      <Marker
        position={IEELifts}
        icon={IEEmarkerSymbol}
        onClick={() => setMainOpen(!mainOpen)}
      />

      {mainOpen && (
        <InfoWindow
          position={IEELifts}
          onCloseClick={() => setMainOpen(!mainOpen)}
        >
          <p>IEE LIFTS</p>
        </InfoWindow>
      )}
      {enggLocationDetails &&
        enggLocationDetails.map((data, index) => {
          const latitude = parseFloat(data.currentLocation.coordinates?.[0]);
          const longitude = parseFloat(data.currentLocation.coordinates?.[1]);
          const position = { lat: latitude, lng: longitude };
          const engId = data.ServiceEnggId;
          const isActive =
            data.ServiceEnggId === enggServiceID || pinIndex === index;
          const markerSymbol = isActive
            ? inactiveMarkerSymbol
            : enggMarkerSymbol;
          const isMarkerActive = pinIndex === index;
          // console.log(pinIndex);
          return (
            <Marker
              key={index}
              position={position}
              icon={markerSymbol}
              onClick={() => {
                if (isMarkerActive && pinIndex >= 0) {
                  setPinIndex(-1);
                  // console.log("Marker is inactive");
                  setEnggId(null);
                  setState(state + 1);
                } else {
                  // console.log("Marker is active");
                  dispatch(onClickEnggCart(""));
                  setEnggId(engId);
                  setPinIndex(index);
                  setState(state + 1);
                }
              }}
            />
          );
        })}

      {directionsResponses.map((response, index) => (
        <DirectionsRenderer key={index} directions={response} 
        options={{
          polylineOptions: {
            strokeColor: "#FF5C5C", // Customize the color of the route
            strokeWeight: 3,
          },
          markerOptions: {
            visible: false, // Hide default route markers
          },
        }}  
        />
      ))}

    </GoogleMap>
  );
};

export default EnggLocation;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  EnggLocationDetailsFetch,
  onClickPinCart,
  getEnggLocationCoordinatesAction,
} from "../../../../../ReduxSetup/Actions/AdminActions";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  xl,
  Polyline,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { onClickEnggCart } from "../../../../../ReduxSetup/Actions/AdminActions";

const EnggLocation = () => {
  const dispatch = useDispatch();

  const enggLocationDetails = useSelector((state) => {
    return state?.AdminRootReducer?.EnggLocationDetailsFetchReducer?.enggLocatioDetails;
  });


  // console.log("set engg valid coordinates",enggLocationDetails && enggLocationDetails[0].currentLocation.coordinates[0].origin.split(","));
  // console.log("set engg valid coordinates",enggLocationDetails && enggLocationDetails[0]?.currentLocation?.coordinates);


  const enggServiceID = useSelector(
    (state) =>
      state.AdminRootReducer?.onClickEnggCartEnggLocationReducer?.enggLocation
  );


  const MapCoordinates = useSelector(
    (state) =>
      state?.AdminRootReducer?.getEnggLocationCoordinatesReducer?.coordinates
        ?.coordinates
  );

  // console.log("this is map coordinaets-----", MapCoordinates);

  const IEELifts = { lat: 30.71424661365234, lng: 76.696212667490 };
  const [center, setCenter] = useState({
    lat: 30.71424661365234,lng: 76.696212667490
  });

  const [mainOpen, setMainOpen] = useState(false);
  const [pinIndex, setPinIndex] = useState(-1);
  const [enggId, setEnggId] = useState("");
  const [state, setState] = useState(0);

  const [map, setMap] = useState(null);
// console.log("this is map console----->>*************************** ", map);


  const [directions, setDirections] = useState();

  // console.log("this is consosle the direction 999999  ", directions);

  const enggMarkerSymbol = {
    path: window.google?.maps?.SymbolPath?.CIRCLE,
    scale: 10,
    fillColor: "#0F351D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  const inactiveMarkerSymbol = {
    path: window.google?.maps?.SymbolPath?.CIRCLE,
    scale: 15,
    fillColor: "#F8AC1D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  const IEEmarkerSymbol = {
    path: window.google?.maps?.SymbolPath?.BACKWARD_CLOSED_ARROW,
    scale: 10,
    fillColor: "#0F351D",
    fillOpacity: 1,
    strokeColor: "white",
    strokeWeight: 2,
  };

  useEffect(() => {
    if (enggServiceID) {
      // console.log("ths id is inside the useEfefct", enggServiceID);
      dispatch(getEnggLocationCoordinatesAction(enggServiceID)); // get the corrdinates from the engg database to path on map
    } else {
      dispatch(getEnggLocationCoordinatesAction()); // get the corrdinates from the engg database to path on map
    }
  }, [dispatch, enggServiceID]);






  const calculateDirection = async () => {
    if (MapCoordinates && MapCoordinates.length > 0) {
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
        origin: { lat: MapCoordinates[0]?.lat, lng: MapCoordinates[0]?.lng }, // Starting point
        destination: {
          lat: MapCoordinates[MapCoordinates.length - 1].lat,
          lng: MapCoordinates[MapCoordinates.length - 1].lng,
        }, // Ending point
        waypoints: waypoints,
        travelMode: window.google.maps.TravelMode.WALKING,
      };

      try {
        const res = await directionService.route(request);
        // console.log("this is response console ", res);
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
        dispatch(onClickEnggCart(""));
        // setPinIndex(-1);
        // setEnggId(null);
      }
      dispatch(onClickPinCart());
    }
  }, [dispatch, enggId, state]);

  useMemo(() => {
  
    if (enggLocationDetails && enggLocationDetails.length > 0) {

      enggLocationDetails.forEach((data) => {
        // console.log("this is my data",data);
        if (data.ServiceEnggId === enggServiceID) {
          // const lat = parseFloat(data.currentLocation.coordinates[0]);
          // const lng = parseFloat(data.currentLocation.coordinates[1]);
          const lat = parseFloat(data?.currentLocation?.coordinates[0]?.origin?.split(",")[0]);
          const lng = parseFloat(data?.currentLocation?.coordinates[0]?.origin?.split(",")[1]);
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


//   const mapStyles = [
//     {
//         "featureType": "administrative",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "simplified"
//             },
//             {
//                 "color": "#c8b671"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.province",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#958456"
//             },
//             {
//                 "saturation": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.locality",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9b8958"
//             },
//             {
//                 "saturation": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "administrative.neighborhood",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9b8958"
//             },
//             {
//                 "saturation": "0"
//             },
//             {
//                 "lightness": "35"
//             }
//         ]
//     },
//     {
//         "featureType": "landscape",
//         "elementType": "geometry",
//         "stylers": [
//             {
//                 "color": "#faf2d6"
//             },
//             {
//                 "lightness": "82"
//             },
//             {
//                 "saturation": "100"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.attraction",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#ff0000"
//             },
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.business",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.government",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.medical",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#b3edaf"
//             },
//             {
//                 "lightness": "20"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.place_of_worship",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.school",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "poi.sports_complex",
//         "elementType": "all",
//         "stylers": [
//             {
//                 "visibility": "off"
//             },
//             {
//                 "color": "#ff0000"
//             }
//         ]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry.stroke",
//         "stylers": [
//             {
//                 "color": "#fbf3ac"
//             },
//             {
//                 "saturation": "-60"
//             },
//             {
//                 "lightness": "-21"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "color": "#f6eebb"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "saturation": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.highway.controlled_access",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9b8958"
//             },
//             {
//                 "saturation": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.fill",
//         "stylers": [
//             {
//                 "color": "#9b8958"
//             },
//             {
//                 "saturation": "0"
//             }
//         ]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "transit",
//         "elementType": "labels.icon",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry.fill",
//         "stylers": [
//             {
//                 "hue": "#00acff"
//             },
//             {
//                 "saturation": "10"
//             },
//             {
//                 "lightness": "32"
//             }
//         ]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels",
//         "stylers": [
//             {
//                 "visibility": "off"
//             }
//         ]
//     }
// ]



         
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
      onLoad={(map) => setMap(map)}
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
      {enggLocationDetails && enggLocationDetails.length > 0 &&
        enggLocationDetails.map((data, index) => {
          const coordinates = data?.currentLocation?.coordinates;

   if(coordinates && coordinates.length>0){


     const latitude = parseFloat(coordinates[coordinates.length - 1]?.origin?.split(",")[0]);
     const longitude = parseFloat(coordinates[coordinates.length - 1]?.origin?.split(",")[1]);

     const position = { lat: latitude, lng: longitude };
     const engId = data.ServiceEnggId;
     const isActive =
       data.ServiceEnggId === enggServiceID || pinIndex === index;
     const markerSymbol = isActive
       ? inactiveMarkerSymbol
       : enggMarkerSymbol;
     const isMarkerActive = pinIndex === index;
     return (
       <Marker
         key={index}
         position={position}
         icon={markerSymbol}
         onClick={() => {
           if (isMarkerActive && pinIndex >= 0) {
             setPinIndex(-1);
             setEnggId(null);
             setState(state + 1);
           } else {
             dispatch(onClickEnggCart(""));
             setEnggId(engId);
             setPinIndex(index);
             setState(state + 1);
           }
         }}
       />
     );
    }
  })}

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

export default EnggLocation;

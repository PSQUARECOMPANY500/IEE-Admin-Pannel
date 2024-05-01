// import React, { useState, useEffect, useMemo } from "react";
// import {
//   APIProvider,
//   Map,
//   Marker,
//   AdvancedMarker,
//   Pin,
//   InfoWindow,
// } from "@vis.gl/react-google-maps";
// import { useDispatch, useSelector } from "react-redux";
// import { EnggLocationDetailsFetch } from "../../../../../ReduxSetup/Actions/AdminActions";
// import { onClickPinCart } from "../../../../../ReduxSetup/Actions/AdminActions";

// export default function EnggLocation() {
//   const dispatch = useDispatch();
//   const mainPosition = { lat: 30.715885973818526, lng: 76.6965589420526 };
//   const [navigate , setnavigate] = useState({lat:30.715885973818526 , lng:76.6965589420526})
//   const [open, setOpen] = useState("");
//   const [mainopen, setMainOpen] = useState(false);
//   const [pinClick, setpinClick] = useState(false);
//   const [pinindex, setpinIndex] = useState(-1);
//   const [enggId, setenggId] = useState("");

//   const enggLocationDetails = useSelector((state) => {
//     return state.AdminRootReducer?.EnggLocationDetailsFetchReducer
//       ?.enggLocatioDetails;
//   });

//   const enggServiceID = useSelector((state) => {
//     return state.AdminRootReducer?.onClickEnggCartEnggLocationReducer
//       ?.enggLocation;
//   });

// useEffect(() => {
//   if (enggLocationDetails) {
//     enggLocationDetails.forEach((data, index) => {
//       if (data.ServiceEnggId === enggServiceID) {
//         const lat = parseFloat(data.currentLocation.coordinates[0]);
//         const lng = parseFloat(data.currentLocation.coordinates[1]);
//         setnavigate({ lat, lng });
//       }
//     });
//   }
// }, [enggServiceID, enggLocationDetails]);

//   let num = 1
//   let color = "#F8AC1D"
//   useEffect(() => {
//     dispatch(EnggLocationDetailsFetch());
//   }, []);


//   useEffect(()=>{
//     dispatch(onClickPinCart(enggId))
//     console.log(enggId)
//   },[enggId])


//   return (
//     <APIProvider apiKey={"AIzaSyDqaTnQklfV5Ek9gmdbAuCk1qNIUyVyDC4"}>
//       <div style={{ height: "100%", width: "100%" }}>
//         <Map zoom={14} center={navigate}  mapId={"4f48b9d7a475bd4d"}>
//           <AdvancedMarker
//             position={mainPosition}
//             onClick={() => setMainOpen(true)}
//           >
//             <Pin
//               background={"#0F351D"}
//               glyphColor={"#ffff"}
//               borderColor={"#0F351D"}
//             />
//           </AdvancedMarker>
//           {mainopen && (
//             <InfoWindow
//               position={mainPosition}
//               onCloseClick={() => setMainOpen(null)}
//             >
//               <p>IEE LIFTS</p>
//             </InfoWindow>
//           )}
//           {enggLocationDetails &&
//             enggLocationDetails.map((data, index) => {

//               const latitude = parseFloat(
//                 data.currentLocation.coordinates?.[0]
//               );
//               const longitude = parseFloat(
//                 data.currentLocation.coordinates?.[1]
//               );
//               const position = { lat: latitude, lng: longitude };
//               const engId = data.ServiceEnggId;
//             //  const imgurl = data.serviceEnggIdDetails.EnggPhoto;
//               if (data.ServiceEnggId === enggServiceID   || pinindex === index) {
//                 //console.log("data.ServiceEnggId",data.ServiceEnggId)
//                 num = 1.8
//                color = "#F8AC1D"
//               } else {
//                 num = 1
//                 color = "#F8AC1D"
//               }
//               const enggId = data.ServiceEnggId;
//               return (
//                 <React.Fragment key={index}>
//                   <AdvancedMarker
//                     position={position}
//                     onClick={() => {
//                       setenggId(engId)
//                       setpinClick((prev) => !prev)
//                       setpinIndex(index)
//                     }}>
//                     <Pin
//                       background={color}
//                       borderColor={color}
//                       glyphColor={"#ffff"}
//                       scale={num}
//                     />
//                   </AdvancedMarker>
//                 </React.Fragment>
//               );
//             })}
//         </Map>
//       </div>
//     </APIProvider>
//   );
// }


/* 
possible exports: Autocomplete, BicyclingLayer, 
BicyclingLayerF, Circle, CircleF, Data, DataF, 
DirectionsRenderer, DirectionsService, 
DistanceMatrixService, DrawingManager, 
DrawingManagerF, FLOAT_PANE, GoogleMap, 
GoogleMapsMarkerClusterer, GoogleMarkerClusterer,
GroundOverlay, GroundOverlayF, HeatmapLayer, 
HeatmapLayerF, InfoBox, InfoBoxF, InfoWindow,
InfoWindowF, KmlLayer, LoadScript, LoadScriptNext,
MAP_PANE, MARKER_LAYER, MapContext, 
Marker, MarkerClusterer, MarkerClustererF, 
MarkerF, OVERLAY_LAYER, OVERLAY_MOUSE_TARGET, 
OverlayView, OverlayViewF, Polygon, PolygonF,
Polyline, PolylineF, Rectangle, RectangleF,
StandaloneSearchBox, StreetViewPanorama, 
StreetViewService, TrafficLayer, TrafficLayerF, 
TransitLayer, TransitLayerF, useGoogleMap,
useJsApiLoader, useLoadScript
*/

// to-do : Next Update in Future (2nd Update)
/* 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EnggLocationDetailsFetch, onClickPinCart } from "../../../../../ReduxSetup/Actions/AdminActions";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const EnggLocation = () => {
  const dispatch = useDispatch();
  const enggLocationDetails = useSelector(state => state.AdminRootReducer?.EnggLocationDetailsFetchReducer?.enggLocatioDetails);
  const enggServiceID = useSelector(state => state.AdminRootReducer?.onClickEnggCartEnggLocationReducer?.enggLocation);
console.log("enggLocationDetails",enggLocationDetails)
console.log("enggServiceID",enggServiceID)
  const [center, setCenter] = useState({ lat: 30.715885973818526, lng: 76.6965589420526 });
  const [mainopen, setMainOpen] = useState(false);
  const [pinClick, setPinClick] = useState(false);
  const [pinindex, setPinIndex] = useState(-1);
  const [enggId, setEnggId] = useState("");
  
  const markerSymbol = {
    path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 10,
    fillColor: '#0F351D',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  };

  const [enggmarkerSymbol, setenggMarkerSymbol] = useState({
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: '#0F351D',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  });
  
  useEffect(() => {
    dispatch(EnggLocationDetailsFetch());
  }, []);

  useEffect(() => {
    dispatch(onClickPinCart(enggId));
  }, [enggId]);

  useEffect(() => {
    if (enggLocationDetails) {
      enggLocationDetails.forEach((data, index) => {
        if (data.ServiceEnggId === enggServiceID) {
          const lat = parseFloat(data.currentLocation.coordinates[0]);
          const lng = parseFloat(data.currentLocation.coordinates[1]);
          setCenter({ lat, lng });
        }
      });
    }
  }, [enggServiceID, enggLocationDetails]);

  const handleDoubleClick = () => {
    setenggMarkerSymbol(prevSymbol => ({
      ...prevSymbol,
      fillColor: '#F8AC1D',
      scale: 12,
    }));
  };


  return (
    <>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName="map-container"
        options={{
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: true,
        }}
      >
        <Marker
          position={{ lat: 30.715885973818526, lng: 76.6965589420526 }}
          icon={markerSymbol}
          onClick={() => setMainOpen(!mainopen)}
        />
         
        {mainopen && (
          <InfoWindow
            position={{ lat: 30.715885973818526, lng: 76.6965589420526 }}
            onCloseClick={() => setMainOpen(!mainopen)}
          >
            <p>IEE LIFTS</p>
          </InfoWindow>
        )}
        {enggLocationDetails &&
          enggLocationDetails.map((data, index) => {
/*             const latitude = parseFloat(data.currentLocation.coordinates?.[0]);
            const longitude = parseFloat(data.currentLocation.coordinates?.[1]);
            const position = { lat: latitude, lng: longitude };
            const engId = data.ServiceEnggId;
            let num = data.ServiceEnggId === enggServiceID || pinindex === index ? 1.8 : 1;
            let color = data.ServiceEnggId === enggServiceID || pinindex === index ? "#F8AC1D" : "#F8AC1D"; 
            
              const latitude = parseFloat(
                data.currentLocation.coordinates?.[0]
              );
              const longitude = parseFloat(
                data.currentLocation.coordinates?.[1]
              );
              const position = { lat: latitude, lng: longitude };
              const engId = data.ServiceEnggId;
              //const imgurl = data.serviceEnggIdDetails.EnggPhoto;
              if (data.ServiceEnggId === enggServiceID   || pinindex === index) {
                //console.log("data.ServiceEnggId",data.ServiceEnggId)
                setenggMarkerSymbol(prevSymbol => ({
                  ...prevSymbol,
                  fillColor: '#F8AC1D',
                  scale: 12,
                }));
              }
              const enggId = data.ServiceEnggId;

            return (
              <Marker
                key={index}
                position={position}
                icon={enggmarkerSymbol}
                onClick={() => {
                  setEnggId(engId);
                  setPinClick(prev => !prev);
                  setPinIndex(index);
                }}
              >
              </Marker>
            );
          })}
      </GoogleMap>
    </>
  );
}

export default EnggLocation;
 */


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnggLocationDetailsFetch, onClickPinCart } from '../../../../../ReduxSetup/Actions/AdminActions';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';

const EnggLocation = () => {
  const dispatch = useDispatch();
  const enggLocationDetails = useSelector((state) => {
        return state.AdminRootReducer?.EnggLocationDetailsFetchReducer
          ?.enggLocatioDetails;
      });
  const enggServiceID = useSelector(state => state.AdminRootReducer?.onClickEnggCartEnggLocationReducer?.enggLocation);
  const IEELifts = { lat: 30.715885973818526, lng: 76.6965589420526 }
  const [center, setCenter] = useState({ lat: 30.715885973818526, lng: 76.6965589420526 });
  const [mainOpen, setMainOpen] = useState(false);
  const [pinClick, setPinClick] = useState(false);
  const [pinIndex, setPinIndex] = useState(-1);
  const [enggId, setEnggId] = useState('');
  const [enggMarkerSymbol, setEnggMarkerSymbol] = useState({
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 10,
    fillColor: '#0F351D',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  });

  const inactiveMarkerSymbol = {
    path: window.google.maps.SymbolPath.CIRCLE,
    scale: 15,
    fillColor: '#F8AC1D',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  };

  const IEEmarkerSymbol = {
    path: window.google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
    scale: 10,
    fillColor: '#0F351D',
    fillOpacity: 1,
    strokeColor: 'white',
    strokeWeight: 2,
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(EnggLocationDetailsFetch())
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000); // 20 seconds in milliseconds
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    dispatch(onClickPinCart(enggId));
  }, [dispatch, enggId]);

  useEffect(() => {
    if (enggLocationDetails) {
      enggLocationDetails.forEach(data => {
        if (data.ServiceEnggId === enggServiceID) {
          const lat = parseFloat(data.currentLocation.coordinates[0]);
          const lng = parseFloat(data.currentLocation.coordinates[1]);
          setCenter({ lat, lng });
        }
      });
    }
  }, [enggLocationDetails, enggServiceID]);

  const handleDoubleClick = () => {
    setEnggMarkerSymbol(prevSymbol => ({
      ...prevSymbol,
      fillColor: '#F8AC1D',
      scale: 12,
    }));
  };

  const mapStyles = [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbd3da"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bde6ab"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
]
  return (
    <GoogleMap
      zoom={11}
      center={center}
      mapContainerClassName="map-container"
      options={{
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true,
        styles:mapStyles
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

      {enggLocationDetails && enggLocationDetails.map((data, index) => {
        const latitude = parseFloat(data.currentLocation.coordinates?.[0]);
        const longitude = parseFloat(data.currentLocation.coordinates?.[1]);
        const position = { lat: latitude, lng: longitude };
        const engId = data.ServiceEnggId;
        const isActive = data.ServiceEnggId === enggServiceID || pinIndex === index;
        const markerSymbol = isActive ? inactiveMarkerSymbol :enggMarkerSymbol;
        //console.log("id",enggServiceID ,isActive, markerSymbol)
        return (
          <Marker
            key={index}
            position={position}
            icon={markerSymbol}
            onClick={() => {
              setEnggId(engId);
              setPinClick(prev => !prev);
              setPinIndex(index);
            }}
          />
        );
      })}
    </GoogleMap>
  );
}

export default EnggLocation;

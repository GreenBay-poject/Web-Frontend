import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import InputFile from '../LandReport/inputfile';

const containerStyle = {
  width: "100%",
  height: '1000px'
};

const center = {
  lat: 7.2842,
  lng: 80.6372
};

export default function MyComponent(props) {
  const { setDates, latitude, setLatitude, longitude, setLongitude } =props

  const FillPosition = (event) => {
    setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
  };

  return (
    <React.Fragment>
        <InputFile latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setDates={setDates}/>
        <LoadScript
          googleMapsApiKey="AIzaSyCwavv_YteGgPYgmxVoRnOOrsm8g8t7WjU"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            <Marker
                title={"move to select the position you wanted"}
                draggable={true}
                position={{"lat": 7.2842, "lng": 80.6372}}
                onDrag={(e) => FillPosition(e)}
            />
          </GoogleMap>
        </LoadScript>
    </React.Fragment>
  )
}

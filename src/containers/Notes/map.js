import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import InputFile from '../Notes/inputs';

const containerStyle = {
  width: "100%",
  height: '1000px'
};

const center = {
  lat: 7.2842,
  lng: 80.6372
};

export default function MyComponent(props) {
  const { publicNotes, privateNotes } = props;
  const [latitude, setLatitude] = useState(7.2842);
  const [longitude, setLongitude] = useState(80.6372);
  console.log(privateNotes)
  const FillPosition = (event) => {
    setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
  };

  return (
    <React.Fragment>
        <InputFile latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude}/>
        <LoadScript
          googleMapsApiKey="AIzaSyCwavv_YteGgPYgmxVoRnOOrsm8g8t7WjU"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
            {publicNotes ? 
                publicNotes.map((author) => 
                  author.notes.map((note) => 
                    <Marker
                        position={{"lat": note.lat, "lng": note.lon}}
                        title={note.text}
                    />
                  )
                )
                : null
            }
            {/* {privateNotes ? 
                privateNotes.map((note) => 
                    <Marker
                        fillColor= {"yellow"}
                        position={{"lat": note.lat, "lng": note.lon}}
                        title={note.text}
                    />
                  )
                : null
            } */}
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

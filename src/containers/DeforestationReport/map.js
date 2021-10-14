import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import InputFile from '../DeforestationReport/inputfile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const containerStyle = {
  width: "100%",
  height: '300px'
};

const center = {
  lat: 7.2842,
  lng: 80.6372
};

export default function MyComponent(props) {
  const classes = useStyles();
  const { setDates, latitude, setLatitude, longitude, setLongitude } =props

  const FillPosition = (event) => {
    setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <InputFile latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setDates={setDates}/>
        </Grid>
        <Grid item xs={12} sm={8}>
          <LoadScript
              googleMapsApiKey="AIzaSyCwavv_YteGgPYgmxVoRnOOrsm8g8t7WjU"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              <Marker
                  title={"move to select the position you wanted"}
                  draggable={true}
                  position={{"lat": 7.2842, "lng": 80.6372}}
                  onDrag={(e) => FillPosition(e)}
              />
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </div>
  )
}

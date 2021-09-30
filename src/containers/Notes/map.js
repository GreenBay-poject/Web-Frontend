import React, { useState } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Marker } from '@react-google-maps/api';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { toast } from 'react-toastify';

import InputFile from '../Notes/inputs';
import { addAlert } from '../../store/actions/index';
import { deleteNote } from "../../api/notes";
import PublicNotes from "../Notes/noteslist";
import PrivateNotes from "../Notes/privatenotes";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
    flexDirection: 'Column',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


const containerStyle = {
  width: "95%",
  height: '99%'
};

const center = {
  lat: 7.2842,
  lng: 80.6372
};

function MyComponent(props) {
  const classes = useStyles();
  const { publicNotes, privateNotes, email, setPrivateNotes, setPublicNotes } = props;
  const [latitude, setLatitude] = useState(7.2842);
  const [longitude, setLongitude] = useState(80.6372);
  const FillPosition = (event) => {
    setLatitude(event.latLng.lat())
    setLongitude(event.latLng.lng())
  };

  const DeleteNote = (note) => {
    alert("Do you want to delete "+ String(note) +" note")
    deleteNote({email:email,note_id:note})
        .then((response) => {
          console.log(response)
          if (!response.error) {
            toast.success('Successfully Deleted!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error('Error on loading Private Notes!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          }
        })
  };

  console.log(alert)

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <LoadScript
            googleMapsApiKey="AIzaSyCwavv_YteGgPYgmxVoRnOOrsm8g8t7WjU"
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={8}
            >
              {publicNotes ? 
                  publicNotes.map((author) => 
                    author.notes.map((note) => 
                      <Marker
                          position={{"lat": note.lat, "lng": note.lon}}
                          title={note.text}
                          icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"}
                          onDblClick={(e) => DeleteNote(note.note_id)}
                      />
                    )
                  )
                  : null
              }
              {privateNotes ? 
                  privateNotes.map((note) => 
                      <Marker
                          fillColor= {"yellow"}
                          position={{"lat": note.lat, "lng": note.lon}}
                          title={note.text}
                          onDblClick={(e) => DeleteNote(note.note_id)}
                      />
                    )
                  : null
              }
              <Marker
                  title={"move to select the position you wanted"}
                  draggable={true}
                  position={{"lat": 7.2842, "lng": 80.6372}}
                  onDrag={(e) => FillPosition(e)}
              />
            </GoogleMap>
          </LoadScript>
        </Grid>
        <Grid item xs={12} sm={4}>
          <InputFile latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setPrivateNotes={setPrivateNotes} setPublicNotes={setPublicNotes}/>
        </Grid>
        { privateNotes && (privateNotes.length)>0 ? 
          <Grid item xs={12} sm={12}>
              <Typography>Public Notes</Typography>
              <PrivateNotes privateNotes={privateNotes} />
          </Grid> : null
        }
        { publicNotes && (publicNotes.length)>0 ? 
          <Grid item xs={12} sm={12}>
              <Typography>Public Notes</Typography>
              <PublicNotes publicNotes={publicNotes} />
          </Grid> : null
        }
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      isAuthenticated: state.auth.token != null,
      error: state.auth.error,
      email: state.auth.email,
      alert: state.alert
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      addAlert: (alert) => dispatch(addAlert(alert))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent);

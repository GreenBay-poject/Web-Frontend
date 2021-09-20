import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getPublicNotes, getPrivateNotes } from "../../api/notes";
import { addAlert } from '../../store/actions/index';
import Map from "../Notes/map";

function NotesPage(props) {
  const { email } = props;
  const [publicNotes, setPublicNotes] = useState([]);
  const [privateNotes, setPrivateNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading ) {
        getPublicNotes({email:email})
        .then((response) => {
          if (!response.error) {
            setPublicNotes(response.data.ALL_NOTES)
          } else {
              addAlert("Error on loading Public Notes")
          }
        })

        getPrivateNotes({email:email})
        .then((response) => {
          console.log(response)
          if (!response.error) {
            setPrivateNotes(response.data.All_Notes_user)
          } else {
              addAlert("Error on loading Private Notes")
          }
        })
        .finally(() => setIsLoading(false));
    }
}, [isLoading, email]);

return (
    <React.Fragment>
        <Map publicNotes={publicNotes} privateNotes={privateNotes}/>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token != null,
        error: state.auth.error,
        email: state.auth.email
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        addAlert: (alert) => dispatch(addAlert(alert))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);

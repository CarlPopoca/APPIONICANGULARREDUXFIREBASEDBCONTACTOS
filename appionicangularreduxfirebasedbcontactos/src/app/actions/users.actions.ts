import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { NgRedux } from '@angular-redux/store';
import {  } from '../shared/utils/constants';
import * as firebase from "firebase/app";
import {MESSAGE_ERROR_SIGNUP, MESSAGE_ERROR_SIGNIN, MESSAGE_ERROR_SIGNOUT} from '../shared/utils/constants';

@Injectable() 
export class UsersActions {
  static SIGNIN = 'SIGNIN';
  static SIGNOUT = 'SIGNOUT';
  static ERROR_SIGNIN = 'ERROR_SIGNIN';
  static ERROR_SIGNOUT = 'ERROR_SIGNOUT';
  static SIGNUP = 'SIGNUP';
  static ERROR_SIGNUP = 'ERROR_SIGNUP';

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  signIn (credentials)
  {
    firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => {
      this.ngRedux.dispatch({
        type: UsersActions.SIGNIN,
        payload: {
          data
        }
    }); 
    })
    .catch(error => {
      var vError = MESSAGE_ERROR_SIGNIN+ error;
      this.ngRedux.dispatch({
          type: UsersActions.ERROR_SIGNIN,
          payload: {
              vError
          }
      });
    });
  }

  signOut (){
    firebase
    .auth()
    .signOut()
    .then(data => {

      this.ngRedux.dispatch({
        type: UsersActions.SIGNOUT,
        payload: {
          data
        }
      });
    })
    .catch(error => {
      var vError = MESSAGE_ERROR_SIGNOUT + error;
      this.ngRedux.dispatch({
          type: UsersActions.ERROR_SIGNOUT,
          payload: {
              vError
          }
      });
    });
  }
  
  signUp (newUser){

    firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(response => {
      var db = firebase.firestore();
      db
      .collection("users")
      .doc(response.user.uid)
      .set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        })
      .then(() => {
        var usuario = {
            id : response.user.uid,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
        this.ngRedux.dispatch({
          type: UsersActions.SIGNUP,
          payload: {
            usuario
          }
        });
      })
      .catch(error => {
        var vError = MESSAGE_ERROR_SIGNUP+ error;
        this.ngRedux.dispatch({
          type: UsersActions.ERROR_SIGNUP,
          payload: {
            vError
          }
        });
      });
    })
    .catch(error => {
      var vError = MESSAGE_ERROR_SIGNUP+ error;
      this.ngRedux.dispatch({
        type: UsersActions.ERROR_SIGNUP,
        payload: {
          vError
        }
      });
    });
      
  }
}

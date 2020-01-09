import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { NgRedux } from '@angular-redux/store';
import { User } from '../shared/model/user';
import {  } from '../shared/utils/constants';
import * as firebase from "firebase/app";
import {MESSAGE_ERROR_SAVE, MESSAGE_ERROR_LOGIN, MESSAGE_ERROR_LOGOUT} from '../shared/utils/constants';

@Injectable() 
export class UsersActions {
  static LOGIN_USER = 'LOGIN_USER';
  static LOGOUT_USER = 'LOGOUT_USER';
  static ERROR_LOGIN = 'ERROR_LOGIN';
  static ERROR_LOGOUT = 'ERROR_LOGOUT';
  static ADD_USER = 'ADD_USER';
  static ERROR_USER = 'ERROR_USER';

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  login(credentials)
  {
    firebase
    .auth()
    .signInWithEmailAndPassword(credentials.email, credentials.password)
    .then(data => {
      this.ngRedux.dispatch({
        type: UsersActions.LOGIN_USER,
        payload: {
          data
        }
    }); 
    })
    .catch(error => {
      var vError = MESSAGE_ERROR_LOGIN + error;
      this.ngRedux.dispatch({
          type: UsersActions.ERROR_LOGIN,
          payload: {
              vError
          }
      });
    });
  }

  logout(){
    firebase
    .auth()
    .signOut()
    .then(data => {

      this.ngRedux.dispatch({
        type: UsersActions.LOGOUT_USER,
        payload: {
          data
        }
      });
    })
    .catch(error => {
      var vError = MESSAGE_ERROR_LOGOUT + error;
      this.ngRedux.dispatch({
          type: UsersActions.ERROR_LOGOUT,
          payload: {
              vError
          }
      });
    });
  }
  
  addUser(newUser){

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
          type: UsersActions.ADD_USER,
          payload: {
            usuario
          }
        });
      })
      .catch(error => {
        this.ngRedux.dispatch({
          type: UsersActions.ERROR_USER,
          payload: {
            error
          }
        });
      });
    })
    .catch(error => {
      this.ngRedux.dispatch({
        type: UsersActions.ERROR_USER,
        payload: {
          error
        }
      });
    });
      
  }
}

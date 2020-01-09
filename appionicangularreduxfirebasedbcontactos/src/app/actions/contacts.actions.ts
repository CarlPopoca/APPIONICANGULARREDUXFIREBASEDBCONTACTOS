import { Injectable } from '@angular/core';
import { IAppState } from '../app.state';
import { NgRedux } from '@angular-redux/store';
import { Contacts } from '../shared/model/contact';
import * as firebase from "firebase/app";
import { MESSAGE_ERROR_GET_INFO, MESSAGE_ERROR_SAVE, MESSAGE_ERROR_UPDATE, MESSAGE_ERROR_DELETE } from '../shared/utils/constants';
//import { Http } from '@angular/http';

@Injectable()
export class ContactsActions{
    static  GET_CONTACTS = 'GET_CONTACTS';
    static  ADD_CONTACTS = 'ADD_CONTACTS';
    static  UPDATE_CONTACTS = 'UPDATE_CONTACTS';
    static  DELETE_CONTACTS = 'DELETE_CONTACTS';
    static  ERROR_CONTACTS = 'ERROR_CONTACTS';

    constructor(private ngRedux: NgRedux<IAppState>){
      
    }

    getContacts()
    {
        var db = firebase.firestore();
        db
        .collection("contactos")
        .get()
        .then(snapshot => {
            this.ngRedux.dispatch({
                type: ContactsActions.GET_CONTACTS,
                payload: {
                    snapshot
                }
            });    
        })
        .catch(error => {
            var vError = MESSAGE_ERROR_GET_INFO + error;
            this.ngRedux.dispatch({
                type:ContactsActions.ERROR_CONTACTS,
                payload: {
                    vError
                }
            });
        });
    }

    saveContacts(data)
    {
        var db = firebase.firestore();
        db
        .collection("contactos")
        .add({
            nombre: data.nombre,
            celular: data.celular,
            sexo: data.sexo
        })
        .then(response => {
            var dato = {
                id : response.id,
                nombre: data.nombre,
                celular: data.celular,
                sexo: data.sexo
            }
            this.ngRedux.dispatch({
                type: ContactsActions.ADD_CONTACTS,
                payload: {
                    dato
                }
            }); 
        })
        .catch(error => {
            var vError = MESSAGE_ERROR_SAVE + error;
            this.ngRedux.dispatch({
                type:ContactsActions.ERROR_CONTACTS,
                payload: {
                    vError
                }
            });
        });
    }

    updateContacts(data)
    {
        var db = firebase.firestore();
        db
        .collection("contactos")
        .doc(data.id)
        .update(data)
        .then(() => {
            this.ngRedux.dispatch({
                type: ContactsActions.UPDATE_CONTACTS,
                payload: {
                    data
                }
            }); 
        })
        .catch(error => {
            var vError = MESSAGE_ERROR_UPDATE + error;
            this.ngRedux.dispatch({
                type:ContactsActions.ERROR_CONTACTS,
                payload: {
                    vError
                }
            });
        });
    }

    deleteContacts(id)
    {
        var db = firebase.firestore();
        db
        .collection("contactos")
        .doc(id)
        .delete()
        .then(()=>{
            this.ngRedux.dispatch({
                type: ContactsActions.DELETE_CONTACTS,
                payload: {
                    id
                }
            }); 
        })
        .catch(error => {
            var vError = MESSAGE_ERROR_DELETE + error;
            this.ngRedux.dispatch({
                type:ContactsActions.ERROR_CONTACTS,
                payload: {
                    vError
                }
            });
        });
    }
}
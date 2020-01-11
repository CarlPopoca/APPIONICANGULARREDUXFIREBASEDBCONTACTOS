import { ContactsActions } from '../actions/contacts.actions';
import { Contacts } from '../shared/model/contact'

const initState : Contacts  = {
    contacts: [],
    error: null
  };

 export const ContactsReducer = (state = initState, action : any) : any =>{
    const array = [];  
    switch(action.type){
        case ContactsActions.GET_CONTACTS:
           // Se obtienen los contactos para llenar un arreglo
           const contactData = action.contacts;
           contactData.forEach(cont => {
             array.push({
               id: cont.id,
               nombre: cont.data().nombre,
               celular: cont.data().celular,
               sexo: cont.data().sexo
             });
           });
          //Se ordenan ascendentemente por nombre
           array.sort(function (a, b) {
            if (a.nombre > b.nombre) {
              return 1;
            }
            if (a.nombre < b.nombre) {
              return -1;
            }
            return 0;
          });

           return {
            ...state,
            contacts: array
           }
           
        case ContactsActions.ADD_CONTACTS:
           //Se añaden todos los contactos almacenados en el estado
              state.contacts.forEach(cont => {
                array.push({
                  id: cont.id,
                  nombre: cont.nombre,
                  celular: cont.celular,
                  sexo: cont.sexo
                });
              });
            // Se añade el nuevo contacto devuelto por el action saveContactos
              array.push({ 
                id: action.contact.id,
                nombre: action.contact.nombre,
                celular: action.contact.celular,
                sexo: action.contact.sexo});  
            //Se ordenan de forma ascendente por el nombre
              array.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                  return 1;
                }
                if (a.nombre < b.nombre) {
                  return -1;
                }
                //Si retorna cero es que son iguales y va primero el valor de a
                return 0;
              });

            return {
                ...state,
                contacts: array
            }
        case ContactsActions.UPDATE_CONTACTS:
          //Toma los registros del estado y luego busca el que se actualizo por el id para actualizar
          // el estado
           var listContact = state.contacts.map(item => {
                if (item.id === action.contacto.id) 
                {
                 return action.contact;
                }
                return item;
            });
            //Se retorna la lista de contactos actualizada y sera tomada por props en el Contactos.js por medio 
            // apStateToProps
            return {
              ...state,
              contacts: listContact
            }
            
        case ContactsActions.DELETE_CONTACTS:
            //Filtra el estado quitando el contacto que fue eliminado
            return {
              ...state,
              contacts: state.contacts.filter(item => item.id != action.id)
            }
            
        case ContactsActions.ERROR_CONTACTS:
          //Devuelve el mensaje de error en la vista
            return {
                ...state,
                error: action.error
            };      

        default: return state;
    }
}
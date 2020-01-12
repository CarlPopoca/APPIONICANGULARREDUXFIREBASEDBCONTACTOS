import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { ContactsComponent } from './components/contacts/contacts.component';
import { LogoutComponent } from './components/security/logout/logout.component';
import { LoginComponent } from './components/security/login/login.component';
import { AddUserComponent } from './components/security/add-user/add-user.component';

export const routes: Routes = [
  { path: '', component: HomePage},
  { path: 'contacts', component: ContactsComponent},
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LogoutComponent},
  { path: 'AddUser', component: AddUserComponent}
];
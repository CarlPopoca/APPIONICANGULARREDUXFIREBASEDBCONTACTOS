import { Routes, RouterModule, CanActivate, CanDeactivate} from '@angular/router';
import { HomePage } from '../home/home.page';
import { SignInComponent } from '../components/security/sign-in/sign-in.component';
import { SignOutComponent } from '../components/security/sign-Out/sign-out.component';
import { SignUpComponent } from '../components/security/sign-Up/sign-up.component';
import { ContactsComponent } from '../components/contacts/contacts.component';

export const RoutesApp: Routes = [
  
  { path: '', component: HomePage},
  { path: 'contacts', component: ContactsComponent},
  { path: 'signIn', component: SignInComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'signOut', component: SignOutComponent}
];

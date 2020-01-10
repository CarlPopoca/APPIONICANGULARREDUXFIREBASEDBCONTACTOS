import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { UsersActions } from './actions/users.actions';
import { ContactsActions } from './actions/contacts.actions';
import { rootReducer } from './app.rootReducer';
import { IAppState } from './app.state';
import { SignInComponent } from './components/security/sign-in/sign-in.component';
import { SignOutComponent } from './components/security/sign-out/sign-out.component';
import { SignUpComponent } from './components/security/sign-up/sign-up.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignOutComponent,
    SignUpComponent,
    ContactsComponent
  ],
  entryComponents: [],
  imports: [NgReduxModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    UsersActions,
    ContactsActions,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension
  )
  {
    this.ngRedux.configureStore(
      rootReducer,
      {} as IAppState,
      [],
      [devTool.isEnabled() ?  devTool.enhancer(): f =>f]      
    );
  }
}

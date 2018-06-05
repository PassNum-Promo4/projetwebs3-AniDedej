import { AuthService } from "./auth.service";

import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { UserHomeComponent } from "./user/user-home/user-home.component";
import { MessagesComponent } from "./user/messages/messages.component";
import { PeoplesComponent } from "./user/peoples/peoples.component";
import { HomeComponent } from "./home/home.component";
import { EventsComponent } from "./user/events/events.component";
import { UserComponent } from "./user/user.component";

export class RouterConfig {

  constructor (private auth: AuthService) { }

getRoutes() {
  if (!this.auth.isAuthenticated) {
    return [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ];
  } else {
    return [
      { path: 'me', component: UserComponent },
      { path: 'user/home', component: UserHomeComponent },
      { path: 'user/messages', component: MessagesComponent },
      { path: 'user/peoples', component: PeoplesComponent },
      { path: 'user/events', component: EventsComponent },
      { path: '', redirectTo: 'user/home' }
    ];
  }
}

}

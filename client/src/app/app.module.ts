import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './user/messages/messages.component';
import { PeoplesComponent } from './user/peoples/peoples.component';
import { EventsComponent } from './user/events/events.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { SharedContentComponent } from './user/shared-content/shared-content.component';
import { CommentContainerComponent } from './user/shared-content/comment-container/comment-container.component';
import { InfoListComponent } from './user/shared-content/info-list/info-list.component';
import { CommentsListComponent } from './user/shared-content/comments-list/comments-list.component';
import { WhosGoingListComponent } from './user/shared-content/whos-going-list/whos-going-list.component';
import { WhoLikedListComponent } from './user/shared-content/who-liked-list/who-liked-list.component';
import { WhoDislikedListComponent } from './user/shared-content/who-disliked-list/who-disliked-list.component';
import { AuthComponent } from './auth/auth.component';
import { SharedContentService } from "./shared-content.service";
import { DateSortPipe } from './date-sort.pipe';
import { UserService } from "./user.service";
import { TokenInterceptor } from "./token.interceptor";
import { AuthGuard } from "./auth/auth.guard";
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadService } from './file-upload.service';
import { SearchEngineService } from './search-engine.service';
import { SocketIoService } from "./socket-io.service";
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'user', component: AuthComponent },
  { path: 'user/:username',
    component: AuthComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: UserComponent },
      { path: 'peoples/:username', component: UserDetailsComponent },
      { path: 'home', component: UserHomeComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'peoples', component: PeoplesComponent },
      { path: 'events', component: EventsComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MessagesComponent,
    PeoplesComponent,
    EventsComponent,
    UserHomeComponent,
    SharedContentComponent,
    CommentContainerComponent,
    InfoListComponent,
    CommentsListComponent,
    WhosGoingListComponent,
    WhoLikedListComponent,
    WhoDislikedListComponent,
    AuthComponent,
    DateSortPipe,
    FileUploadComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    SocketIoService,
    AuthGuard,
    SharedContentService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    FileUploadService,
    SearchEngineService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

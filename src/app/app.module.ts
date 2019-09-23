import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { StoreModule } from '@ngrx/store';
import { CommentsReducer } from './core/reducer';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HighlightDirective } from './highlight.directive';
import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';
import { ShowTimePipe } from './show-time.pipe';

import { environment } from 'src/environments/environment';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ChildCommentComponent } from './child-comment/child-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HighlightDirective,
    LoginComponent,
    CommentComponent,
    ShowTimePipe,
    HeaderComponent,
    SpinnerComponent,
    ChildCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    StoreModule.forRoot({ commentsReducer: CommentsReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireDatabase } from 'angularfire2/database';
import { Store } from '@ngrx/store';
import { ADD_USER, RESET } from '../core/actions';
import { UserState } from '../core/model';

enum loginSignUp {
  login,
  signUp
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  userName: string = '';
  pwd: string = '';
  signUpUserName = '';
  signUpPWD = '';
  isLogin = true;
  userDetails = [];
  isUserNameExist = false;
  selectedAvatar = 'male.png';
  userState: UserState;
  isUserCorrect = false;

  constructor(
    private db: AngularFireDatabase,
    private route: Router,
    private store: Store<UserState>) {
    this.store.dispatch({ type: RESET });
  }

  ngOnInit() {
    sessionStorage.clear();
    this.db.list('/users').valueChanges().subscribe(event => {
      this.userDetails = [...event];
    })
  }

  login() {
    this.db.list('/users').valueChanges().subscribe(event => {
      this.userDetails = [...event];
      event.forEach(item => {
        if (item['username'] === this.userName && item['password'] === this.pwd) {

          sessionStorage.setItem('username', item['username']);
          sessionStorage.setItem('pwd', item['password']);
          sessionStorage.setItem('image', item['image']);

          this.userState = {
            username: item['username'],
            pwd: item['password'],
            image: item['image']
          }

          this.store.dispatch({
            type: ADD_USER, payload: this.userState
          })

          this.route.navigate(['/comments'])
        }
      })

      this.isUserCorrect = true;
    });
  }

  selectLoginOrSignUp(value: number) {
    this.isUserCorrect = false;
    this.isUserNameExist = false;
    if (value === loginSignUp.login) {
      this.isLogin = true;
      this.clearFields();
    } else {
      this.isLogin = false;
      this.clearFields();
    }
  }

  clearFields() {
    this.userName = '';
    this.pwd = '';
    this.signUpUserName = '';
    this.signUpPWD = '';
  }

  signUP() {
    this.userDetails.forEach(event => {
      if (event.username === this.signUpUserName.toLowerCase() && this.signUpPWD) {
        this.isUserNameExist = true;
        this.isUserCorrect = false;
      }
    });

    if (!this.signUpUserName || !this.signUpPWD) {
      this.isUserCorrect = true;
    }

    if (!this.isUserNameExist && this.isUserCorrect === false) {
      if (this.signUpUserName && this.signUpPWD) {
        this.db.list('/users').push({
          username: this.signUpUserName.toLowerCase(),
          password: this.signUpPWD,
          image: this.selectedAvatar
        }).then((response) => {
          sessionStorage.setItem('username', this.signUpUserName.toLowerCase());
          sessionStorage.setItem('pwd', this.signUpPWD);
          sessionStorage.setItem('image', this.selectedAvatar);
          this.route.navigate(['/comments'])
        }, (err) => {
          alert('Something went wrong. Please try later');
        })
      }
    }
  }

}

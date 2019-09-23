import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router'

import { CommentService } from '../comment.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hideLogout: boolean = false;
  isAtLoginPage = true;
  userName = sessionStorage.getItem('username');

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login') {
          this.isAtLoginPage = false
        }
      }
    });

    this.commentService.checkLogin.subscribe(event => {
      this.hideLogout = event;
      if (!this.hideLogout) {
        this.userName = sessionStorage.getItem('username');
      }
    });
  }

  logout() {
    this.userName = '';
    sessionStorage.clear();
    this.hideLogout = true;
    this.isAtLoginPage = true;
    this.commentService.checkLogin.next(true)
    this.router.navigate(['/comments']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  routeToComments() {
    this.userName = sessionStorage.getItem('username')
    if (!this.userName) {
      this.hideLogout = true;
      this.isAtLoginPage = true;
    }
    this.router.navigate(['/comments']);
  }

}

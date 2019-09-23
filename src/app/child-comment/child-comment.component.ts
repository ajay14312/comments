import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child-comment',
  templateUrl: './child-comment.component.html',
  styleUrls: ['./child-comment.component.css']
})
export class ChildCommentComponent implements OnInit {
  @Input() childItem: any;
  userName = sessionStorage.getItem('username') ? sessionStorage.getItem('username').toLowerCase() : '';
  @Output() passChildCommentData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openChildReplyBox() {
    if (this.userName) {
      this.passChildCommentData.next({
        selectedParentCommentID: this.childItem.selectedParentCommentID,
        slectedChildCommentID: this.childItem.slectedChildCommentID,
        selectedParentID: this.childItem.selectedParentID
      })
    } else {
      this.passChildCommentData.next(false);
    }
  }

}

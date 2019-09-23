import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { ADD_USER, RESET } from '../core/actions';

import { CommentService } from '../comment.service'
import { UserState } from '../core/model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  showSpinner = true;
  selectedParentComment: string;
  selectedParentId: number;
  slectedChildComment: number;
  replyContent = '';
  userName = sessionStorage.getItem('username') ? sessionStorage.getItem('username').toLowerCase() : '';
  userState: Observable<UserState>
  @ViewChild('textArea') textArea: ElementRef;
  selectedReplies = 0;
  isReplyContentExist = false;

  arr = []
  tasksRef: AngularFireList<any>;
  tasks: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private commentService: CommentService,
    private store: Store<UserState>) {
    this.userState = this.store.pipe(select('userState'));
  }

  ngOnInit() {
    this.db.list('/comments').valueChanges().subscribe(event => {
      this.arr = [...event];
      this.showSpinner = false
    });

    this.tasksRef = this.db.list('/comments');

    this.tasks = this.tasksRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          (
            { key: c.payload.key, ...c.payload.val() }
          )
        )
      )
    );

    if (this.userName) {
      this.commentService.checkLogin.next(false);
    } else {
      this.commentService.checkLogin.next(true);
    }

    this.commentService.checkLogin.subscribe(event => {
      if (event) {
        this.replyContent = '';
      }
    })

  }

  openReplyBox(num: string, item: any) {
    const userName = sessionStorage.getItem('username');
    if (userName) {
      this.selectedParentComment = num;
      this.slectedChildComment = -1;
      this.replyContent = '';
      this.selectedParentId = item;
      this.focusTextArea();
    } else {
      alert('Login to post the comment');
    }
  }

  openChildReplyBox(event: any) {
    const userName = sessionStorage.getItem('username');
    if (event && userName) {
      this.selectedParentComment = event.selectedParentCommentID;
      this.slectedChildComment = event.slectedChildCommentID;
      this.selectedParentId = event.selectedParentID;
      this.replyContent = '';
      this.replyContent += `@${this.arr[this.selectedParentId].childrenComments[this.selectedParentId].name} `;
      this.focusTextArea();
    } else {
      alert('Login to post the comment');
    }
  }

  cancelReply() {
    this.slectedChildComment = -1;
    this.selectedParentComment = null;
    this.replyContent = '';
    this.isReplyContentExist = false;
  }

  replyComment() {
    const userName = sessionStorage.getItem('username');
    if (userName) {
      if (this.replyContent.length > 0) {
        this.isReplyContentExist = false;
        if (this.slectedChildComment >= 0) {

          const date = '' + new Date();
          const obj = {
            "childrenComments": this.arr[this.selectedParentId].childrenComments,
            "comment": this.arr[this.selectedParentId].comment,
            "image": this.arr[this.selectedParentId].image,
            "name": this.arr[this.selectedParentId].name,
            "date": this.arr[this.selectedParentId].date
          };
          obj.childrenComments.push({
            name: userName,
            comment: this.replyContent,
            date: date,
            image: sessionStorage.getItem('image')
          })
          this.tasksRef.update('' + this.selectedParentComment, obj)
            .then(
              (res) => {
                this.cancelReply()
              },
              (err) => {
                alert('Something went wrong')
              }
            );;
        } else if (this.selectedParentComment) {
          const date = '' + new Date();
          const obj = {
            "childrenComments": this.arr[this.selectedParentId].childrenComments,
            "comment": this.arr[this.selectedParentId].comment,
            "image": this.arr[this.selectedParentId].image,
            "name": this.arr[this.selectedParentId].name,
            "date": this.arr[this.selectedParentId].date
          };

          if (obj.childrenComments) {
            obj.childrenComments.push({
              name: userName,
              comment: this.replyContent,
              date: date,
              image: sessionStorage.getItem('image')
            })
          } else {
            obj.childrenComments = [];
            obj.childrenComments.push({
              name: userName,
              comment: this.replyContent,
              date: date,
              image: sessionStorage.getItem('image')
            })
          }

          this.tasksRef.update('' + this.selectedParentComment, obj)
            .then(
              (res) => {
                this.cancelReply()
              },
              (err) => {
                alert('Something went wrong')
              }
            );
        } else {
          const date = '' + new Date();
          this.tasksRef.push({
            "childrenComments": [],
            "comment": this.replyContent,
            "image": sessionStorage.getItem('image'),
            "name": this.userName,
            "date": date
          }).then(
            (res) => {
              this.cancelReply()
            },
            (err) => {
              alert('Something went wrong')
            }
          )
        }
      } else {
        this.isReplyContentExist = true;
      }
    } else {
      alert('Login to post the comment');
      this.cancelReply();
    }
  }

  focusTextArea() {
    this.textArea.nativeElement.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => this.textArea.nativeElement.focus(), 500);
  }

  viewAllReplies(num: number) {
    this.selectedReplies = num;
  }

}
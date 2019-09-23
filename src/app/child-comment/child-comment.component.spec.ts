import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCommentComponent } from './child-comment.component';

describe('ChildCommentComponent', () => {
  let component: ChildCommentComponent;
  let fixture: ComponentFixture<ChildCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

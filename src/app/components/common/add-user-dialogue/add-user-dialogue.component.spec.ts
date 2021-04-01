import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserDialogueComponent } from './add-user-dialogue.component';

describe('AddUserDialogueComponent', () => {
  let component: AddUserDialogueComponent;
  let fixture: ComponentFixture<AddUserDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
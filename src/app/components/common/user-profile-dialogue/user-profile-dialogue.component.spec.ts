import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfileDialogueComponent } from './user-profile-dialogue.component';

describe('UserProfileDialogueComponent', () => {
  let component: UserProfileDialogueComponent;
  let fixture: ComponentFixture<UserProfileDialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProfileDialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

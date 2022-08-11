import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeasydbWebComponent } from './myeasydb-web.component';

describe('MyeasydbWebComponent', () => {
  let component: MyeasydbWebComponent;
  let fixture: ComponentFixture<MyeasydbWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyeasydbWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeasydbWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

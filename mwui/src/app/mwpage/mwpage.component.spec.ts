import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MwpageComponent } from './mwpage.component';

describe('MwpageComponent', () => {
  let component: MwpageComponent;
  let fixture: ComponentFixture<MwpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MwpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MwpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

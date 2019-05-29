import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutNodeComponent } from './about-node.component';

describe('AboutNodeComponent', () => {
  let component: AboutNodeComponent;
  let fixture: ComponentFixture<AboutNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

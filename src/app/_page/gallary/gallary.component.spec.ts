/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GallaryComponent } from './gallary.component';

describe('GallaryComponent', () => {
  let component: GallaryComponent;
  let fixture: ComponentFixture<GallaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GallaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GallaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

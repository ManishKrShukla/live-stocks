import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStocksComponent } from './live-stocks.component';

describe('LiveStocksComponent', () => {
  let component: LiveStocksComponent;
  let fixture: ComponentFixture<LiveStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

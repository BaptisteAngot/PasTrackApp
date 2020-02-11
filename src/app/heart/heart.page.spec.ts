import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HeartPage } from './heart.page';

describe('HeartPage', () => {
  let component: HeartPage;
  let fixture: ComponentFixture<HeartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HeartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

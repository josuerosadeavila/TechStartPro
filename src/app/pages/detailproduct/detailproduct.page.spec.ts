import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailproductPage } from './detailproduct.page';

describe('DetailproductPage', () => {
  let component: DetailproductPage;
  let fixture: ComponentFixture<DetailproductPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailproductPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailproductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

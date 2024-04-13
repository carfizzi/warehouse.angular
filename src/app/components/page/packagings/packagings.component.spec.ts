import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingsComponent } from './packagings.component';

describe('PackagingsComponent', () => {
  let component: PackagingsComponent;
  let fixture: ComponentFixture<PackagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

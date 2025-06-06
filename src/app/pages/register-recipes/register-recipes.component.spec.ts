import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRecipesComponent } from './register-recipes.component';

describe('RegisterRecipesComponent', () => {
  let component: RegisterRecipesComponent;
  let fixture: ComponentFixture<RegisterRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterRecipesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PlatService } from '../service/plats/plats.service';
import { IngredientsService } from '../service/ingredients/ingredients.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Ingredient } from '../Models/ingredients/ingredient';
import { Specialite } from '../Models/specialite/specialite';
import { Plat } from '../Models/plats/plat';
import { CoreService } from '../service/core/core.service';
import { SpecialiteService } from '../service/specialite/specialite.service';



@Component({
  selector: 'app-plats',
  templateUrl: './plats.component.html',
  styleUrls: ['./plats.component.scss']
})
export class PlatsComponent implements OnInit {
  platForm!: FormGroup;
  ingredients: Ingredient[] = [];
  specialites: Specialite[] = [];

  plat: Plat = {
    _id: '',
    name: '',
    timeOfCook: '',
    description: '',
    withIngredients: [],
    specialite: '',
    recette: '',
    images: '',
  };

  constructor(
    private _fb: FormBuilder,
    private _platService: PlatService,
    private _ingService: IngredientsService,
    private _specService: SpecialiteService,
    private dialog: MatDialog,
    private _dialogRef: MatDialogRef<PlatsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
  ) {}

  ngOnInit(): void {
    this.platForm = this._fb.group({
      name: ['', Validators.required],
      timeOfCook: ['', Validators.required],
      description: ['', Validators.required],
      withIngredients: this._fb.array([]),
      specialite: ['', Validators.required],
      images: ['', Validators.required],
    });
    this.getIngredients();
    this.getSpecialites();

    if (this.data) {
      this.platForm.patchValue(this.data);
    }
  }

  onFormSubmit() {
    if (this.platForm.valid) {
      const selectedIngredients: string[] = [];
      const withIngredientsFormArray = this.platForm.get('withIngredients') as FormArray;

      // Parcourir les ingrédients sélectionnés
      withIngredientsFormArray.controls.forEach((control: AbstractControl, index: number) => {
        if (control.value) {
          const ingredient = this.ingredients[index];
          selectedIngredients.push(ingredient._id);
        }
      });

      // Vérifier si des ingrédients sont sélectionnés
      if (selectedIngredients.length > 0) {
        const specialiteId = this.platForm.value.specialite._id.toString();

        const formData = new FormData();
        formData.append('name', this.platForm.value.name);
        formData.append('timeOfCook', this.platForm.value.timeOfCook);
        formData.append('description', this.platForm.value.description);
        formData.append('withIngredients', selectedIngredients.join(',')); // Convertir le tableau en une chaîne de caractères séparée par des virgules
        formData.append('specialite', specialiteId);
        formData.append('images', this.platForm.value.images);

        if (this.data) {
          this._platService.updatePlat(this.data._id, formData).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('plat detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        } else {
          this._platService.addPlat(formData).subscribe({
            next: () => {
              this._coreService.openSnackBar('plat added successfully');
              this._dialogRef.close(true);
              // this.dialog.open(RecetteComponent);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }
      } else {
        console.log("Aucun ingrédient sélectionné");
        // Afficher un message d'erreur ou effectuer une action appropriée
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.platForm.get('images')?.setValue(file);
  }

  getIngredients() {
    this._ingService.getIngredientList().subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.addIngredientCheckboxes();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getSpecialites() {
    this._specService.getSpecialiteList().subscribe(
      (specialites: Specialite[]) => {
        this.specialites = specialites;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  addIngredientCheckboxes() {
    const formArray = this.platForm.get('withIngredients') as FormArray;
    this.ingredients.forEach((ingredient: Ingredient) => {
      const control = new FormControl(ingredient.isChecked || false);
      formArray.push(control);
    });
  }

  getIngredientsControls(): AbstractControl[] {
    const formArray = this.platForm.get('withIngredients') as FormArray;
    return formArray.controls;
  }

  getIngredientControl(index: number): FormControl {
    const withIngredientsFormArray = this.platForm.get('withIngredients') as FormArray;
    return withIngredientsFormArray.at(index) as FormControl;
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Ingredient } from '../Models/ingredients/ingredient';
import { IngredientsService } from '../service/ingredients/ingredients.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../service/core/core.service';
import { PlatsComponent } from '../plats/plats.component';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit {
  empForm!: FormGroup;

  ingredient: Ingredient = {
    _id:'',
    name: '',
    description: '',
    isChecked: true,
    ingImg: ''
  };

  ingredients: Ingredient[] = [];

  constructor(
    private _fb: FormBuilder,
    private _ingService: IngredientsService,
    private dialog:MatDialog,
    private _dialogRef: MatDialogRef<IngredientsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    // this.empForm.patchValue(this.data);
    this.empForm = this._fb.group({
      name : [''],
      description : [''],
      ingImg : ['' ],

      // date : ['', Validators.required],
    })

    this.getIngredients()

    if(this.data) {
      // this.actionBtn = 'update'
      this.empForm.controls['name'].setValue(this.data.name);
      this.empForm.controls['description'].setValue(this.data.description);
      this.empForm.controls['ingImg'].setValue(this.data.ingImg);

  }
  }

  onFormSubmit() {
    console.log(this.empForm.valid)
    if (this.empForm.valid) {
      if (this.data) {
        const formData = new FormData();
        formData.append('name', this.empForm.value.name);
        formData.append('description', this.empForm.value.description);

        // Vérifier si un nouveau fichier a été sélectionné
        if (this.empForm.value.ingImg instanceof File) {
          formData.append('ingImg', this.empForm.value.ingImg);
        }

        this._ingService.updateIngredient(this.data._id, formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Ingredient detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {

        const formData = new FormData();
        formData.append('name', this.empForm.value.name);
        formData.append('description', this.empForm.value.description);
        formData.append('ingImg', this.empForm.value.ingImg);

        this._ingService.addIngredient(formData).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Ingredient added successfully');
            this._dialogRef.close(true);
            this.dialog.open(IngredientsComponent)

          },
          error: (err: any) => {
            console.error(err);
          },
        });



    }

}
}

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      this.empForm.get('ingImg')?.setValue(file);

    }


    Suivant(){
      this.dialog.open(PlatsComponent)
      this._dialogRef.close(true);

    }

    getIngredients(){
      this._ingService.getIngredientList().subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
}

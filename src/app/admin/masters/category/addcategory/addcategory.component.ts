import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryModel } from '../listcategory/category.Model';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  public form: FormGroup;
  categoryId: string | any;
  private sub: any;

  uploadForm = new FormGroup({
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    isActive: new FormControl(true)
  });

  isAddMode!: boolean;
  submitted = false;

  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.isAddMode = !this.categoryId;
  }
  //On Submit
  public oncategorySubmit(value: Object): void {
    if (this.isAddMode) {
      this.AddCategory(value);
    }
  }
  //Validation
  keyPressOnlyChar(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  ////Add Category record
  private AddCategory = (CategoryFormData) => {
    if (this.categoryId == null) {
      CategoryFormData.categoryId = 0;
      let categoryModel: categoryModel = {
        categoryId: CategoryFormData.categoryId,
        name: CategoryFormData.Name,
        description: CategoryFormData.Description,
        isActive: true
      }
      this.appService.add('api/Category', categoryModel).subscribe((response) => {
        if (!Number.isNaN(response)) {
          this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.router.navigate(['/admin/masters/listcategory'], { relativeTo: this.route });
        } else {
          this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }, error => {
        this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      });
    }
  }
}

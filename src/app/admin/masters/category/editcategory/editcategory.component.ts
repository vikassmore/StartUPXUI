import { Component, OnInit } from '@angular/core';
import { AppService, Data } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { categoryModel } from '../listcategory/category.Model';


@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {
  private sub: any;
  categoryId: string | any;
  name: string | any;
  description: string | any;
  uploadForm = new FormGroup({
    categoryId: new FormControl(''),
    Name: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    isActive: new FormControl(true)
  });
  constructor(public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.categoryId = params['id'];
      if (this.categoryId != undefined || this.categoryId > 0) {
        this.getcategoryById(this.categoryId);
      }
    });
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


  ///Get Service By ServiceId
  getcategoryById(categoryId): void {
    this.appService.getById('api/Category/GetcategoryById/', categoryId).subscribe((data: any) => {
      this.uploadForm.controls['Name'].setValue(data.name);
      this.uploadForm.controls['Description'].setValue(data.description);
      this.uploadForm.controls['isActive'].setValue(data.isActive);
      this.uploadForm.controls['categoryId'].setValue(data.categoryId);
    })
    error => {
      console.log(error.error.errors);
    }
  }
  //On Submit
  public oncategorySubmit(value: Object): void {
    this.updateCategory(value);
  }

  ////Update Category Record
  private updateCategory = (CategoryFormData) => {
    var categoryId = Number(this.categoryId);
    let fundingModel1: categoryModel = {
      categoryId: categoryId,
      name: CategoryFormData.Name,
      description: CategoryFormData.Description,
      isActive: true
    }
    this.appService.edit('api/Category/Edit', fundingModel1).subscribe((response: any) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open('Updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.router.navigate(['/admin/masters/listcategory'], { relativeTo: this.route });
      } else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}

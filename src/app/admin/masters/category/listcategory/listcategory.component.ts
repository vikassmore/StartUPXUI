import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
  public CategoryList: any = [];
  public CategoryDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategoryMaster();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get Category list
  public getCategoryMaster() {
  
    this.appService.getAll("api/Category/getAllCategory").subscribe(data => {
      this.CategoryDataList = data;
      this.CategoryList = data;
    });
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getCategoryMaster();
    }
    else {
      this.CategoryList = this.CategoryDataList.filter(res => {
        return (
          res.name.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //delete Category
  public deleteCategory(category: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.CategoryList.indexOf(category);
        if (index !== -1) {
          this.CategoryList.splice(index, 1);
          this.appService.deleteById(`api/Category?categoryId=${category.categoryId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }
}

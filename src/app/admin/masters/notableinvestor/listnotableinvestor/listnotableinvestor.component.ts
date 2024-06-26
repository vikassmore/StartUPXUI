import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listnotableinvestor',
  templateUrl: './listnotableinvestor.component.html',
  styleUrls: ['./listnotableinvestor.component.css']
})
export class ListnotableinvestorComponent implements OnInit {
  public NotableInvestorList = [];
  public NotableInvestorDataList: any = [];
  public title: any;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getNotableInvestor();
  }
  //Get notable investor
  public getNotableInvestor() {
    this.appService.getAll("api/NotableInvestor").subscribe(data => {
      this.NotableInvestorDataList = data;
      this.NotableInvestorList = data;
    });
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getNotableInvestor();
    }
    else {
      this.NotableInvestorList = this.NotableInvestorDataList.filter(res => {
        return (
          res.emailId.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.firstName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.lastName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Delete notable investor
  public deletenotableInvestor(item: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.NotableInvestorList.indexOf(item);
        if (index !== -1) {
          this.NotableInvestorList.splice(index, 1);
          this.appService.deleteById(`api/NotableInvestor?notableinvestorId=${item.notableInvestorId}`, {}).subscribe(data => {

          });
        }
      }
    });
  }


}

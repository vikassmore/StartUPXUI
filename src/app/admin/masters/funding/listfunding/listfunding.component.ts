import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listfunding',
  templateUrl: './listfunding.component.html',
  styleUrls: ['./listfunding.component.css']
})
export class ListfundingComponent implements OnInit {
  public FundingList: any = [];
  public FundingDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFundingMaster();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get Funding list
  public getFundingMaster() {
    this.appService.getAllFunding("api/Funding").subscribe(data => {
      this.FundingDataList = data;
      this.FundingList = data;
    });
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getFundingMaster();
    }
    else {
      this.FundingList = this.FundingDataList.filter(res => {
        return (
          res.name.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }

  //Delete funding
  public deletefunding(funding: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.FundingList.indexOf(funding);
        if (index !== -1) {
          this.FundingList.splice(index, 1);
          this.appService.deleteById(`api/Funding/DeleteFunding?fundingId=${funding.fundingId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }
}

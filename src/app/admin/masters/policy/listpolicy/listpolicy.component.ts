import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listpolicy',
  templateUrl: './listpolicy.component.html',
  styleUrls: ['./listpolicy.component.css']
})
export class ListpolicyComponent implements OnInit {
  public PolicyList: any = [];
  public PolicyDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public appService: AppService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPolicyMaster();
  }
  //Get Policy list
  public getPolicyMaster() {
    this.appService.getAll("api/Master/GetAllPolicy").subscribe(data => {
      this.PolicyDataList = data;
      this.PolicyList = data;
    });
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getPolicyMaster();
    }
    else {
      this.PolicyList = this.PolicyDataList.filter(res => {
        return (
          res.policyName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Delete policy
  public deletepolicy(policy: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.PolicyList.indexOf(policy);
        if (index !== -1) {
          this.PolicyList.splice(index, 1);
          this.appService.deleteById(`api/Master/DeletePolicy?policyId=${policy.policyId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }

}

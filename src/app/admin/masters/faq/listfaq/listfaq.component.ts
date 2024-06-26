import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-listfaq',
  templateUrl: './listfaq.component.html',
  styleUrls: ['./listfaq.component.css']
})
export class ListfaqComponent implements OnInit {
  public FAQList: any = [];
  public FAQDataList: any = [];
  public title: any;
  public page: any;
  public count = 10;
  constructor(public dialog: MatDialog, public appService: AppService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFAQMaster();
  }
  ///pagination
  public onPageChanged(event) {
    this.page = event;
    window.scrollTo(0, 0);
  }
  //Get FAQ list
  public getFAQMaster() {
    this.appService.getAll("api/Master/GetAllFAQ").subscribe(data => {
      this.FAQDataList = data;
      this.FAQList = data;
    });
  }
  ///Search
  Search() {
    if (this.title == "") {
      this.getFAQMaster();
    }
    else {
      this.FAQList = this.FAQDataList.filter(res => {
        return (
          res.question.toLocaleLowerCase().includes(this.title.toLocaleLowerCase()) ||
          res.answer.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Delete FAQ
  public deletefaq(faq: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.FAQList.indexOf(faq);
        if (index !== -1) {
          this.FAQList.splice(index, 1);
          this.appService.deleteById(`api/Master/DeleteFAQ?faqMasterId=${faq.frequentlyAqid}`, {}).subscribe(data => {

          });
        }
      }
    });
  }




  // this.appService.deleteById(`api/Master/DeleteFAQ?faqMasterId=${id}`,{}).subscribe((response) => {
  //   if (!Number.isNaN(response))
  //   {
  //   this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  //   this.getFAQMaster();
  //   }
  // },
  //   (error) => {
  //     this.snackBar.open('Somthing went wrong.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 }); 
  //   });


}



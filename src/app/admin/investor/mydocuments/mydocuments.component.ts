import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AdddocumentsComponent } from '../adddocuments/adddocuments.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-mydocuments',
  templateUrl: './mydocuments.component.html',
  styleUrls: ['./mydocuments.component.css']
})
export class MydocumentsComponent implements OnInit {
  public items: any;
  userId: string | any;
  public documentdetail: any = [];
  public documentdetailData: any = [];
  public title: any;
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar,
    private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private tokenStorage: TokenStorageService,
    public formBuilder: FormBuilder) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AdddocumentsComponent, {
      width: '120vh',
    });
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.getInvestorDocument(this.userId);
  }
  ///Search document name
  Search() {
    if (this.title == "") {
      this.getInvestorDocument(this.userId);
    }
    else {
      this.documentdetail = this.documentdetailData.filter(res => {
        return (
          res.documentName.toLocaleLowerCase().includes(this.title.toLocaleLowerCase())
        );
      });
    }
  }
  //Get Investor document by user
  public getInvestorDocument(userId) {
    this.appService.getAllById("api/FounderInvestorDocument/GetAllDocumentByUserId/", userId).subscribe(data => {
      this.documentdetailData = data;
      this.documentdetail = data;
    });
  }
  //Delete document by Id
  public deleteDocument(doc: any) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this?"
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const index: number = this.documentdetail.indexOf(doc);
        if (index !== -1) {
          this.documentdetail.splice(index, 1);
          this.appService.deleteById(`api/FounderInvestorDocument?documentId=${doc.documentId}`, {}).subscribe(data => {
          });
        }
      }
    });
  }
  ///download document file
  public downloadDocument(userId, documentId,fileName) {
    this.appService.downloadById("api/FounderInvestorDocument/DownloadDocumentByUserId/", userId + '/' + documentId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: data.type });
      saveAs(blob, fileName); 
    });
  }
}

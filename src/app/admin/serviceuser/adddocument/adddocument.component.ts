import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {
  serviceDocument?: FileList;
  documentname: string;
  userId: any;
  serviceId: any;
  selectedFile: File = null;
  fileError: boolean = false;
  fileSizeError = false;
  fileTypeError = false;
  isFileUploaded: boolean = false;
  buttenDisabled: boolean;
  portfoliodocumentdetail: any = [];
  uploadForm = new FormGroup({
    documentName: new FormControl('', [Validators.required]),
    serviceDocument: new FormControl('')
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private router: Router, public formBuilder: FormBuilder) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.serviceId = this.data.serviceId;
    this.buttenDisabled = true;
  }
  //On Submit
  public onSubmitPortfolio() {
    if (this.uploadForm.valid) {
      this.addPortfolioDocument();
    }
  }
  //Document name change
  public onTextChange(e) {
    this.documentname = e.value;
    if (e.value != "" && e.value != undefined) {
      if (this.documentname != "" && this.serviceDocument != undefined && this.fileSizeError != true && this.fileTypeError != true) {
        this.buttenDisabled = false;
      }
      else {
        this.buttenDisabled = true;
      }
    } else {
      this.buttenDisabled = true;
    }
  }
  ///Select Media file
  handleFileSelect(event: any) {
    this.serviceDocument = event.target.files;
    this.uploadForm.value.serviceDocument = event.target.files[0];
    const maxFileSize = 10000000; // 10MB
    const file = event.target.files[0];
    if (file.size > maxFileSize) {
      this.fileSizeError = true;
      this.buttenDisabled = true;
      return;
    }
    if (file.type != "application/pdf") {
      this.fileTypeError = true;
      this.buttenDisabled = true;
      return;
    } else {
      this.fileTypeError = false;
    }
    this.selectedFile = file;
    this.isFileUploaded = true;
    this.fileSizeError = false;
    if (this.documentname != "" && this.documentname != undefined && this.serviceDocument != undefined) {
      this.buttenDisabled = false;
    }
    else {
      this.buttenDisabled = true;
    }
    setTimeout(() => {
      this.isFileUploaded = false; // Reset isFileUploaded to false after a short delay
    },);

  }
  ///Add Document
  public addPortfolioDocument() {
    var formData = new FormData();
    formData.append('documentName', this.uploadForm.value.documentName);
    formData.append('filePath', this.uploadForm.value.serviceDocument);
    formData.append('serviceId', this.serviceId);
    this.appService.add('api/Service/AddServicePortfolio', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        if (response != null) {
          this.dialog.closeAll();
          this.router.navigate(['/admin/serviceuser/profilemanagement'], { relativeTo: this.route });
          this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        } else {
          this.snackBar.open('You have already uploaded document with same name.!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      }
      else {
        this.snackBar.open('You have already uploaded document with same name.!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }

}

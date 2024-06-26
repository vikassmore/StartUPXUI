import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.component.html',
  styleUrls: ['./adddocument.component.css']
})
export class AdddocumentComponent implements OnInit {
  founderDocument?: FileList;
  documentname: string;
  userId: any;
  selectedFile: File = null;
  fileError: boolean = false;
  fileSizeError = false;
  fileTypeError = false;
  isFileUploaded: boolean = false;
  buttenDisabled: boolean;
  uploadForm = new FormGroup({
    documentId: new FormControl('', []),
    documentName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    founderDocument: new FormControl(''),
  });
  constructor(public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private router: Router, public formBuilder: FormBuilder) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().userId;
    this.buttenDisabled = true;
  }
  //On Submit
  public onSubmit() {
    if (this.uploadForm.valid) {
      this.addFounderDocument();
    }
  }
  //Document name change
  public onTextChange(e) {
    this.documentname = e.value;
    if (e.value != "" && e.value != undefined) {
      if (this.documentname != "" && this.founderDocument != undefined && this.fileSizeError != true && this.fileTypeError != true) {
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
    this.founderDocument = event.target.files;
    this.uploadForm.value.founderDocument = event.target.files[0];
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
    if (this.documentname != "" && this.documentname != undefined && this.founderDocument != undefined) {
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
  public addFounderDocument() {
    var formData = new FormData();
    formData.append('documentName', this.uploadForm.value.documentName);
    formData.append('filePath', this.uploadForm.value.founderDocument);
    formData.append('userId', this.userId);
    this.appService.add('api/FounderInvestorDocument/AddFounderDocument', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        if (response != null) {
          this.dialog.closeAll();
          this.router.navigate(['/admin/startup/documentdetails'], { relativeTo: this.route });
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

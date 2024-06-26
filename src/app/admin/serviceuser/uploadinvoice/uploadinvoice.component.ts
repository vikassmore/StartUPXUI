import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-uploadinvoice',
  templateUrl: './uploadinvoice.component.html',
  styleUrls: ['./uploadinvoice.component.css']
})
export class UploadinvoiceComponent implements OnInit {
  invoiceDocument?: FileList;
  userId: any;
  serviceCaseId: any;
  selectedFile: File = null;
  fileError: boolean = false;
  fileSizeError = false;
  fileTypeError = false;
  isFileUploaded: boolean = false;
  buttenDisabled: boolean;
  uploadForm = new FormGroup({
    documentId: new FormControl('', []),
    invoiceDocument: new FormControl(''),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public appService: AppService, public snackBar: MatSnackBar, private route: ActivatedRoute, private tokenStorage: TokenStorageService, private router: Router, public formBuilder: FormBuilder) { }

  closeDialog() {
    this.dialog.closeAll(); // <- Close the mat dialog
  }

  ngOnInit(): void {
    this.serviceCaseId = this.data.serviceCaseId;
  }
  ///Select Media file
  handleFileSelect(event: any) {
    this.invoiceDocument = event.target.files;
    this.uploadForm.value.invoiceDocument = event.target.files[0];
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
    this.buttenDisabled = false;
    setTimeout(() => {
      this.isFileUploaded = false; // Reset isFileUploaded to false after a short delay
    },);
  }
  //On Submit
  public onSubmit() {
    if (this.uploadForm.valid) {
      this.addInvoiceDocument();
    }
  }
  ///Add Document
  public addInvoiceDocument() {
    var formData = new FormData();
    formData.append('filePath', this.uploadForm.value.invoiceDocument);
    formData.append('serviceCaseId', this.serviceCaseId);
    this.appService.add('api/Service/AddServiceInvoice', formData).subscribe((response) => {
      if (!Number.isNaN(response)) {
        this.snackBar.open(response, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.dialog.closeAll();
      }
      else {
        this.snackBar.open('Something went wrong..!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
      }
    }, error => {
      this.snackBar.open('Something went wrong!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    });
  }
}
